// GET /api/export - Export messages as CSV

import { exportMessagesCSV } from "@/app/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const csv = exportMessagesCSV();
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="messages-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
