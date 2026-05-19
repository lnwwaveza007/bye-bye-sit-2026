// GET /api/logs - Get activity logs

import { getActivityLogs } from "@/app/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const logs = getActivityLogs();
  return Response.json({ logs });
}
