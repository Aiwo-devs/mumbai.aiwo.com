/* eslint-disable @typescript-eslint/no-explicit-any -- the healthportal response
   shapes are not typed in this project; the responses are validated at runtime. */
import React from 'react';
import { bookingService, BRANCH_ID, API_BASE_URL, AUTH_BASE_URL } from '../bookingService';
import type { BookingAction, BookingState } from '../bookingReducer';
import {
  captureBookingLead,
  markBookingApiFailed,
  markBookingPaymentInitiated,
  type BookingLeadInput,
} from '@/lib/bookingSheet';
import { capturePostHogEvent } from '@/lib/posthog';

interface BookingSummaryProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  serviceCode?: string;
  landingPage?: string;
}

const PRODUCTION_HOSTNAME = 'mumbai.aiwo.com';

const formatDateNicely = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Charge for each service. Unchanged from the add-booking ServiceBooking source:
// keyed by service name so the resolved service determines its own amount.
const getServicePrice = (serviceName: string): number => {
  const name = (serviceName || '').toLowerCase();
  if (name.includes('vo2 max')) return 7999;
  if (name.includes('sculpting')) return 1999;
  if (name.includes('posture')) return 4999;
  if (name.includes('iv iron') || name.includes('mega glow') || name.includes('iv therapy')) return 1999;
  if (name.includes('rmr')) return 4999;
  if (name.includes('sleepcation')) return 149000;
  return 0;
};

// Post-payment redirect_url the frontend sends to the backend — the service's own
// page on this origin. Preserved from the add-booking source; the production
// domain/origin is applied at call time via window.location.origin.
const getServiceRedirectUrl = (serviceName: string): string => {
  const name = (serviceName || '').toLowerCase();
  if (name.includes('vo2 max')) return '/services/vo2-max';
  if (name.includes('sculpting')) return '/services/ems-sculpting';
  if (name.includes('posture')) return '/services/posture-screening';
  if (name.includes('iv iron') || name.includes('mega glow') || name.includes('iv therapy')) return '/services/iv-therapy';
  if (name.includes('rmr')) return '/services/rmr';
  if (name.includes('sleepcation')) return '/services/sleepcation';
  return '/';
};

export function BookingSummary({ state, dispatch, serviceCode, landingPage }: BookingSummaryProps) {
  const handleConfirm = async () => {
    if (!state.slot || !state.serviceId) return;

    dispatch({ type: 'SUBMIT_START' });

    const { firstName, lastName, email, phone: rawPhone, gender } = state.patientDetails;

    // Ensure phone number starts with +91.
    let phone = (rawPhone || '').trim();
    if (phone && !phone.startsWith('+91')) {
      phone = '+91' + phone;
    }

    const amount = getServicePrice(state.serviceName);
    const serviceName = state.serviceName;
    const environment: 'PRODUCTION' | 'TEST' =
      typeof window !== 'undefined' && window.location.hostname === PRODUCTION_HOSTNAME
        ? 'PRODUCTION'
        : 'TEST';

    // ── Google Sheet lead capture (existing instrumentation, preserved) ──
    const leadInput: BookingLeadInput = {
      customerName: `${firstName} ${lastName}`.trim(),
      phone,
      email,
      age: '',
      landingPage: landingPage || getServiceRedirectUrl(serviceName),
      serviceName,
      serviceCode,
      serviceId: state.serviceId,
      appointmentDate: state.slot.date,
      preferredTime: state.slot.start_time,
      environment,
    };
    const leadReference = captureBookingLead(leadInput);
    capturePostHogEvent('booking_confirm_clicked', {
      service_name: serviceName,
      landing_page: leadInput.landingPage,
      environment,
    });

    try {
      let patientId: string | null = null;

      // 1. Register User in Auth
      const registerPayload = {
        username: email || phone, // fallback to phone if email empty
        email: email,
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
        password: `${firstName.replace(/\s/g, '')}@12345`,
        password2: `${firstName.replace(/\s/g, '')}@12345`,
        gender: gender,
      };

      const registerRes = await fetch(`${AUTH_BASE_URL}/public/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
        body: JSON.stringify(registerPayload),
      });
      const registerData = await registerRes.json();

      if (!registerData.success && registerRes.status !== 200 && registerRes.status !== 201) {
        const isDuplicate =
          registerData.error === 'validation_error' &&
          registerData.encrypted_user_id &&
          ((registerData.errors?.phone_number &&
            String(registerData.errors.phone_number).toLowerCase().includes('already exists')) ||
            (registerData.errors?.email &&
              String(registerData.errors.email).toLowerCase().includes('already exists')) ||
            (registerData.errors?.username &&
              String(registerData.errors.username).toLowerCase().includes('already exists')));

        if (isDuplicate) {
          // Step A: decrypt the encrypted_user_id to get the numeric user_id
          const decryptRes = await fetch(`${API_BASE_URL}/user/user-id-crypto/encrypt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
            body: JSON.stringify({ user_id: registerData.encrypted_user_id }),
          });
          const decryptData = await decryptRes.json();
          if (!decryptData.success || !decryptData.user_id) {
            throw new Error('User already registered but could not retrieve account. Please contact support.');
          }
          const resolvedUserId = decryptData.user_id;

          // Step B: fetch existing patient record by user_id
          const patientRes = await fetch(`${API_BASE_URL}/doctor/patient/GetPatientsByUserId/${resolvedUserId}`, {
            headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
          });
          const patientData = await patientRes.json();
          const existingPatient =
            patientData?.patients?.[0] ||
            patientData?.data?.[0] ||
            (Array.isArray(patientData) ? patientData[0] : null);

          if (existingPatient?.id) {
            patientId = existingPatient.id;
          } else if (existingPatient?.patient_id) {
            patientId = existingPatient.patient_id;
          } else {
            const webhookRes = await fetch(`${API_BASE_URL}/doctor/webhooks/user-created`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
              body: JSON.stringify({
                user_id: resolvedUserId,
                email: email,
                first_name: firstName,
                last_name: lastName,
                username: registerPayload.username,
                password: registerPayload.password,
                phone_number: phone,
                gender: gender,
                user_type: 2,
                branch_id: BRANCH_ID,
              }),
            });
            const webhookData = await webhookRes.json();
            patientId = webhookData?.data?.patient_id || webhookData?.patient_id || webhookData?.data?.id;
            if (!patientId)
              throw new Error('User already registered but could not create patient record. Please contact support.');
          }
        } else {
          if (registerData.error === 'validation_error' && registerData.errors) {
            const errorMsgs = Object.values(registerData.errors).flat().join(' ');
            throw new Error(errorMsgs || registerData.message || 'Registration failed');
          }
          throw new Error(registerData.message || 'Registration failed');
        }
      }

      // New user path: create patient via webhook
      if (!patientId && (registerData.success || registerRes.status === 200 || registerRes.status === 201)) {
        const userId =
          registerData.data?.user?.id || registerData.id || registerData.user?.id || registerData.user_id;

        if (userId) {
          const webhookRes = await fetch(`${API_BASE_URL}/doctor/webhooks/user-created`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
            body: JSON.stringify({
              user_id: userId,
              email: email,
              first_name: firstName,
              last_name: lastName,
              username: registerPayload.username,
              password: registerPayload.password,
              phone_number: phone,
              gender: gender,
              user_type: 2,
              branch_id: BRANCH_ID,
            }),
          });
          const webhookData = await webhookRes.json();
          patientId = webhookData?.data?.patient_id || webhookData?.patient_id || webhookData?.data?.id;
        }
      }

      if (!patientId) {
        throw new Error('Failed to resolve patient ID.');
      }

      // 2. Create Appointment
      const appointmentPayload = {
        amount,
        customer_name: `${firstName} ${lastName}`.trim(),
        customer_email: email,
        customer_phone: phone,
        notes: {
          customer_name: `${firstName} ${lastName}`.trim(),
          customer_email: email,
          customer_phone: phone,
          service_name: serviceName,
          date: state.slot.date.split('-').reverse().join('-'), // DD-MM-YYYY
          source: 'mumbai.aiwo.com Website payment',
        },
        patient_id: patientId,
        date: state.slot.date,
        start_time: state.slot.start_time,
        end_time: state.slot.end_time,
        slot_id: state.slot.id.split(','),
        slot_ids: state.slot.id.split(','),
        doctor_id: '',
        service_id: state.serviceId,
        service_name: serviceName,
        services: [
          {
            service_type_id: state.serviceId,
            sequence_order: 0,
            resources: [],
          },
        ],
        service_type_id: state.serviceId,
        service_type_ids: [state.serviceId],
        resource_slot_ids: state.slot.id.split(','),
        booking_source: state.isOnline ? 'online' : 'walk_in',
        appointment_type: 1,
        consustant_type: state.isOnline ? 2 : 1,
        branch_id: BRANCH_ID,
        redirect_url: window.location.origin + getServiceRedirectUrl(serviceName),
        ...(state.isOnline ? { appointment_type_for: 'video', meeting_provider: 'google_meet' } : {}),
      };

      const bookingResult = await bookingService.insertAppointmentWithPayment(appointmentPayload);

      if (bookingResult && bookingResult.checkout_url) {
        // ── Preserve completed work: lead marked payment-initiated + context for /payment/success ──
        markBookingPaymentInitiated(leadReference, leadInput, bookingResult.order_id || '');
        capturePostHogEvent('razorpay_checkout_opened', {
          service_name: serviceName,
          amount,
          currency: 'INR',
          environment,
        });
        try {
          localStorage.setItem(
            'aiwo_purchase_meta',
            JSON.stringify({ amount, serviceName, orderId: bookingResult.order_id || '' })
          );
        } catch {
          // Non-fatal — the success page also reads the order id from the URL.
        }
        window.location.href = bookingResult.checkout_url;
        return; // Wait for browser to redirect
      }

      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (err: any) {
      markBookingApiFailed(leadReference, leadInput);
      capturePostHogEvent('booking_api_failed', { service_name: serviceName, environment });
      dispatch({ type: 'SUBMIT_ERROR', payload: err.message || 'An unexpected error occurred during booking.' });
    }
  };

  if (state.submitSuccess) {
    return (
      <div className="booking-step booking-success">
        <h3 className="booking-step__title">Booking Received</h3>
        <p className="booking-step__desc">
          Your appointment request for <strong>{state.serviceName}</strong> has been received.
        </p>
        <p>Our team will reach out shortly to confirm your booking and payment.</p>
        <button className="btn-primary form-submit" onClick={() => dispatch({ type: 'RESET' })}>
          Book Another Service
        </button>
      </div>
    );
  }

  return (
    <div className="booking-step">
      <div className="booking-step__header">
        <button
          className="btn-back"
          type="button"
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          disabled={state.isSubmitting}
        >
          &larr; Back
        </button>
        <h3 className="booking-step__title">Review &amp; Confirm</h3>
      </div>
      <p className="booking-step__desc">Please review your appointment details before confirming.</p>

      {state.submitError && <div className="booking-error">{state.submitError}</div>}

      <div className="booking-summary-card">
        <div className="summary-row">
          <span className="summary-label">Service:</span>
          <span className="summary-value">{state.serviceName}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Type:</span>
          <span className="summary-value">{state.isOnline ? 'Online (Video)' : 'Walk-in (In-Person)'}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Date &amp; Time:</span>
          <span className="summary-value">
            {state.slot ? formatDateNicely(state.slot.date) : ''} at {state.slot?.start_time}
          </span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Patient Name:</span>
          <span className="summary-value">
            {state.patientDetails.firstName} {state.patientDetails.lastName}
          </span>
        </div>
      </div>

      <button className="btn-primary form-submit" onClick={handleConfirm} disabled={state.isSubmitting}>
        {state.isSubmitting ? 'Confirming...' : 'Confirm Booking'}
      </button>
    </div>
  );
}
