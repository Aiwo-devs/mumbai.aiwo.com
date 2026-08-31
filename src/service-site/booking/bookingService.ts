/* eslint-disable @typescript-eslint/no-explicit-any -- the healthportal response
   shapes are not typed in this project; the responses are validated at runtime. */
// Booking engine ported from the add-booking ServiceBooking implementation.
// ONLY the transport layer is adapted: the original read its base URLs from
// browser-exposed import.meta.env.VITE_* vars. Here the browser only ever calls
// same-origin paths — /api and /auth-api on the production host (proxied to the
// healthportal booking/auth upstreams by Netlify), or the same-origin Netlify
// Function proxies on every other host. No backend host or secret reaches the
// browser. All endpoints, payloads, headers and business logic are unchanged.
const PRODUCTION_HOSTNAME = 'mumbai.aiwo.com';
const isProductionHost =
  typeof window !== 'undefined' && window.location.hostname === PRODUCTION_HOSTNAME;

export const API_BASE_URL = isProductionHost ? '/api' : '/.netlify/functions/booking-api-proxy';
export const AUTH_BASE_URL = isProductionHost ? '/auth-api' : '/.netlify/functions/auth-api-proxy';

export const BRANCH_ID = 'b0a11c00-0000-4000-8000-000000000002';
export const BRANCH_CODE = 'MUM';

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'x-application-name': 'healthportal',
};

export interface Practitioner {
  id: string;
  name: string;
  designation?: string;
}

export interface Slot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  hasDoctor?: boolean;
}

export const bookingService = {
  // Fetch all services (to map a service name to its service_type_id).
  getServices: async (): Promise<any[]> => {
    const res = await fetch(
      `${API_BASE_URL}/doctor/service-types/list?pageNo=1&pagesize=200&pagination_required=false&search=&branch_code=${BRANCH_CODE}`,
      { headers: JSON_HEADERS }
    );
    if (!res.ok) throw new Error('Failed to fetch services');
    const data = await res.json();
    return data.data || data;
  },

  // Fetch available slots for a service (no practitioner selection). Combines
  // consecutive 15-minute slots for the same resource into bookable blocks.
  getServiceAvailableSlots: async (serviceId: string, date: string): Promise<Slot[]> => {
    const params = new URLSearchParams({ date, service_type_id: serviceId });

    const res = await fetch(
      `${API_BASE_URL}/doctor/availability/service-available-slots?${params.toString()}`,
      { headers: JSON_HEADERS }
    );

    if (!res.ok) throw new Error('Failed to fetch service slots');
    const payload = await res.json();

    if (payload.slots && Array.isArray(payload.slots)) {
      const slotsByResource: Record<string, any[]> = {};
      for (const slot of payload.slots) {
        const isAvailable = slot.available || slot.unavailable_reason === 'incomplete_resource_types';
        if (!isAvailable) continue;
        if (!slotsByResource[slot.resource_id]) slotsByResource[slot.resource_id] = [];
        slotsByResource[slot.resource_id].push(slot);
      }

      const allCombinedSlots: Slot[] = [];
      const seenTimes = new Set<string>();

      for (const resourceId in slotsByResource) {
        const sorted = slotsByResource[resourceId].sort((a: any, b: any) =>
          a.start_time.localeCompare(b.start_time)
        );
        let i = 0;
        while (i < sorted.length - 1) {
          const slot1 = sorted[i];
          const slot2 = sorted[i + 1];
          if (slot1.end_time === slot2.start_time) {
            const timeKey = `${slot1.start_time}-${slot2.end_time}`;
            if (!seenTimes.has(timeKey)) {
              seenTimes.add(timeKey);
              allCombinedSlots.push({
                id: `${slot1.slot_id},${slot2.slot_id}`,
                date: payload.date || date,
                start_time: slot1.start_time,
                end_time: slot2.end_time,
                hasDoctor:
                  (slot1.resource_type || '').toLowerCase().includes('doctor') ||
                  (slot2.resource_type || '').toLowerCase().includes('doctor'),
              });
            }
            i += 2;
          } else {
            i += 1;
          }
        }
      }

      return allCombinedSlots.sort((a, b) => a.start_time.localeCompare(b.start_time));
    }

    return [];
  },

  // Insert appointment with payment. Returns the payload including checkout_url.
  insertAppointmentWithPayment: async (payload: any): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/appointment/appointments/InsertAppointmentWithPayment`, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create appointment');
    return res.json();
  },
};
