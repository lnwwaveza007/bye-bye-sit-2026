import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ระบบสารสนเทศงานเลี้ยงอำลารุ่นพี่ | KMUTT IT Bye Bye Party 2024",
  description:
    "ระบบกระดานข้อความและกิจกรรมสำหรับงาน KMUTT IT Bye Bye Party 2024 — ส่งข้อความอำลา ร่วมเล่น IG Story และส่งคำอวยพร Good Journey ให้รุ่นพี่",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
