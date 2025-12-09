"use client";

import { Form, Input, InputNumber, Select, DatePicker, Checkbox, Button } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

// Dummy events for testing
const dummyEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Annual tech conference in Mogadishu",
    category: "Conference",
    venue: "Mogadishu Convention Center",
    address: "123 Main St",
    city: "Mogadishu",
    startDate: "2025-12-15T09:00",
    endDate: "2025-12-16T17:00",
    capacity: 100,
    registrationDeadline: "2025-12-10T23:59",
    isFree: true,
    price: undefined,
  },
  {
    id: "2",
    title: "Workshop on AI",
    description: "AI workshop for developers",
    category: "Workshop",
    venue: "Tech Hub",
    address: "456 AI St",
    city: "Mogadishu",
    startDate: "2025-12-20T10:00",
    endDate: "2025-12-20T16:00",
    capacity: 50,
    registrationDeadline: "2025-12-18T23:59",
    isFree: false,
    price: 50,
  },
];

interface EditEventProps {
  params: { id: string };
}

export default function EditEvent({ params }: EditEventProps) {
  const [form] = Form.useForm();
  const [eventData, setEventData] = useState<any>({
    title: "",
    description: "",
    category: "",
    venue: "",
    address: "",
    city: "",
    startDate: null,
    endDate: null,
    capacity: 0,
    registrationDeadline: null,
    isFree: true,
    price: undefined,
  });

  // Load dummy data based on URL param
  useEffect(() => {
    const event = dummyEvents.find((e) => e.id === params.id);
    if (event) {
      setEventData(event);
      form.setFieldsValue({
        ...event,
        dates: [dayjs(event.startDate), dayjs(event.endDate)],
        registrationDeadline: dayjs(event.registrationDeadline),
      });
    }
  }, [params.id, form]);

  const onFinish = (values: any) => {
    console.log("Updated Event:", values);
    alert("Event updated (dummy)");
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1>Edit Event {params.id}</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...eventData,
          dates: eventData.startDate ? [dayjs(eventData.startDate), dayjs(eventData.endDate)] : [],
          registrationDeadline: eventData.registrationDeadline ? dayjs(eventData.registrationDeadline) : null,
        }}
      >
        <Form.Item name="title" label="Event Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Conference">Conference</Select.Option>
            <Select.Option value="Workshop">Workshop</Select.Option>
            <Select.Option value="Seminar">Seminar</Select.Option>
            <Select.Option value="Social">Social</Select.Option>
            <Select.Option value="Sports">Sports</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="venue" label="Venue" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>

        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="dates" label="Event Dates" rules={[{ required: true }]}>
          <RangePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="capacity" label="Capacity" rules={[{ required: true, type: "number", min: 1 }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="registrationDeadline" label="Registration Deadline" rules={[{ required: true }]}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="isFree" valuePropName="checked">
          <Checkbox>Free Event</Checkbox>
        </Form.Item>

        <Form.Item shouldUpdate={(prev, curr) => prev.isFree !== curr.isFree}>
          {({ getFieldValue }) =>
            !getFieldValue("isFree") && (
              <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
