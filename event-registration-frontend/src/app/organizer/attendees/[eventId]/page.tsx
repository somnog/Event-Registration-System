// "use client";

// import { useEffect, useState } from "react";
// import { Table, Button } from "antd";
// import { useParams } from "next/navigation";
// import { registrationsService, Attendee } from "../../../../../services/registrations.service";

// export default function AttendeesPage() {
//   const params = useParams();
//   const [attendees, setAttendees] = useState<Attendee[]>([]);

//   const fetchAttendees = async () => {
//     const eventId = Array.isArray(params.eventId) ? params.eventId[0] : params.eventId;
//     if (!eventId) return; // if no eventId, exit early
//     const data = await registrationsService.getAttendees(eventId);
//     setAttendees(data);
//   };

//   const markAttendance = async (attendeeId: string) => {
//     const eventId = Array.isArray(params.eventId) ? params.eventId[0] : params.eventId;
//     if (!eventId) return;
//     await registrationsService.markAttendance(eventId, attendeeId);
//     fetchAttendees(); // refresh table
//   };

//   useEffect(() => {
//     fetchAttendees();
//   }, [params.eventId]);

//   const columns = [
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Status", dataIndex: "status", key: "status" },
//     {
//       title: "Attendance",
//       key: "attendance",
//       render: (record: Attendee) => (
//         <Button
//           type="primary"
//           disabled={record.attendanceConfirmed}
//           onClick={() => markAttendance(record.id)}
//         >
//           {record.attendanceConfirmed ? "Confirmed" : "Mark Attendance"}
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <h1>Event Attendees</h1>
//       <Table rowKey="id" dataSource={attendees} columns={columns} />
//     </div>
//   );
// }
"use client";

import { Table, Button, Tag, Input } from "antd";
import { useState, useMemo } from "react";

interface Attendee {
  id: string;
  fullName: string;
  email: string;
  status: "CONFIRMED" | "CANCELLED" | "WAITLISTED";
  attendanceConfirmed: boolean;
}

interface AttendeesProps {
  params: { eventId: string };
}

export default function Attendees({ params }: AttendeesProps) {
  const dummyAttendees: Attendee[] = [
    { id: "1", fullName: "Hamdi Nur", email: "hamdi@example.com", status: "CONFIRMED", attendanceConfirmed: false },
    { id: "2", fullName: "Najma Mohamed", email: "najma@example.com", status: "WAITLISTED", attendanceConfirmed: false },
    { id: "3", fullName: "Abdimalik Abdirahman", email: "abdimalik@example.com", status: "CONFIRMED", attendanceConfirmed: true },
    { id: "4", fullName: "Ali Hassan", email: "ali@example.com", status: "CANCELLED", attendanceConfirmed: false },
  ];

  const [attendees, setAttendees] = useState(dummyAttendees);
  const [search, setSearch] = useState("");

  const markAttendance = (id: string) => {
    setAttendees(prev =>
      prev.map(att => (att.id === id ? { ...att, attendanceConfirmed: true } : att))
    );
  };

  const filteredAttendees = useMemo(() => 
    attendees.filter(att => att.fullName.toLowerCase().includes(search.toLowerCase()))
  , [attendees, search]);

  const columns = [
    { title: "Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "CONFIRMED" ? "green" : status === "CANCELLED" ? "red" : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Attendance",
      key: "attendanceConfirmed",
      render: (_: any, record: Attendee) =>
        record.attendanceConfirmed ? (
          <Tag color="green">Confirmed</Tag>
        ) : (
          <Button type="primary" onClick={() => markAttendance(record.id)}>
            Mark Attendance
          </Button>
        ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Attendees for Event {params.eventId}</h1>

      <Input
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />

      <Table
        dataSource={filteredAttendees}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 2 }}
      />
    </div>
  );
}
