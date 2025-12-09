"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { eventsService, Event } from "../../../../services/events.service";
import { Card, Button, message, Modal, Tag } from "antd";

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEvent = async () => {
    if (!params.id) return;
    try {
      const data = await eventsService.getEventById(params.id);
      if (!data) throw new Error("Event not found");
      setEvent(data);

      // temp mock
      setIsRegistered(false);
    } catch {
      message.error("Event not found");
    }
  };

  const handleRegister = () => {
    if (!event) return;

    Modal.confirm({
      title: "Confirm Registration",
      content: `Do you want to register for "${event.title}"?`,
      okText: "Yes, Register",
      cancelText: "Cancel",
      onOk: async () => {
        setLoading(true);
        try {
          await new Promise(res => setTimeout(res, 600)); // mock
          message.success("Registered successfully!");
          setIsRegistered(true);
        } catch {
          message.error("Failed to register");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleCancelRegistration = () => {
    if (!event) return;

    Modal.confirm({
      title: "Cancel Registration",
      content: `Are you sure you want to cancel your registration for "${event.title}"?`,
      okText: "Yes, Cancel",
      okType: "danger",
      cancelText: "Keep Registration",
      onOk: async () => {
        setLoading(true);
        try {
          await new Promise(res => setTimeout(res, 600));
          message.success("Registration canceled!");
          setIsRegistered(false);
        } catch {
          message.error("Failed to cancel");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  useEffect(() => {
    fetchEvent();
  }, [params.id]);

  if (!event) return <p>Loading...</p>;

  const availableSpots = event.capacity - event.registrations;
  const isFull = availableSpots <= 0;

  return (
    <div style={{ padding: 30, display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 650,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
        }}
        cover={
          <img
            src={event.poster || "/placeholder-event.jpg"}
            alt={event.title}
            style={{
              width: "100%",
              height: 260,
              objectFit: "cover",
            }}
          />
        }
      >
        <h1 style={{ fontSize: 26, marginBottom: 10 }}>{event.title}</h1>

        <div style={{ marginBottom: 15, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag color="blue">{event.category}</Tag>
          <Tag color="green">{event.city}</Tag>
          <Tag color="orange">{event.isFree ? "Free Event" : "Paid Event"}</Tag>
        </div>

        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <p><strong>📍 Venue:</strong> {event.venue}</p>
          <p><strong>📅 Date:</strong> {event.startDate} → {event.endDate}</p>
          <p><strong>🏛 Status:</strong> {event.status}</p>
          <p>
            <strong>👥 Capacity:</strong> {event.registrations}/{event.capacity}
            {isFull && <span style={{ color: "red" }}> (Full)</span>}
          </p>
        </div>

        <div style={{ marginTop: 25 }}>
          {isRegistered ? (
            <Button
              danger
              block
              loading={loading}
              onClick={handleCancelRegistration}
              style={{ height: 45, fontSize: 16 }}
            >
              Cancel Registration
            </Button>
          ) : (
            <Button
              type="primary"
              block
              loading={loading}
              onClick={handleRegister}
              disabled={isFull || event.status !== "PUBLISHED"}
              style={{ height: 45, fontSize: 16 }}
            >
              {isFull ? "Event Full" : "Register Now"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
