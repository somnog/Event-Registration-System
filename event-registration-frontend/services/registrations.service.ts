// services/registrations.service.ts
import { Event } from "./events.service"; // import Event type

// ---------- Existing Attendee code ----------
export interface Attendee {
  id: string;
  name: string;
  email: string;
  status:  "CONFIRMED" | "WAITLISTED" | "CANCELLED"; 
  attendanceConfirmed: boolean;
}

// Dummy attendees mapped by eventId
const dummyAttendees: Record<string, Attendee[]> = {
  "1": [
    { id: "a1", name: "John Doe", email: "john@example.com", status: "CONFIRMED", attendanceConfirmed: false },
    { id: "a2", name: "Jane Smith", email: "jane@example.com", status: "CONFIRMED", attendanceConfirmed: true },
    { id: "a3", name: "Ali Mohamed", email: "ali@example.com", status: "WAITLISTED", attendanceConfirmed: false },
    { id: "a4", name: "Fatima Noor", email: "fatima@example.com", status: "CANCELLED", attendanceConfirmed: false },
  ],
};

// ---------- New Attendee Dashboard / Registrations code ----------
export interface Registration {
  id: string;
  status: "CONFIRMED" | "CANCELLED" | "WAITLISTED";
  event: Event;
}

// Dummy registrations for logged-in attendee
let dummyRegistrations: Registration[] = [
  { 
    id: "r1", 
    status: "CONFIRMED", 
    event: { 
      id: "1",
      title: "Tech Conference 2025",
      venue: "Mogadishu Convention Center",
      startDate: "2025-12-15",
      endDate: "2025-12-16",
      status: "PUBLISHED",
      capacity: 100,
      registrations: 75,
      poster: "/images/tech.jpg",   // ✅ ADD THIS
      category: "Conference",
      city: "Mogadishu",
      isFree: true,
    } 
  },
  { 
    id: "r2", 
    status: "CONFIRMED", 
    event: { 
      id: "2",
      title: "Workshop on Sustainability",
      venue: "City Hall",
      startDate: "2025-12-20",
      endDate: "2025-12-20",
      status: "PUBLISHED",
      capacity: 50,
      registrations: 10,
      poster: "/images/semin.jpeg", // ✅ ADD THIS
      category: "Social",
      city: "Banaadir",
      isFree: true,
    } 
  },
];
// ---------- Exported services ----------
export const registrationsService = {
  // Organizer-side attendee functions
  getAttendees: async (eventId: string): Promise<Attendee[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyAttendees[eventId] || []), 300);
    });
  },

  markAttendance: async (eventId: string, attendeeId: string): Promise<Attendee[]> => {
    const attendees = dummyAttendees[eventId];
    if (!attendees) return [];
    const updatedAttendees = attendees.map(a => 
      a.id === attendeeId ? { ...a, attendanceConfirmed: true } : a
    );
    dummyAttendees[eventId] = updatedAttendees;
    return new Promise((resolve) => setTimeout(() => resolve(updatedAttendees), 200));
  },

  // Attendee-side registrations
  getMyRegistrations: async (): Promise<Registration[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(dummyRegistrations), 500));
  },

  cancelRegistration: async (id: string): Promise<void> => {
    dummyRegistrations = dummyRegistrations.filter(r => r.id !== id);
    return;
  }
};
