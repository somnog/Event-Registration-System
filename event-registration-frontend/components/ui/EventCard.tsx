"use client";

import { Card, Button, Modal, message, Tag } from "antd";
import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";
import { eventsService } from "../../services/events.service";

type Event = {
  id: string;
  title: string;
  venue: string;
  startDate: string;
  endDate: string;
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
  capacity: number;
  registrations: number;
  poster?: string;
  category: string;
  city: string;
  isFree: boolean;
};

type Props = {
  event: Event;
  onDeleted?: (id: string) => void; // callback to remove event from dashboard
};

export default function EventCard({ event, onDeleted }: Props) {
  const router = useRouter();

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this event?",
      content: `Event: ${event.title}`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await eventsService.deleteEvent(event.id);
          message.success("Event deleted successfully!");
          if (onDeleted) onDeleted(event.id);
        } catch (error) {
          message.error("Failed to delete event.");
        }
      },
    });
  };

  return (
    <Card
      title={event.title}
      style={{ marginBottom: 16 }}
      extra={<StatusBadge status={event.status} />}
      cover={
        event.poster ? (
          <img
            src={event.poster}
            alt={event.title}
            style={{ width: "100%", borderRadius: 8 }}
          />
        ) : null
      }
    >
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>City:</strong> {event.city}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Date:</strong> {event.startDate} - {event.endDate}</p>
      <p>
        <strong>Capacity:</strong> {event.registrations} / {event.capacity}
      </p>
      <p>
        <strong>Type:</strong> {event.isFree ? <Tag color="green">Free</Tag> : <Tag color="blue">Paid</Tag>}
      </p>

      <div style={{ marginTop: 12 }}>
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() => router.push(`/organizer/edit-event/${event.id}`)}
        >
          Edit
        </Button>

        <Button
          style={{ marginRight: 8 }}
          onClick={() => router.push(`/organizer/attendees/${event.id}`)}
        >
          Attendees
        </Button>

        <Button danger onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
}
