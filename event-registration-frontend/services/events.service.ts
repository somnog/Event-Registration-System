export interface Event {
  id: string;
  title: string;
  venue: string;
  startDate: string;
  endDate: string;
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
  capacity: number;
  registrations: number;
  poster?: string; // new poster field (URL or file name)
category: string;
  city: string;
  isFree: boolean;
}

let dummyEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    venue: "Mogadishu Convention Center",
    startDate: "2025-12-15",
    endDate: "2025-12-16",
    status: "PUBLISHED",
    capacity: 100,
    registrations: 75,
    poster: "/images/tech.jpg",
    //  Add these fields
     category: "Conference",
    city: "Mogadishu",
    isFree: true,

  },
  {
    id: "2",
    title: "Workshop on Sustainability",
    venue: "City Hall",
    startDate: "2025-12-20",
    endDate: "2025-12-20",
    status: "DRAFT",
    capacity: 50,
    registrations: 10,
        poster: "/images/semin.jpeg",

    category: "Social",
    city: "Kismayo",
    isFree: true,
  },
  {
    id: "3",
    title: "Music Festival",
    venue: "Open Ground",
    startDate: "2025-12-30",
    endDate: "2025-12-31",
    status: "COMPLETED",
    capacity: 200,
    registrations: 200,
    poster: "/images/music_festival.jpg",
    category: "Seminar",
    city: "Kismayo",
    isFree: true,
  },
];

export const eventsService = {
  getOrganizerEvents: async () => {
    return new Promise<Event[]>(resolve => {
      setTimeout(() => resolve(dummyEvents), 500);
    });
  },

  createEvent: async (eventData: Omit<Event, "id" | "registrations">) => {
    return new Promise<Event>(resolve => {
      const newEvent: Event = {
        id: (dummyEvents.length + 1).toString(),
        registrations: 0,
        poster: eventData.poster, // save poster if provided
        ...eventData,
      };
      dummyEvents.push(newEvent);
      setTimeout(() => resolve(newEvent), 500);
    });
  },

  getEventById: async (id: string) => {
    return new Promise<Event | undefined>(resolve => {
      const event = dummyEvents.find(e => e.id === id);
      setTimeout(() => resolve(event), 500);
    });
  },

  updateEvent: async (id: string, updatedData: Partial<Omit<Event, "id" | "registrations">>) => {
    return new Promise<Event | undefined>(resolve => {
      const index = dummyEvents.findIndex(e => e.id === id);
      if (index !== -1) {
        dummyEvents[index] = { ...dummyEvents[index], ...updatedData };
        resolve(dummyEvents[index]);
      } else resolve(undefined);
    });
  },

  // ✅ Add deleteEvent
  deleteEvent: async (id: string): Promise<void> => {
    dummyEvents = dummyEvents.filter((e) => e.id !== id);
    return;
  },
//   getEvents: async () => {
//     return new Promise<Event[]>((resolve) => {
//       setTimeout(() => {
//         const published = dummyEvents.filter((e) => e.status === "PUBLISHED");
//         resolve(published);
//       }, 500);
//     });
//   },
  getEvents: async () => {
  return new Promise<Event[]>((resolve) => {
    setTimeout(() => resolve(dummyEvents), 500);
  });
}
};



