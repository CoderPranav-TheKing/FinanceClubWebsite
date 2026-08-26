"use client";

import { useEffect, useRef, useState } from "react";
import { useNavbarHeight } from "@/hooks/useNavbarHeight";
import { HftEngine } from "./hftEngine";
import type { TickSnapshot, RoundResult, GameSummary } from "./hftEngine";

type Screen = "intro" | "game" | "recap" | "leaderboard";
type Phase = "ready" | "result" | "countdown";

const WIN_THRESHOLD = 3;

type LbEntry = {
  username: string;
  high_score: number;
  total_wins: number;
  best_latency: number;
  session_id: string;
};
type LbResponse = {
  top: LbEntry[];
  totalTraders: number;
  user: { rank: number; percentile: number; total_wins: number; high_score: number } | null;
};

export default function TickerGame() {
  useNavbarHeight();

  const [screen, setScreen] = useState<Screen>("intro");
  const [traderName, setTraderName] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [nameLocked, setNameLocked] = useState(false);

  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartWrapRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HftEngine | null>(null);

  const [snapshot, setSnapshot] = useState<TickSnapshot | null>(null);
  const [results, setResults] = useState<(RoundResult | null)[]>([null, null, null, null, null]);
  const [phase, setPhase] = useState<Phase>("ready");
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);
  const [rankInfo, setRankInfo] = useState<LbResponse["user"]>(null);

  const [leaderboard, setLeaderboard] = useState<LbResponse | null>(null);
  const [lbLoading, setLbLoading] = useState(false);
  const [lbError, setLbError] = useState(false);
  const [lbReturnScreen, setLbReturnScreen] = useState<"intro" | "recap">("intro");

  const canStart = traderName.trim().length >= 2 && !registering;

  // ── Persistent anonymous identity, generated once on first load ──
  useEffect(() => {
  let id = localStorage.getItem("hft_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("hft_session_id", id);
  }
  setSessionId(id);

  const savedName = localStorage.getItem("hft_trader_name");
  if (savedName) {
    setTraderName(savedName);
    setNameLocked(true);
  }
}, []);

  // ── Game engine lifecycle ──
  useEffect(() => {
    if (screen !== "game" || !canvasRef.current) return;

    const engine = new HftEngine(canvasRef.current, {
      onTick: (s) => setSnapshot(s),
      onRoundResult: (r) => {
        setResults((prev) => {
          const next = [...prev];
          next[r.roundIndex] = r;
          return next;
        });
        setLastResult(r);
        setPhase("result");
      },
      onCountdown: (secondsLeft) => {
        setPhase("countdown");
        setCountdown(secondsLeft);
      },
      onRoundReady: () => {
        setPhase("ready");
        setCountdown(null);
      },
      onGameEnd: async (summary) => {
        setGameSummary(summary);
        setScreen("recap");

        if (!sessionId) return;

        try {
          await fetch("/api/hft/submit-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              score: summary.pnl,
              wins: summary.wins,
              latency: summary.bestLatencyMs ?? 9999,
            }),
          });

          const res = await fetch(`/api/hft/leaderboard?sessionId=${sessionId}`);
          const data: LbResponse = await res.json();
          setRankInfo(data.user);
        } catch {
          // Non-fatal: recap still shows local results even if the network call fails
        }
      },
    });

    engineRef.current = engine;
    setResults([null, null, null, null, null]);
    setPhase("ready");
    setLastResult(null);
    setCountdown(null);
    setRankInfo(null);
    engine.start();

    function handleResize() {
      engine.resize();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      engine.destroy();
      engineRef.current = null;
    };
  }, [screen, sessionId]);

  // ── Keep the canvas in sync with its container's actual box, not just
  //    the window — the flex layout can change the chart's size without
  //    the window itself resizing (e.g. the HUD growing by a line). ──
  useEffect(() => {
    if (screen !== "game" || !chartWrapRef.current) return;
    const ro = new ResizeObserver(() => engineRef.current?.resize());
    ro.observe(chartWrapRef.current);
    return () => ro.disconnect();
  }, [screen]);

  // ── Leaderboard fetch, whenever that screen opens ──
  useEffect(() => {
    if (screen !== "leaderboard" || !sessionId) return;

    setLbLoading(true);
    setLbError(false);

    fetch(`/api/hft/leaderboard?sessionId=${sessionId}`)
      .then((r) => r.json())
      .then((data: LbResponse) => setLeaderboard(data))
      .catch(() => setLbError(true))
      .finally(() => setLbLoading(false));
  }, [screen, sessionId]);

  async function handleEnterMarket() {
    if (!canStart || !sessionId) return;

    setRegistering(true);
    setRegisterError(null);

    try {
      const res = await fetch("/api/hft/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, username: traderName.trim() }),
      });
      const data = await res.json();

      if (data.status !== "ok") {
        setRegisterError(data.message || "Could not register that name.");
        setRegistering(false);
        return;
      }

      setRegistering(false);
      localStorage.setItem("hft_trader_name", traderName.trim());
setScreen("game");
      
    } catch {
      setRegisterError("Network error — check your connection and try again.");
      setRegistering(false);
    }
  }

  function handleBuy() {
    engineRef.current?.buy();
  }

  function openLeaderboard(from: "intro" | "recap") {
    setLbReturnScreen(from);
    setScreen("leaderboard");
  }
  function handleResetIdentity() {
  const newId = crypto.randomUUID();
  localStorage.setItem("hft_session_id", newId);
  localStorage.removeItem("hft_trader_name");
  setSessionId(newId);
  setTraderName("");
  setNameLocked(false);
  setRegisterError(null);
}

  const isWin = (gameSummary?.wins ?? 0) >= WIN_THRESHOLD;
  const recapTitle = !gameSummary
    ? ""
    : gameSummary.wins === 5
    ? "PERFECT\nEXECUTION"
    : isWin
    ? "MARKET-MAKING\nADVANTAGE UNLOCKED"
    : "HIGH SLIPPAGE\nDETECTED";

  const myNameUpper = traderName.trim().toUpperCase();

  // best-of-book: engine pushes asks farthest→nearest and bids nearest→farthest
  const bestAsk = snapshot?.orderBook.asks[snapshot.orderBook.asks.length - 1];
  const bestBid = snapshot?.orderBook.bids[0];

  return (
    <div id="app">
      {/* ══ SCREEN 1 — INTRO ══ */}
      {screen === "intro" && (
        <div className="screen active" id="s-intro">
          <div className="brand-cap">IITB Finance Club</div>
          <div className="ticker-badge">BOMBAY EXCHANGE</div>
          <div className="hero-title">
            THE TICKER
            <br />
            GAME
          </div>

          <div className="name-card">
            <span className="name-lbl">▸ TRADER IDENTIFICATION</span>
            <input
  className="name-inp"
  id="trader-name"
  type="text"
  maxLength={18}
  placeholder="e.g. ROHAN_K"
  autoComplete="off"
  spellCheck={false}
  disabled={nameLocked}
  value={traderName}
  onChange={(e) => {
    setTraderName(e.target.value);
    setRegisterError(null);
  }}
/>
{nameLocked && (
  <button
    onClick={handleResetIdentity}
    style={{ background: "none", border: "none", color: "var(--dim)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1, marginTop: 8, cursor: "pointer", textDecoration: "underline" }}
  >
    Not you? Reset identity
  </button>
)}
            {registerError && (
              <div style={{ color: "var(--red)", fontFamily: "var(--mono)", fontSize: 11, marginTop: 8 }}>
                {registerError}
              </div>
            )}
          </div>

          <div className="rules-card">
            <div className="rule-item">
              <span className="rule-icon">▸</span>
              <span>Price refreshes every <strong style={{ color: "var(--amber)" }}>100ms</strong> via random walk</span>
            </div>
            <div className="rule-item">
              <span className="rule-icon">▸</span>
              <span>Tap <strong style={{ color: "var(--green)" }}>BUY</strong> exactly when price enters the <strong style={{ color: "var(--green)" }}>green band</strong></span>
            </div>
          </div>

          <button className="btn-primary" onClick={handleEnterMarket} disabled={!canStart}>
            {registering ? "CONNECTING..." : "ENTER MARKET ▸"}
          </button>
          <button className="btn-ghost" onClick={() => openLeaderboard("intro")}>
            📊 VIEW LEADERBOARD
          </button>
        </div>
      )}

      {/* ══ SCREEN 2 — TRADING FLOOR (fits the viewport, no scroll) ══ */}
      {screen === "game" && (
        <div className="screen active" id="s-game">
          <div className="hud">
            <div className="hud-row hud-brand-row">
              <span className="hud-brand">TICKER <em>GAME</em></span>
              <span className="hud-live"><span className="live-dot" />LIVE · NSE EQUITY</span>
            </div>
            <div className="hud-row hud-price-row">
              <span className={"price-main " + (snapshot?.isUp ? "up" : "dn")}>
                ₹{snapshot ? snapshot.price.toFixed(2) : "0.00"}
              </span>
              <span className={"price-chg " + (snapshot?.isUp ? "up" : "dn")}>
                {snapshot?.changePct ?? "+0.00%"}
              </span>
              <div className="hud-mini-stats">
                <span className="hud-stat">RND <b className="a">{(snapshot?.round ?? 0) + 1}/5</b></span>
                <span className="hud-stat">P&amp;L <b className={(snapshot?.pnl ?? 0) >= 0 ? "g" : "r"}>{(snapshot?.pnl ?? 0) >= 0 ? "+" : "−"}₹{Math.abs(snapshot?.pnl ?? 0)}</b></span>
                <span className="hud-stat">WIN <b className="g">{snapshot?.wins ?? 0}</b></span>
                <span className="hud-stat">LAT <b className="a">{snapshot?.bestLatencyMs != null ? `${snapshot.bestLatencyMs}ms` : "--ms"}</b></span>
              </div>
            </div>
          </div>

          <div className="game-area">
            <div className="chart-col">
              <div className="chart-wrap" ref={chartWrapRef}>
                <canvas ref={canvasRef} id="chart" />
                <span className="bz-label">BUY ZONE</span>

                {bestBid && (
                  <div className="market-chip mc-bid">
                    <span className="mc-lbl">BID</span>
                    <span className="mc-val">{bestBid.price}</span>
                  </div>
                )}
                {bestAsk && (
                  <div className="market-chip mc-ask">
                    <span className="mc-lbl">ASK</span>
                    <span className="mc-val">{bestAsk.price}</span>
                  </div>
                )}

                <div
                  className={
                    "result-toast " +
                    (phase === "result" && lastResult ? (lastResult.result === "win" ? "w show" : "l show") : "")
                  }
                >
                  {lastResult &&
                    (lastResult.result === "win"
                      ? `⚡ HIT! +₹${lastResult.amount} · ${lastResult.latencyMs}ms`
                      : `✗ SLIPPAGE −₹${lastResult.amount}`)}
                </div>
              </div>

              <div className="market-info-row">
                <span>SYS <b className="a">{snapshot?.sysLatencyMs ?? "--"}ms</b></span>
                <span>TICK <b>#{snapshot?.tickCount ?? 0}</b></span>
                <span>VOL <b>{snapshot?.volatilityLabel ?? "LOW"}</b></span>
                <span>SPREAD <b className="a">₹{snapshot?.orderBook.spread ?? "—"}</b></span>
              </div>
            </div>

            <div className="action-col">
              <div className="pips-block">
                <span className="rnd-lbl">ATTEMPTS</span>
                <div className="pips">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      className={
                        "pip " +
                        (r?.result === "win" ? "w" : r?.result === "loss" ? "l" : i === (snapshot?.round ?? 0) ? "cur" : "")
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="buy-area">
                <div className="zone-row">
                  <div className={"zone-indicator" + (snapshot?.inZone ? " on" : "")} />
                  <span className="zone-txt" style={{ color: snapshot?.inZone ? "var(--green)" : "var(--dim)" }}>
                    {snapshot?.inZone ? "⚡ IN BUY ZONE" : "WAIT FOR BUY ZONE"}
                  </span>
                  <span className="zone-range">
                    ₹{snapshot?.buyZoneLow.toFixed(1) ?? "--"}–{snapshot?.buyZoneHigh.toFixed(1) ?? "--"}
                  </span>
                </div>
                <button id="buy-btn" className={snapshot?.inZone && phase === "ready" ? "in-zone" : ""} onClick={handleBuy} disabled={phase !== "ready"}>
                  {phase === "countdown" ? (
                    <>NEXT IN {countdown}s<span className="btn-sub">PREPARE YOUR POSITION</span></>
                  ) : (
                    <>⚡ BUY<span className="btn-sub">EXECUTE MARKET ORDER</span></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ SCREEN 3 — RECAP ══ */}
      {screen === "recap" && gameSummary && (
        <div className="screen active" id="s-recap">
          <div className="recap-hdr">SESSION COMPLETE</div>
          <div className={"recap-title " + (isWin ? "win" : "loss")} style={{ whiteSpace: "pre-line" }}>
            {recapTitle}
          </div>

          <div className="score-card">
            <div className="score-row"><span className="score-k">TRADER</span><span className="score-v a">{myNameUpper}</span></div>
            <div className="score-row"><span className="score-k">SUCCESSFUL BUYS</span><span className="score-v g">{gameSummary.wins} / 5</span></div>
            <div className="score-row"><span className="score-k">SLIPPAGE LOSSES</span><span className="score-v r">{5 - gameSummary.wins} / 5</span></div>
            <div className="score-row"><span className="score-k">BEST LATENCY</span><span className="score-v a">{gameSummary.bestLatencyMs != null ? `${gameSummary.bestLatencyMs}ms` : "N/A"}</span></div>
            <div className="score-row"><span className="score-k">PORTFOLIO P&amp;L</span><span className={"score-v " + (gameSummary.pnl >= 0 ? "g" : "r")}>{gameSummary.pnl >= 0 ? "+" : "−"}₹{Math.abs(gameSummary.pnl)}</span></div>
          </div>

          {rankInfo && (
            <div className="rank-box">
              <span className="rank-primary">RANK #{rankInfo.rank} OF {leaderboard?.totalTraders ?? "—"} TRADERS</span>
              <span>TOP {rankInfo.percentile}% · {100 - rankInfo.percentile}th percentile</span>
            </div>
          )}

          {gameSummary.isElite && (
            <div className="elite-box">
              <strong>⚡ ELITE TIER</strong>
              Your latency profile stands out. Come say hi at the registration desk.
            </div>
          )}

          {isWin ? (
            <div className="loss-note">
              Solid execution. You're trading with the instincts of a market maker.
            </div>
          ) : (
            <div className="loss-note">
              The market is unforgiving. Even the best quants iterate. Study the order book, sharpen your timing, and press on.
            </div>
          )}

          <button className="btn-primary" style={{ fontSize: 13, letterSpacing: 2, padding: 14 }} onClick={() => openLeaderboard("recap")}>
            📊 VIEW LEADERBOARD
          </button>
          <button className="btn-ghost" onClick={() => setScreen("game")}>↺ RETRADE THE SESSION</button>
        </div>
      )}

      {/* ══ SCREEN 4 — LEADERBOARD ══ */}
      {screen === "leaderboard" && (
        <div className="screen active" id="s-lb">
          <div className="lb-hdr">
            <div>
              <div className="lb-title">LEADERBOARD</div>
              <div className="lb-sub">THE TICKER GAME · ALL TRADERS</div>
            </div>
            <button className="lb-close-btn" onClick={() => setScreen(lbReturnScreen)}>
              ✕ CLOSE
            </button>
          </div>

          <div className="lb-scroll">
            {leaderboard?.user && (
              <div className="you-banner" style={{ display: "block" }}>
                ▸ YOUR POSITION: #{leaderboard.user.rank} OF {leaderboard.totalTraders} | TOP {leaderboard.user.percentile}% | {leaderboard.user.total_wins}/5 WINS
              </div>
            )}

            <div className="lb-table">
              <div className="lb-row th">
                <span>#</span>
                <span>TRADER</span>
                <span style={{ textAlign: "center" }}>WINS</span>
                <span style={{ textAlign: "right" }}>P&amp;L</span>
                <span style={{ textAlign: "right" }}>LAT</span>
              </div>

              {lbLoading && <div className="lb-loading">FETCHING MARKET DATA...</div>}
              {lbError && <div className="lb-loading" style={{ color: "var(--red)" }}>FAILED TO LOAD LEADERBOARD</div>}
              {!lbLoading && !lbError && leaderboard?.top.length === 0 && (
                <div className="lb-loading">NO TRADES RECORDED YET.<br />BE THE FIRST.</div>
              )}

              {!lbLoading && leaderboard?.top.map((entry, i) => {
                const rank = i + 1;
                const isMe = entry.username.toUpperCase() === myNameUpper && myNameUpper !== "";
                const eliteCut = Math.max(1, Math.ceil((leaderboard.totalTraders || leaderboard.top.length) * 0.15));
                const isElite = rank <= eliteCut;
                const rankIcon = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank;
                const rankCls = rank === 1 ? "r1" : rank === 2 ? "r2" : rank === 3 ? "r3" : "";

                return (
                  <div key={entry.session_id} className={"lb-row " + (isMe ? "you " : "") + (isElite && !isMe ? "elite-r " : "")}>
                    <span className={"lb-rank " + rankCls}>{rankIcon}</span>
                    <span className="lb-name">
                      {entry.username}
                      {isMe && <span style={{ color: "var(--dim)", fontSize: 9 }}> ◀</span>}
                      {isElite && <span className="lb-badge" title="Elite">⚡</span>}
                    </span>
                    <span className="lb-wins">{entry.total_wins}/5</span>
                    <span className={"lb-pnl " + (entry.high_score >= 0 ? "pos" : "neg")}>
                      {entry.high_score >= 0 ? "+" : "−"}₹{Math.abs(entry.high_score)}
                    </span>
                    <span className="lb-lat">{entry.best_latency && entry.best_latency !== 9999 ? `${entry.best_latency}ms` : "—"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}