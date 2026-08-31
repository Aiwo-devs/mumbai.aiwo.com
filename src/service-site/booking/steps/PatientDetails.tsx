import React, { useState } from 'react';
import type { BookingAction, BookingState, PatientDetails } from '../bookingReducer';

interface PatientDetailsFormProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
}

export function PatientDetailsForm({ state, dispatch }: PatientDetailsFormProps) {
  const [details, setDetails] = useState<PatientDetails>(state.patientDetails);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!details.firstName || !details.lastName || !details.email || !details.phone || !details.gender) {
      setError('Please fill in all required fields.');
      return;
    }

    setError(null);
    dispatch({ type: 'SET_DETAILS', payload: details });
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <div className="booking-step">
      <div className="booking-step__header">
        <button className="btn-back" type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}>
          &larr; Back
        </button>
        <h3 className="booking-step__title">Your Details</h3>
      </div>
      <p className="booking-step__desc">Please provide your contact information to secure your booking.</p>

      {error && <div className="booking-error">{error}</div>}

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={details.firstName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={details.lastName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={details.gender}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn-primary form-submit">
          Continue to Summary
        </button>
      </form>
    </div>
  );
}
