"use client";

import { useEffect, useState } from "react";
import { Card, Button, message, Select, DatePicker, Checkbox, Row, Col, Tag } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { eventsService, Event } from "../../../services/events.service";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [isFree, setIsFree] = useState<boolean | null>(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsService.getEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch {
        message.error("Failed to load events");
      }
    };
    fetchEvents();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...events];

    if (category) {
      filtered = filtered.filter((e) => e.category === category);
    }

    if (city) {
      filtered = filtered.filter((e) => e.city.toLowerCase().includes(city.toLowerCase()));
    }

    if (dateRange) {
      const [start, end] = dateRange;
      filtered = filtered.filter(
        (e) =>
          dayjs(e.startDate).isBetween(start, end, null, "[]") ||
          dayjs(e.endDate).isBetween(start, end, null, "[]")
      );
    }

    if (isFree !== null) {
      filtered = filtered.filter((e) => e.isFree === isFree);
    }

    setFilteredEvents(filtered);
  }, [category, city, dateRange, isFree, events]);

  //// Handle category select default: show all events of that category
  const handleCategoryChange = (value: string | null) => {
    setCategory(value);
    if (value) {
      const defaultFiltered = events.filter((e) => e.category === value);
      setFilteredEvents(defaultFiltered);
    } else {
      setFilteredEvents(events);
    }
  };

  const handleRegister = async (eventId: string) => {
    try {
      message.success("Registered successfully!");
    } catch {
      message.error("Failed to register for this event");
    }
  };

  // Dynamic city options
  const cities = Array.from(new Set(events.map((e) => e.city)));

  return (
    <div style={{ padding: 24, maxWidth: 1300, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>All Events</h1>

      {/* Filters */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Select Category"
              style={{ width: "100%" }}
              allowClear
              value={category}
              onChange={handleCategoryChange}
            >
              <Select.Option value="Conference">Conference</Select.Option>
              <Select.Option value="Workshop">Workshop</Select.Option>
              <Select.Option value="Seminar">Seminar</Select.Option>
              <Select.Option value="Social">Social</Select.Option>
              <Select.Option value="Sports">Sports</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Select
              showSearch
              placeholder="Filter by City"
              style={{ width: "100%" }}
              allowClear
              value={city || undefined}
              onChange={(value) => setCity(value)}
            >
              {cities.map((c) => (
                <Select.Option key={c} value={c}>
                  {c}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <RangePicker
              style={{ width: "100%" }}
              onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)}
            />
          </Col>

          <Col xs={12} sm={12} md={2}>
            <Checkbox
              checked={isFree === true}
              onChange={(e) => setIsFree(e.target.checked ? true : null)}
            >
              Free
            </Checkbox>
          </Col>

          <Col xs={12} sm={12} md={2}>
            <Checkbox
              checked={isFree === false}
              onChange={(e) => setIsFree(e.target.checked ? false : null)}
            >
              Paid
            </Checkbox>
          </Col>
        </Row>
      </Card>

      {/* Event Cards */}
      <Row gutter={[20, 20]}>
        {filteredEvents.map((event) => (
          <Col xs={24} sm={12} lg={8} key={event.id}>
            <Card
              hoverable
              style={{
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 4px 18px rgba(0,0,0,0.10)",
              }}
              cover={
                <div style={{ height: 180, overflow: "hidden" }}>
                  <img
                    src={event.poster || "/placeholder-event.jpg"}
                    alt={event.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              }
            >
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{event.title}</h3>

              {/* Tags */}
              <div style={{ marginBottom: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Tag color="blue">{event.category}</Tag>
                <Tag color="green">{event.city}</Tag>
                <Tag color="orange">{event.isFree ? "Free Event" : "Paid Event"}</Tag>
              </div>

              <p>
                <strong>📍 Venue:</strong> {event.venue}
              </p>
              <p>
                <strong>📅 Date:</strong> {event.startDate} → {event.endDate}
              </p>
              <p>
                <strong>👥 Capacity:</strong> {event.registrations} / {event.capacity}
              </p>

              <Button
                type="primary"
                block
                style={{ marginTop: 12, height: 40, fontSize: 15, borderRadius: 8 }}
                onClick={() => handleRegister(event.id)}
              >
                Register
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
