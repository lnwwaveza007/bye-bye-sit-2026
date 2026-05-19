// GET /api/stats - Get system stats

import { getStats } from "@/app/lib/store";

export const revalidate = 10; // Cache for 10 seconds

export async function GET() {
  const stats = await getStats();
  return Response.json(stats);
}
