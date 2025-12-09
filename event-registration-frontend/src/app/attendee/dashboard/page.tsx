"use client";

import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Tag, message } from "antd";
import { registrationsService, Registration } from "../../../../services/registrations.service";
import { useRouter } from "next/navigation";

export default function AttendeeDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchMyEvents = async () => {
    try {
      const res = await registrationsService.getMyRegistrations();
      setRegistrations(res);
    } catch {
      message.error("Failed to load your registered events");
    }
  };

  const handleCancel = async (regId: string) => {
    try {
      setLoading(true);
      await registrationsService.cancelRegistration(regId);
      message.success("Registration cancelled");
      fetchMyEvents();
    } catch {
      message.error("Failed to cancel registration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ marginBottom: 20, fontSize: 28 }}>My Registered Events</h1>

      {registrations.length === 0 && (
        <p style={{ fontSize: 16, opacity: 0.7 }}>You have not registered for any events yet.</p>
      )}

      <Row gutter={[20, 20]}>
        {registrations.map((reg) => {
          const e = reg.event;

          return (
            <Col xs={24} sm={12} md={8} lg={8} xl={8} key={reg.id}>
              <Card
                hoverable
                cover={
                  <img
                    src={e.poster || "/placeholder-event.jpg"}
                    alt={e.title}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                }
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <h3 style={{ marginBottom: 6 }}>{e.title}</h3>

                <Tag color="green" style={{ marginBottom: 10 }}>
                  {reg.status}
                </Tag>

                <p><strong>📍 Venue:</strong> {e.venue}</p>
                <p><strong>📅 Date:</strong> {e.startDate} → {e.endDate}</p>
                <p><strong>🏷 Category:</strong> {e.category}</p>
                <p><strong>🌍 City:</strong> {e.city}</p>

                <div style={{ marginTop: 12 }}>
                  <Button
                    type="primary"
                    onClick={() => router.push(`/events/${e.id}`)}
                    style={{ marginRight: 8 }}
                  >
                    View
                  </Button>

                  <Button danger loading={loading} onClick={() => handleCancel(reg.id)}>
                    Cancel
                  </Button>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
