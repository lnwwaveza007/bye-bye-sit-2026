// POST /api/auth - Login with password
// GET /api/auth - Verify session
// DELETE /api/auth - Logout

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Simple token generation using timestamp + random bytes
function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

// In-memory session store (valid tokens)
const validTokens = new Set<string>();

export const dynamic = "force-dynamic";

// POST - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return Response.json(
        { error: "ระบบยังไม่ได้ตั้งค่ารหัสผ่าน" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return Response.json(
        { error: "รหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    const token = generateToken();
    validTokens.add(token);

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}

// GET - Verify session
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token || !validTokens.has(token)) {
      return Response.json({ authenticated: false }, { status: 401 });
    }

    return Response.json({ authenticated: true });
  } catch {
    return Response.json({ authenticated: false }, { status: 401 });
  }
}

// DELETE - Logout
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (token) {
      validTokens.delete(token);
    }

    cookieStore.delete("admin_token");
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
