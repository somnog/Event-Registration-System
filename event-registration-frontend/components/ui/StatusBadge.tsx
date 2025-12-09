"use client";

import { Badge } from "antd";

type Props = {
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
};

export default function StatusBadge({ status }: Props) {
  let color = "default";

  switch (status) {
    case "DRAFT":
      color = "gray";
      break;
    case "PUBLISHED":
      color = "green";
      break;
    case "CANCELLED":
      color = "red";
      break;
    case "COMPLETED":
      color = "blue";
      break;
  }

  return <Badge color={color} text={status} />;
}
