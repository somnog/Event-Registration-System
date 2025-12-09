"use client";

import { useEffect, useState } from "react";
import EventCard from "../../../../components/ui/EventCard";
import { eventsService, Event } from "../../../../services/events.service";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../../components/ui/layout/AdminLayout"; // import layout

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await eventsService.getOrganizerEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <AdminLayout>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 24 }}>Organizer Dashboard</h1>

        <Button
          type="primary"
          style={{ marginBottom: 24 }}
          onClick={() => router.push("/organizer/create-event")}
        >
          Create New Event
        </Button>

        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </AdminLayout>
  );
}
