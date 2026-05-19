// ========================================
// KMUTT IT Bye Bye Party 2024
// Data Types
// ========================================

export interface Message {
  id: string;
  senderName: string;
  recipient: string;
  message: string;
  createdAt: string;
  status: "approved" | "visible" | "hidden" | "pending";
}

export interface WishCounter {
  totalWishes: number;
  lastUpdated: string;
}

export interface ActivityLog {
  id: string;
  time: string;
  type: "Message Board" | "IG Add Yours" | "Good Journey";
  detail: string;
  status: "สำเร็จ" | "พร้อมใช้งาน" | "รอดำเนินการ";
}

export const RECIPIENT_OPTIONS = [
  "รุ่นพี่ทั้งหมด",
  "เพื่อน",
  "พี่รหัส / น้องรหัส",
  "อาจารย์",
  "ภาควิชา IT",
] as const;

export const WISH_MESSAGES = [
  "Good journey, seniors!",
  "ขอให้เส้นทางใหม่สดใสเสมอ",
  "ขอให้ทุกก้าวหลังจากนี้มีแต่เรื่องดี ๆ",
  "May your next chapter be wonderful",
  "เดินทางปลอดภัยในโลกหลังเรียนจบ",
  "ขอให้ชีวิตหลังเรียนจบ compile ผ่านทุกครั้ง",
  "ขอให้ debug ชีวิตได้ง่าย ๆ เหมือน print Hello World",
  "เส้นทางข้างหน้ารอพี่ ๆ อยู่ ขอให้สนุกกับมัน!",
  "ขอให้ทุกวันเป็นวันดี ๆ ยิ่งกว่าวันส่ง Final Project",
  "ชีวิตหลังมหาลัยจะง่ายกว่า Midterm แน่นอน!",
] as const;

export const PARTICLE_EMOJIS = ["🎓", "✈️", "⭐", "💛", "🌟", "🎉", "💫", "📜"];
