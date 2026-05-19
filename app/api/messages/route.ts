// GET /api/messages - Get visible messages
// POST /api/messages - Submit a new message

import {
  getVisibleMessages,
  addMessage,
  getMessages,
} from "@/app/lib/store";
import { NextRequest } from "next/server";

import { revalidatePath } from "next/cache";

export const revalidate = 10; // Cache for 10 seconds to save Firebase reads

export async function GET(request: NextRequest) {
  const showAll = request.nextUrl.searchParams.get("all") === "true";
  const messages = showAll ? await getMessages() : await getVisibleMessages();
  return Response.json({ messages });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderName, recipient, message } = body;

    if (!senderName || !recipient || !message) {
      return Response.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    if (senderName.length > 50) {
      return Response.json(
        { error: "ชื่อผู้ส่งยาวเกินไป (ไม่เกิน 50 ตัวอักษร)" },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return Response.json(
        { error: "ข้อความยาวเกินไป (ไม่เกิน 500 ตัวอักษร)" },
        { status: 400 }
      );
    }

    const newMessage = await addMessage(senderName.trim(), recipient.trim(), message.trim());
    revalidatePath("/api/messages");
    revalidatePath("/api/stats"); // Update stats cache too
    return Response.json({ message: newMessage }, { status: 201 });
  } catch {
    return Response.json(
      { error: "เกิดข้อผิดพลาดในการส่งข้อความ" },
      { status: 500 }
    );
  }
}
