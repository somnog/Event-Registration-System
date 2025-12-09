import type { Metadata } from "next";
import "./globals.css";
import "antd/dist/reset.css"; // Ant Design modern reset

export const metadata: Metadata = {
  title: "Event Registration System",
  description: "Frontend powered by Next.js, App Router & Ant Design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
