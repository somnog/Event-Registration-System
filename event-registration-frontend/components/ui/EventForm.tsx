"use client";

import { Form, Input, InputNumber, Select, DatePicker, Checkbox, Button, message, Upload } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export interface EventFormValues {
  title: string;
  description: string;
  category: string;
  venue: string;
  address?: string;
  city: string;
  startDate: string;
  endDate: string;
  capacity: number;
  registrationDeadline: string;
  isFree: boolean;
  price?: number;
  poster?: File; // new poster field
}

interface EventFormProps {
  initialValues?: EventFormValues;
  onSubmit: (values: EventFormValues) => void;
}

export default function EventForm({ initialValues, onSubmit }: EventFormProps) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        dates: [dayjs(initialValues.startDate), dayjs(initialValues.endDate)],
        registrationDeadline: dayjs(initialValues.registrationDeadline),
      });
    }
  }, [initialValues]);

  const handleFinish = (values: any) => {
    const [startDate, endDate] = values.dates;
    onSubmit({
      ...values,
      startDate: startDate.format("YYYY-MM-DD HH:mm"),
      endDate: endDate.format("YYYY-MM-DD HH:mm"),
      registrationDeadline: values.registrationDeadline.format("YYYY-MM-DD HH:mm"),
      poster: fileList[0]?.originFileObj, // pass selected file
    });
    message.success("Event submitted successfully!");
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
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

      {/* Poster upload */}
      <Form.Item label="Event Poster">
        <Upload
          beforeUpload={() => false} // prevent auto-upload
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Select Poster</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
