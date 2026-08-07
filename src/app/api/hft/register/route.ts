import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { containsProfanity } from "@/lib/profanityFilter";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sessionId = (body.sessionId || "").trim();
  const rawName = (body.username || "").trim();

  if (!sessionId || rawName.length < 2 || rawName.length > 18) {
    return NextResponse.json({ status: "error", message: "Invalid name or session." }, { status: 400 });
  }

  const username = rawName.toUpperCase();

  if (containsProfanity(username)) {
    return NextResponse.json({ status: "error", message: "That name isn't allowed. Pick another." }, { status: 400 });
  }

  const { data: existing, error: lookupError } = await supabaseAdmin
    .from("hft_traders")
    .select("session_id")
    .eq("username", username)
    .maybeSingle();

  if (lookupError) {
    return NextResponse.json({ status: "error", message: "Server error, try again." }, { status: 500 });
  }
  if (existing && existing.session_id !== sessionId) {
    return NextResponse.json({ status: "error", message: "Username already taken." }, { status: 409 });
  }

  const { error: upsertError } = await supabaseAdmin
    .from("hft_traders")
    .upsert(
      { session_id: sessionId, username, updated_at: new Date().toISOString() },
      { onConflict: "session_id" }
    );

  if (upsertError) {
    return NextResponse.json({ status: "error", message: "Could not register." }, { status: 500 });
  }

  return NextResponse.json({ status: "ok", username });
}