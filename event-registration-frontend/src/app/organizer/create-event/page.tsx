"use client";

import EventForm, { EventFormValues } from "../../../../components/ui/EventForm";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();

  const handleSubmit = async (values: EventFormValues) => {
    console.log("Create Event (dummy):", values); // dummy action
    // Later: await eventsService.createEvent(values);
    router.push("/organizer/dashboard");
  };

  
  return (
    <div
      style={{
        maxWidth: 800, // form width
        margin: "0 auto", // center horizontally
        padding: 24, // spacing around
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Create New Event</h1>
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
}
