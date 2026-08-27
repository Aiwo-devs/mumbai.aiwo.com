import type { Slot } from '../../api/bookingService'

export type BookingStep = 
  | 'SELECT_SLOT' 
  | 'PATIENT_DETAILS' 
  | 'SUMMARY'

export interface PatientDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string
}

export interface BookingState {
  step: BookingStep
  serviceId: string | null
  serviceName: string
  isOnline: boolean
  slot: Slot | null
  patientDetails: PatientDetails
  isSubmitting: boolean
  submitError: string | null
  submitSuccess: boolean
}

export type BookingAction =
  | { type: 'SET_SERVICE_CONTEXT'; payload: { serviceId: string; serviceName: string } }
  | { type: 'TOGGLE_ONLINE'; payload: boolean }
  | { type: 'SELECT_SLOT'; payload: Slot }
  | { type: 'SET_DETAILS'; payload: Partial<PatientDetails> }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; payload: string }
  | { type: 'RESET' }

export const initialBookingState: BookingState = {
  step: 'SELECT_SLOT',
  serviceId: null,
  serviceName: '',
  isOnline: false, // Default to Walk-in
  slot: null,
  patientDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: ''
  },
  isSubmitting: false,
  submitError: null,
  submitSuccess: false
}

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_SERVICE_CONTEXT':
      return { 
        ...state, 
        serviceId: action.payload.serviceId, 
        serviceName: action.payload.serviceName 
      }
    case 'TOGGLE_ONLINE':
      return {
        ...state,
        isOnline: action.payload,
        slot: null
      }
    case 'SELECT_SLOT':
      return {
        ...state,
        slot: action.payload,
        step: 'PATIENT_DETAILS' // Auto-advance
      }
    case 'SET_DETAILS':
      return {
        ...state,
        patientDetails: { ...state.patientDetails, ...action.payload }
      }
    case 'NEXT_STEP': {
      let nextStep = state.step
      if (state.step === 'SELECT_SLOT') nextStep = 'PATIENT_DETAILS'
      else if (state.step === 'PATIENT_DETAILS') nextStep = 'SUMMARY'
      return { ...state, step: nextStep }
    }
    case 'PREV_STEP': {
      let prevStep = state.step
      if (state.step === 'SUMMARY') prevStep = 'PATIENT_DETAILS'
      else if (state.step === 'PATIENT_DETAILS') prevStep = 'SELECT_SLOT'
      return { ...state, step: prevStep }
    }
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, submitError: null }
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, submitSuccess: true }
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, submitError: action.payload }
    case 'RESET':
      return { 
        ...initialBookingState, 
        serviceId: state.serviceId, 
        serviceName: state.serviceName 
      }
    default:
      return state
  }
}

