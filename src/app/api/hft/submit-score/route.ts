import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MAX_PLAUSIBLE_SCORE = 5 * 205; // 5 rounds × the engine's max possible per-round profit
const MAX_WINS = 5;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sessionId = (body.sessionId || "").trim();
  const score = Number(body.score);
  const wins = Number(body.wins);
  const latency = Number(body.latency);

  if (!sessionId || !Number.isFinite(score) || !Number.isFinite(wins) || !Number.isFinite(latency)) {
    return NextResponse.json({ status: "error", message: "Invalid submission." }, { status: 400 });
  }

  // Basic anti-cheat: rejects anything outside what the real engine could ever produce.
  if (wins < 0 || wins > MAX_WINS || Math.abs(score) > MAX_PLAUSIBLE_SCORE || latency < 0) {
    return NextResponse.json({ status: "error", message: "Score rejected." }, { status: 400 });
  }

  const { data: current } = await supabaseAdmin
    .from("hft_traders")
    .select("high_score, total_wins, best_latency")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (!current) {
    return NextResponse.json({ status: "error", message: "Trader not registered." }, { status: 404 });
  }

  const newHighScore = Math.max(current.high_score ?? -999999, score);
  const newTotalWins = Math.max(current.total_wins ?? 0, wins);
  const newBestLatency = Math.min(current.best_latency ?? 9999, latency);

  const { error } = await supabaseAdmin
    .from("hft_traders")
    .update({
      high_score: newHighScore,
      total_wins: newTotalWins,
      best_latency: newBestLatency,
      updated_at: new Date().toISOString(),
    })
    .eq("session_id", sessionId);

  if (error) {
    return NextResponse.json({ status: "error", message: "Could not save score." }, { status: 500 });
  }

  return NextResponse.json({ status: "ok" });
}