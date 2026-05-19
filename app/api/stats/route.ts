// GET /api/stats - Get system stats

import { getStats } from "@/app/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = getStats();
  return Response.json(stats);
}
