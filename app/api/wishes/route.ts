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
import { revalidatePath } from "next/cache";

export const revalidate = 10; // Cache for 10 seconds

export async function GET() {
  const counter = await getWishCounter();
  return Response.json(counter);
}

export async function POST(request: NextRequest) {
  const action = request.nextUrl.searchParams.get("action");

  if (action === "reset") {
    const counter = await resetWishCounter();
    await addActivityLog("Good Journey", "รีเซ็ตตัวนับยอดอวยพร", "สำเร็จ");
    revalidatePath("/api/wishes");
    revalidatePath("/api/stats");
    return Response.json(counter);
  }

  const counter = await incrementWishCounter();
  const randomWish =
    WISH_MESSAGES[Math.floor(Math.random() * WISH_MESSAGES.length)];

  await addActivityLog("Good Journey", "ส่งคำอวยพรให้รุ่นพี่", "สำเร็จ");
  revalidatePath("/api/wishes");
  revalidatePath("/api/stats");

  return Response.json({
    ...counter,
    wishMessage: randomWish,
  });
}
