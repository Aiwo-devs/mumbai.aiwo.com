import React, { useEffect, useState } from 'react'
import { bookingService } from '../../../api/bookingService'
import type { Slot } from '../../../api/bookingService'
import type { BookingAction, BookingState } from '../bookingReducer'

interface SlotSelectionProps {
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
}

// Helper to format date to YYYY-MM-DD
const formatDate = (date: Date) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

// Helper to format time (e.g., 10:00:00 -> 10:00 AM)
const formatTime = (timeStr: string) => {
  const [hourStr, minStr] = timeStr.split(':')
  let hour = parseInt(hourStr, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12
  hour = hour ? hour : 12
  return `${hour}:${minStr} ${ampm}`
}

export function SlotSelection({ state, dispatch }: SlotSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()))
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchSlots = async () => {
      if (!state.serviceId) return

      setLoading(true)
      setError(null)
      try {
        const data = await bookingService.getServiceAvailableSlots(state.serviceId, selectedDate)
        if (isMounted) {
          setSlots(data || [])
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Failed to load availability')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchSlots()

    return () => {
      isMounted = false
    }
  }, [state.serviceId, selectedDate])

  // Force isOnline to false if no slots have a doctor resource
  useEffect(() => {
    if (slots.length > 0) {
      const hasDoctorResource = slots.some(s => s.hasDoctor)
      if (!hasDoctorResource && state.isOnline) {
        dispatch({ type: 'TOGGLE_ONLINE', payload: false })
      }
    }
  }, [slots, state.isOnline, dispatch])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  const handleSelectSlot = (slot: Slot) => {
    dispatch({ type: 'SELECT_SLOT', payload: slot })
  }

  return (
    <div className="booking-step">
      <div className="booking-step__header">
        <h3 className="booking-step__title">Select Date & Time</h3>
      </div>
      <p className="booking-step__desc">
        Pick an available slot for {state.serviceName}.
      </p>

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

      {!loading && !error && slots.some(s => s.hasDoctor) && (
        <div className="booking-consultation-type" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>Consultation Type</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input 
                type="radio" 
                name="consultationType" 
                checked={!state.isOnline} 
                onChange={() => dispatch({ type: 'TOGGLE_ONLINE', payload: false })} 
              />
              Walk-in (In-Person)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
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

      {!loading && !error && slots.length === 0 && (
        <div className="booking-empty">No availability on this date. Please select another date.</div>
      )}

      {!loading && !error && slots.length > 0 && (
        <div className="slot-grid">
          {slots.map((slot) => {
            const isSelected = state.slot?.id === slot.id
            return (
              <button
                key={slot.id}
                className={`slot-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectSlot(slot)}
              >
                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

