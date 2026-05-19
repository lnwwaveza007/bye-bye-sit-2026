// GET /api/wishes - Get wish counter
// POST /api/wishes - Increment wish counter

import {
  getWishCounter,
  incrementWishCounter,
  resetWishCounter,
  addActivityLog,
} from "@/app/lib/store";
import { WISH_MESSAGES } from "@/app/lib/types";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const counter = getWishCounter();
  return Response.json(counter);
}

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action");

  if (action === "reset") {
    const counter = resetWishCounter();
    addActivityLog("Good Journey", "รีเซ็ตตัวนับคำอวยพร", "สำเร็จ");
    return Response.json(counter);
  }

  const counter = incrementWishCounter();
  const randomWish =
    WISH_MESSAGES[Math.floor(Math.random() * WISH_MESSAGES.length)];

  addActivityLog("Good Journey", "ส่งคำอวยพรแล้ว", "สำเร็จ");

  return Response.json({
    ...counter,
    wishMessage: randomWish,
  });
}
