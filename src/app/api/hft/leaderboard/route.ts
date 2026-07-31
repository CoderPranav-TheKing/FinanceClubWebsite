import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId") || "";

  const { data: top, error } = await supabaseAdmin
    .from("hft_traders")
    .select("username, high_score, total_wins, best_latency, session_id")
    .order("high_score", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ status: "error", message: "Could not load leaderboard." }, { status: 500 });
  }

  const { count: totalTraders } = await supabaseAdmin
    .from("hft_traders")
    .select("*", { count: "exact", head: true });

  let user = null;
  if (sessionId) {
    const { data: allRanks } = await supabaseAdmin
      .from("hft_traders")
      .select("session_id, high_score, total_wins")
      .order("high_score", { ascending: false });

    if (allRanks) {
      const idx = allRanks.findIndex((r) => r.session_id === sessionId);
      if (idx !== -1) {
        const rank = idx + 1;
        const pct = Math.max(1, Math.round((rank / (totalTraders || allRanks.length)) * 100));
        user = { rank, percentile: pct, total_wins: allRanks[idx].total_wins, high_score: allRanks[idx].high_score };
      }
    }
  }

  return NextResponse.json({ top, totalTraders: totalTraders ?? top.length, user });
}