import React from 'react'
import { bookingService, BRANCH_ID } from '../../../api/bookingService'
import type { BookingAction, BookingState } from '../bookingReducer'

interface BookingSummaryProps {
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
}

// Helper to format date nicely
const formatDateNicely = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

// Helper to map service names to hardcoded prices
const getServicePrice = (serviceName: string): number => {
  const name = (serviceName || '').toLowerCase()
  if (name.includes('vo2 max')) return 7999
  if (name.includes('sculpting')) return 3500
  if (name.includes('posture')) return 4999
  if (name.includes('iv iron') || name.includes('mega glow') || name.includes('iv therapy')) return 14999
  if (name.includes('rmr')) return 4999
  return 0
}

// Helper to map service names to their respective service pages for redirect
const getServiceRedirectUrl = (serviceName: string): string => {
  const name = (serviceName || '').toLowerCase()
  if (name.includes('vo2 max')) return '/services/vo2-max'
  if (name.includes('sculpting')) return '/services/ems-sculpting'
  if (name.includes('posture')) return '/services/posture-screening'
  if (name.includes('iv iron') || name.includes('mega glow') || name.includes('iv therapy')) return '/services/iv-therapy'
  if (name.includes('rmr')) return '/services/rmr'
  return '/' // Default fallback
}


export function BookingSummary({ state, dispatch }: BookingSummaryProps) {
  const handleConfirm = async () => {
    if (!state.slot || !state.serviceId) return

    dispatch({ type: 'SUBMIT_START' })

    try {
      const { firstName, lastName, email, phone: rawPhone, gender } = state.patientDetails

      // Ensure phone number starts with +91
      let phone = (rawPhone || '').trim()
      if (phone && !phone.startsWith('+91')) {
        phone = '+91' + phone
      }

      let patientId: string | null = null

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
      }

      let userId = null

      try {
        const authRes = await bookingService.registerUser(registerPayload)
        // New user created successfully
        userId = authRes.data?.user?.id || authRes.id || authRes.user?.id || authRes.user_id

        // Webhook sync to Health API to create Patient profile
        if (userId) {
          const syncRes = await bookingService.syncPatient({
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phone,
            gender: gender,
            user_type: 2,
            branch_id: BRANCH_ID
          })
          patientId = syncRes.data?.patient_id || syncRes.data?.id || syncRes.patient_id || syncRes.id
        }
      } catch (err: any) {
        throw new Error('User already exists or registration failed. (Implementation details depend on specific API error format)')
      }

      if (!patientId) {
        throw new Error('Failed to resolve patient ID.')
      }


      // 2. Create Appointment
      const appointmentPayload = {
        amount: getServicePrice(state.serviceName),
        customer_name: `${firstName} ${lastName}`.trim(),
        customer_email: email,
        customer_phone: phone,
        notes: {
          customer_name: `${firstName} ${lastName}`.trim(),
          customer_email: email,
          customer_phone: phone,
          service_name: state.serviceName,
          date: state.slot.date.split('-').reverse().join('-'), // DD-MM-YYYY format
          source: "mumbai.aiwo.com Website payment"
        },
        patient_id: patientId,
        date: state.slot.date,
        start_time: state.slot.start_time,
        end_time: state.slot.end_time,
        slot_id: state.slot.id.split(','),
        slot_ids: state.slot.id.split(','), // keeping for backwards compatibility
        doctor_id: "",
        service_id: state.serviceId,
        service_name: state.serviceName,
        services: [{
          service_type_id: state.serviceId,
          sequence_order: 0,
          resources: [] // Auto-assigned by backend since we don't select practitioners anymore
        }],
        service_type_id: state.serviceId,
        service_type_ids: [state.serviceId],
        resource_slot_ids: state.slot.id.split(','),
        booking_source: state.isOnline ? 'online' : 'walk_in',

        // Additional properties kept from previous version
        appointment_type: 1, // 1 for Walk_in or specific enum
        consustant_type: state.isOnline ? 2 : 1, // 1 for walk_in, 2 for online
        branch_id: BRANCH_ID,
        redirect_url: window.location.origin + getServiceRedirectUrl(state.serviceName),
        ...(state.isOnline ? { appointment_type_for: "video", meeting_provider: "google_meet" } : {})
      }

      const bookingResult = await bookingService.insertAppointmentWithPayment(appointmentPayload)

      if (bookingResult && bookingResult.checkout_url) {
        window.location.href = bookingResult.checkout_url
        return // Wait for browser to redirect
      }

      dispatch({ type: 'SUBMIT_SUCCESS' })
    } catch (err: any) {
      dispatch({ type: 'SUBMIT_ERROR', payload: err.message || 'An unexpected error occurred during booking.' })
    }
  }

  if (state.submitSuccess) {
    return (
      <div className="booking-step booking-success">
        <h3 className="booking-step__title">Booking Confirmed</h3>
        <p className="booking-step__desc">
          Your appointment request for <strong>{state.serviceName}</strong> has been received.
        </p>
        <p>You will receive a WhatsApp message shortly with a secure link to finalize your payment.</p>
        <button className="btn-primary form-submit" onClick={() => dispatch({ type: 'RESET' })}>
          Book Another Service
        </button>
      </div>
    )
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
        <h3 className="booking-step__title">Review & Confirm</h3>
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
          <span className="summary-label">Date & Time:</span>
          <span className="summary-value">
            {state.slot ? formatDateNicely(state.slot.date) : ''} at {state.slot?.start_time}
          </span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Patient Name:</span>
          <span className="summary-value">{state.patientDetails.firstName} {state.patientDetails.lastName}</span>
        </div>
      </div>

      <button
        className="btn-primary form-submit"
        onClick={handleConfirm}
        disabled={state.isSubmitting}
      >
        {state.isSubmitting ? 'Confirming...' : 'Confirm Booking'}
      </button>
    </div>
  )
}

