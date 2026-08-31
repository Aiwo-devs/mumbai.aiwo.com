import { useReducer, useEffect } from 'react';
import { bookingReducer, initialBookingState } from './bookingReducer';
import { SlotSelection } from './steps/SlotSelection';
import { PatientDetailsForm } from './steps/PatientDetails';
import { BookingSummary } from './steps/BookingSummary';
import './ServiceBooking.css';

interface ServiceBookingProps {
  serviceId: string;
  serviceName: string;
  /** Optional stable backend code for the resolved service — passed through for
   * lead capture only; does not affect booking logic. */
  serviceCode?: string;
  /** Route slug for lead-capture landing-page attribution. */
  landingPage?: string;
}

export function ServiceBooking({ serviceId, serviceName, serviceCode, landingPage }: ServiceBookingProps) {
  const [state, dispatch] = useReducer(bookingReducer, initialBookingState);

  // Initialize service context on mount or when props change.
  useEffect(() => {
    dispatch({ type: 'SET_SERVICE_CONTEXT', payload: { serviceId, serviceName } });
  }, [serviceId, serviceName]);

  const renderStep = () => {
    switch (state.step) {
      case 'SELECT_SLOT':
        return <SlotSelection state={state} dispatch={dispatch} />;
      case 'PATIENT_DETAILS':
        return <PatientDetailsForm state={state} dispatch={dispatch} />;
      case 'SUMMARY':
        return (
          <BookingSummary
            state={state}
            dispatch={dispatch}
            serviceCode={serviceCode}
            landingPage={landingPage}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="service-booking-widget">
      <div className="booking-stepper-indicator">
        <div className={`step-dot ${state.step === 'SELECT_SLOT' ? 'active' : ''}`}>1</div>
        <div className="step-line"></div>
        <div className={`step-dot ${state.step === 'PATIENT_DETAILS' ? 'active' : ''}`}>2</div>
        <div className="step-line"></div>
        <div className={`step-dot ${state.step === 'SUMMARY' ? 'active' : ''}`}>3</div>
      </div>

      <div className="booking-content-area">{renderStep()}</div>
    </div>
  );
}
