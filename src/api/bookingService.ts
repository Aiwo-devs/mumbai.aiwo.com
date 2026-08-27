const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL

export const BRANCH_ID = "b0a11c00-0000-4000-8000-000000000002"
export const BRANCH_CODE = "MUM"

export interface Practitioner {
  id: string
  name: string
  designation?: string
  // Add other required fields based on API response
}

export interface Slot {
  id: string
  date: string
  start_time: string
  end_time: string
  hasDoctor?: boolean
}

export const bookingService = {
  // Fetch All Services to map name to ID
  getServices: async (): Promise<any[]> => {
    const res = await fetch(`${API_BASE_URL}/doctor/service-types/list?pageNo=1&pagesize=200&pagination_required=false&search=&branch_code=${BRANCH_CODE}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-application-name': 'healthportal',
      },
    })
    if (!res.ok) throw new Error('Failed to fetch services')
    const data = await res.json()
    return data.data || data
  },

  // Fetch Practitioners for a service
  getPractitioners: async (serviceId: string, isOnline: boolean): Promise<Practitioner[]> => {
    const params = new URLSearchParams()
    if (isOnline) {
      params.append('online', 'true')
    } else {
      params.append('branch_code', BRANCH_CODE)
    }

    const res = await fetch(`${API_BASE_URL}/doctor/service-types/${serviceId}/resources?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-application-name': 'healthportal',
      },
    })
    
    if (!res.ok) throw new Error('Failed to fetch practitioners')
    const data = await res.json()
    // The health portal usually filters for human resources.
    // Ensure we handle the structure returned by this specific API.
    const list = data.data || data || []
    return list.map((item: any) => ({
      ...item,
      id: item.resource_id || item.id,
    }))
  },

  // Fetch Available Slots
  getAvailableSlots: async (resourceId: string, date: string): Promise<Slot[]> => {
    const params = new URLSearchParams({
      date,
      resource_id: resourceId,
      branch_id: BRANCH_ID,
    })

    const res = await fetch(`${API_BASE_URL}/doctor/availability/resource-slots-with-bookings?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-application-name': 'healthportal',
      },
    })
    
    if (!res.ok) throw new Error('Failed to fetch slots')
    const payload = await res.json()
    
    const responseData = payload.data || payload;
    
    if (responseData.resources && responseData.resources.length > 0) {
      const resource = responseData.resources.find((r: any) => r.resource_id === resourceId) || responseData.resources[0];
      if (resource && resource.slots && Array.isArray(resource.slots)) {
        const sortedSlots = [...resource.slots].sort((a: any, b: any) => a.start_time.localeCompare(b.start_time));
        const combinedSlots: Slot[] = [];
        
        let i = 0;
        while (i < sortedSlots.length - 1) {
          const slot1 = sortedSlots[i];
          const slot2 = sortedSlots[i + 1];
          if (slot1.available && slot2.available && slot1.end_time === slot2.start_time) {
            combinedSlots.push({
              id: `${slot1.slot_id},${slot2.slot_id}`,
              date: responseData.date || date,
              start_time: slot1.start_time,
              end_time: slot2.end_time,
            });
            i += 2; // Skip the next slot to avoid overlapping
          } else {
            i += 1;
          }
        }
        return combinedSlots;
      }
    }
    
    return []
  },

  // Fetch Service Available Slots (Without Practitioner)
  getServiceAvailableSlots: async (serviceId: string, date: string): Promise<Slot[]> => {
    const params = new URLSearchParams({
      date,
      service_type_id: serviceId,
    })

    const res = await fetch(`${API_BASE_URL}/doctor/availability/service-available-slots?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-application-name': 'healthportal',
      },
    })
    
    if (!res.ok) throw new Error('Failed to fetch service slots')
    const payload = await res.json()
    
    if (payload.slots && Array.isArray(payload.slots)) {
      // Group slots by resource_id to combine consecutive 15-min slots for the SAME resource
      const slotsByResource: Record<string, any[]> = {}
      for (const slot of payload.slots) {
        const isAvailable = slot.available || slot.unavailable_reason === 'incomplete_resource_types'
        if (!isAvailable) continue
        if (!slotsByResource[slot.resource_id]) slotsByResource[slot.resource_id] = []
        slotsByResource[slot.resource_id].push(slot)
      }

      const allCombinedSlots: Slot[] = []
      const seenTimes = new Set<string>()

      for (const resourceId in slotsByResource) {
        const sorted = slotsByResource[resourceId].sort((a: any, b: any) => a.start_time.localeCompare(b.start_time))
        let i = 0
        while (i < sorted.length - 1) {
          const slot1 = sorted[i]
          const slot2 = sorted[i + 1]
          if (slot1.end_time === slot2.start_time) {
            const timeKey = `${slot1.start_time}-${slot2.end_time}`
            // Only add each time block once, even if multiple resources are available
            if (!seenTimes.has(timeKey)) {
              seenTimes.add(timeKey)
              allCombinedSlots.push({
                id: `${slot1.slot_id},${slot2.slot_id}`, // comma separated
                date: payload.date || date,
                start_time: slot1.start_time,
                end_time: slot2.end_time,
                hasDoctor: (slot1.resource_type || '').toLowerCase().includes('doctor') || 
                           (slot2.resource_type || '').toLowerCase().includes('doctor'),
              })
            }
            i += 2
          } else {
            i += 1
          }
        }
      }

      return allCombinedSlots.sort((a, b) => a.start_time.localeCompare(b.start_time))
    }
    
    return []
  },

  // Auth Registration
  registerUser: async (userData: any): Promise<any> => {
    const res = await fetch(`${AUTH_BASE_URL}/public/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-application-name': 'healthportal',
      },
      body: JSON.stringify({
        ...userData,
        groups: ["customer"]
      }),
    })
    const data = await res.json()
    if (!res.ok && !data.encrypted_user_id) throw new Error(data.message || 'Registration failed')
    return data
  },

  // Decrypt User ID (if user already exists)
  decryptUserId: async (encryptedUserId: string): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/user/user-id-crypto/encrypt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-application-name': 'healthportal',
      },
      body: JSON.stringify({ user_id: encryptedUserId }),
    })
    if (!res.ok) throw new Error('Failed to decrypt user ID')
    return res.json()
  },

  // Get Patient by User ID
  getPatientByUserId: async (userId: string): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/doctor/patient/GetPatientsByUserId/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-application-name': 'healthportal',
      },
    })
    if (!res.ok) throw new Error('Failed to fetch patient')
    return res.json()
  },

  // Sync Patient (Webhook)
  syncPatient: async (payload: any): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/doctor/webhooks/user-created`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-application-name': 'healthportal',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to sync patient')
    return res.json()
  },

  // Insert Appointment With Payment
  insertAppointmentWithPayment: async (payload: any): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/appointment/appointments/InsertAppointmentWithPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-application-name': 'healthportal',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to create appointment')
    return res.json()
  }
}
