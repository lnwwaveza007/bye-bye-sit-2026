// PATCH /api/messages/[id] - Update message status
// DELETE /api/messages/[id] - Delete a message

import { updateMessageStatus, deleteMessage } from "@/app/lib/store";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { status } = body;

    if (!["approved", "visible", "hidden", "pending"].includes(status)) {
      return Response.json({ error: "สถานะไม่ถูกต้อง" }, { status: 400 });
    }

    const updated = await updateMessageStatus(id, status);
    if (!updated) {
      return Response.json({ error: "ไม่พบข้อความ" }, { status: 404 });
    }

    return Response.json({ message: updated });
  } catch {
    return Response.json(
      { error: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteMessage(id);
  if (!deleted) {
    return Response.json({ error: "ไม่พบข้อความ" }, { status: 404 });
  }
  return Response.json({ success: true });
}
