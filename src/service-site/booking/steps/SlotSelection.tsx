/* eslint-disable @typescript-eslint/no-explicit-any -- the healthportal slot
   response shape is not typed in this project; validated at runtime. */
import React, { useEffect, useState } from 'react';
import { bookingService } from '../bookingService';
import type { Slot } from '../bookingService';
import type { BookingAction, BookingState } from '../bookingReducer';

interface SlotSelectionProps {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
}

const formatDate = (date: Date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

const formatTime = (timeStr: string) => {
  const [hourStr, minStr] = timeStr.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour}:${minStr} ${ampm}`;
};

export function SlotSelection({ state, dispatch }: SlotSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSlots = async () => {
      if (!state.serviceId) return;

      const todayStr = formatDate(new Date());
      const effectiveDate = selectedDate < todayStr ? todayStr : selectedDate;
      if (selectedDate < todayStr) {
        setSelectedDate(todayStr);
      }

      setLoading(true);
      setError(null);
      try {
        const data = await bookingService.getServiceAvailableSlots(state.serviceId, effectiveDate);
        if (isMounted) setSlots(data || []);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Failed to load availability');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSlots();
    return () => {
      isMounted = false;
    };
  }, [state.serviceId, selectedDate]);

  // Force isOnline to false if no slots have a doctor resource.
  useEffect(() => {
    if (slots.length > 0) {
      const hasDoctorResource = slots.some((s) => s.hasDoctor);
      if (!hasDoctorResource && state.isOnline) {
        dispatch({ type: 'TOGGLE_ONLINE', payload: false });
      }
    }
  }, [slots, state.isOnline, dispatch]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const todayStr = formatDate(new Date());
    if (e.target.value < todayStr) {
      setSelectedDate(todayStr);
    } else {
      setSelectedDate(e.target.value);
    }
  };

  const handleSelectSlot = (slot: Slot) => {
    dispatch({ type: 'SELECT_SLOT', payload: slot });
  };

  const filteredSlots = slots.filter((slot) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    if (selectedDate < todayStr) return false;
    if (selectedDate > todayStr) return true;

    const [hourStr, minStr] = slot.start_time.split(':');
    const slotHour = parseInt(hourStr, 10);
    const slotMin = parseInt(minStr, 10);
    if (slotMin !== 0 && slotMin !== 30) return false;

    const slotTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), slotHour, slotMin, 0, 0);

    return slotTime > now;
  });

  return (
    <div className="booking-step">
      <div className="booking-step__header">
        <h3 className="booking-step__title">Select Date &amp; Time</h3>
      </div>
      <p className="booking-step__desc">Pick an available slot for {state.serviceName}.</p>

      <div className="booking-date-picker">
        <label htmlFor="appointment-date">Date</label>
        <input
          type="date"
          id="appointment-date"
          value={selectedDate}
          onChange={handleDateChange}
          min={formatDate(new Date())}
          className="form-input"
        />
      </div>

      {!loading && !error && filteredSlots.some((s) => s.hasDoctor) && (
        <div className="booking-consultation-type">
          <label className="booking-consultation-type__label">Consultation Type</label>
          <div className="booking-consultation-type__options">
            <label className="booking-consultation-type__option">
              <input
                type="radio"
                name="consultationType"
                checked={!state.isOnline}
                onChange={() => dispatch({ type: 'TOGGLE_ONLINE', payload: false })}
              />
              Walk-in (In-Person)
            </label>
            <label className="booking-consultation-type__option">
              <input
                type="radio"
                name="consultationType"
                checked={state.isOnline}
                onChange={() => dispatch({ type: 'TOGGLE_ONLINE', payload: true })}
              />
              Online (Video)
            </label>
          </div>
        </div>
      )}

      {loading && <div className="booking-loading">Loading available slots...</div>}
      {error && <div className="booking-error">{error}</div>}

      {!loading && !error && filteredSlots.length === 0 && (
        <div className="booking-empty">No availability on this date. Please select another date.</div>
      )}

      {!loading && !error && filteredSlots.length > 0 && (
        <div className="slot-grid">
          {filteredSlots.map((slot) => {
            const isSelected = state.slot?.id === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                className={`slot-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectSlot(slot)}
              >
                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
