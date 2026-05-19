// ========================================
// In-Memory Data Store (Server-Side)
// For production, replace with Firebase/Supabase
// ========================================

import { Message, ActivityLog, WishCounter } from "./types";

// Pre-loaded sample messages so the screen doesn't look empty
const sampleMessages: Message[] = [
  {
    id: "sample-1",
    senderName: "น้องมิ้นท์",
    recipient: "รุ่นพี่ทั้งหมด",
    message: "ขอบคุณพี่ ๆ ที่คอยช่วยเหลือมาตลอด ขอให้เส้นทางต่อไปสดใสมาก ๆ",
    createdAt: new Date(Date.now() - 300000).toISOString(),
    status: "visible",
  },
  {
    id: "sample-2",
    senderName: "โอ๊ต IT63",
    recipient: "รุ่นพี่ทั้งหมด",
    message: "จะไม่ลืมโมเมนต์ทำโปรเจกต์ดึก ๆ ด้วยกันครับ",
    createdAt: new Date(Date.now() - 240000).toISOString(),
    status: "visible",
  },
  {
    id: "sample-3",
    senderName: "แพรว",
    recipient: "พี่รหัส / น้องรหัส",
    message:
      "ขอให้พี่ ๆ เดินทางในเส้นทางใหม่อย่างมั่นใจ และไม่เจอบั๊กเยอะเกินไป",
    createdAt: new Date(Date.now() - 180000).toISOString(),
    status: "visible",
  },
  {
    id: "sample-4",
    senderName: "เบนซ์ CS",
    recipient: "รุ่นพี่ทั้งหมด",
    message:
      "Good luck seniors! ขอให้ชีวิตหลังเรียนจบ compile ผ่านทุกครั้ง",
    createdAt: new Date(Date.now() - 120000).toISOString(),
    status: "visible",
  },
  {
    id: "sample-5",
    senderName: "น้องเฟิร์น",
    recipient: "อาจารย์",
    message: "ขอบคุณสำหรับทุกคำแนะนำ ทุกเสียงหัวเราะ และทุกความทรงจำ",
    createdAt: new Date(Date.now() - 60000).toISOString(),
    status: "visible",
  },
];

// In-memory storage
let messages: Message[] = [...sampleMessages];
let wishCounter: WishCounter = {
  totalWishes: 108,
  lastUpdated: new Date().toISOString(),
};
let activityLogs: ActivityLog[] = [
  {
    id: "log-init-1",
    time: new Date(Date.now() - 300000).toISOString(),
    type: "Message Board",
    detail: "เพิ่มข้อความใหม่ถึงรุ่นพี่",
    status: "สำเร็จ",
  },
  {
    id: "log-init-2",
    time: new Date(Date.now() - 240000).toISOString(),
    type: "IG Add Yours",
    detail: "แสดง QR Code สำหรับ Story",
    status: "พร้อมใช้งาน",
  },
  {
    id: "log-init-3",
    time: new Date(Date.now() - 180000).toISOString(),
    type: "Good Journey",
    detail: "ส่งคำอวยพรแล้ว",
    status: "สำเร็จ",
  },
];

// Helper to generate IDs
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Messages CRUD
export function getMessages(): Message[] {
  return [...messages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getVisibleMessages(): Message[] {
  return getMessages().filter((m) => m.status === "visible" || m.status === "approved");
}

export function addMessage(
  senderName: string,
  recipient: string,
  message: string
): Message {
  const newMessage: Message = {
    id: generateId(),
    senderName,
    recipient,
    message,
    createdAt: new Date().toISOString(),
    status: "visible", // Fast Mode: messages appear instantly
  };
  messages.unshift(newMessage);
  addActivityLog("Message Board", `ข้อความใหม่จาก ${senderName} ถึง ${recipient}`, "สำเร็จ");
  return newMessage;
}

export function updateMessageStatus(
  id: string,
  status: Message["status"]
): Message | null {
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.status = status;
    return msg;
  }
  return null;
}

export function deleteMessage(id: string): boolean {
  const idx = messages.findIndex((m) => m.id === id);
  if (idx !== -1) {
    messages.splice(idx, 1);
    return true;
  }
  return false;
}

// Wish Counter
export function getWishCounter(): WishCounter {
  return { ...wishCounter };
}

export function incrementWishCounter(): WishCounter {
  wishCounter.totalWishes += 1;
  wishCounter.lastUpdated = new Date().toISOString();
  return { ...wishCounter };
}

export function resetWishCounter(): WishCounter {
  wishCounter.totalWishes = 0;
  wishCounter.lastUpdated = new Date().toISOString();
  return { ...wishCounter };
}

// Activity Logs
export function getActivityLogs(): ActivityLog[] {
  return [...activityLogs].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
}

export function addActivityLog(
  type: ActivityLog["type"],
  detail: string,
  status: ActivityLog["status"]
): ActivityLog {
  const log: ActivityLog = {
    id: generateId(),
    time: new Date().toISOString(),
    type,
    detail,
    status,
  };
  activityLogs.unshift(log);
  // Keep only last 50 logs
  if (activityLogs.length > 50) {
    activityLogs = activityLogs.slice(0, 50);
  }
  return log;
}

// Stats
export function getStats() {
  return {
    totalMessages: messages.filter((m) => m.status !== "hidden").length,
    totalWishes: wishCounter.totalWishes,
  };
}

// CSV Export
export function exportMessagesCSV(): string {
  const header = "ID,Sender,Recipient,Message,CreatedAt,Status";
  const rows = messages.map(
    (m) =>
      `"${m.id}","${m.senderName}","${m.recipient}","${m.message.replace(
        /"/g,
        '""'
      )}","${m.createdAt}","${m.status}"`
  );
  return [header, ...rows].join("\n");
}
