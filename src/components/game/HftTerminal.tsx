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

export default function HftTerminal() {
  useNavbarHeight();

  
  const [screen, setScreen] = useState<Screen>("intro");
  const [traderName, setTraderName] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  const isWin = (gameSummary?.wins ?? 0) >= WIN_THRESHOLD;
  const recapTitle = !gameSummary
    ? ""
    : gameSummary.wins === 5
    ? "PERFECT\nEXECUTION"
    : isWin
    ? "MARKET-MAKING\nADVANTAGE UNLOCKED"
    : "HIGH SLIPPAGE\nDETECTED";

  const myNameUpper = traderName.trim().toUpperCase();

  return (
    <div id="app">
     

      {/* ══ SCREEN 1 — INTRO ══ */}
      {screen === "intro" && (
        <div className="screen active" id="s-intro">
          <div className="brand-cap">PREMIER TRADING SOCIETY</div>
          <div className="ticker-badge">INDEX</div>
          <div className="hero-title">
            HIGH-FREQ
            <br />
            TRADING
            <br />
            CHALLENGE
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
              value={traderName}
              onChange={(e) => {
                setTraderName(e.target.value);
                setRegisterError(null);
              }}
            />
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

      {/* ══ SCREEN 2 — TRADING FLOOR ══ */}
      {screen === "game" && (
        <div className="screen active" id="s-game" style={{ justifyContent: "flex-start" }}>
          <div className="hdr">
            <div className="hdr-logo">INDEX <em>HFT</em></div>
            <div className="hdr-meta">
              <span className="live-dot" />LIVE MARKET
              <br />
              NSE · EQUITY
            </div>
          </div>

          <div className="price-strip">
            <span className={"price-main " + (snapshot?.isUp ? "up" : "dn")}>
              ₹{snapshot ? snapshot.price.toFixed(2) : "0.00"}
            </span>
            <span className={"price-chg " + (snapshot?.isUp ? "up" : "dn")}>
              {snapshot?.changePct ?? "+0.00%"}
            </span>
            <span className="price-sym">INDEX / INR</span>
          </div>

          <div className="chart-wrap">
            <canvas ref={canvasRef} id="chart" />
            <span className="bz-label" style={{ top: "50%" }}>BUY ZONE</span>
          </div>

          <div className="lat-strip">
            <span>SYS LAT: <span className="lat-val">{snapshot?.sysLatencyMs ?? "--"}ms</span></span>
            <span>TICK <span className="lat-tick">#{snapshot?.tickCount ?? 0}</span></span>
            <span>VOL: {snapshot?.volatilityLabel ?? "LOW"}</span>
          </div>

          <div className="ob-wrap">
            <div>
              <div className="ob-col-hdr">ASKS (SELL)</div>
              {snapshot?.orderBook.asks.map((a, i) => (
                <div key={i} className="ob-row ob-ask">
                  <span className="ob-price">{a.price}</span>
                  <span className="ob-vol">{a.vol}</span>
                </div>
              ))}
            </div>
            <div className="ob-mid">
              <div className="ob-spread-lbl">SPREAD</div>
              <div className="ob-spread-val">₹{snapshot?.orderBook.spread ?? "—"}</div>
            </div>
            <div>
              <div className="ob-col-hdr" style={{ textAlign: "right" }}>BIDS (BUY)</div>
              {snapshot?.orderBook.bids.map((b, i) => (
                <div key={i} className="ob-row ob-bid">
                  <span className="ob-price">{b.price}</span>
                  <span className="ob-vol">{b.vol}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-cell"><span className="stat-lbl">ROUND</span><span className="stat-val a">{(snapshot?.round ?? 0) + 1}/5</span></div>
            <div className="stat-cell"><span className="stat-lbl">P&amp;L</span><span className={"stat-val " + ((snapshot?.pnl ?? 0) >= 0 ? "g" : "r")}>{(snapshot?.pnl ?? 0) >= 0 ? "+" : "−"}₹{Math.abs(snapshot?.pnl ?? 0)}</span></div>
            <div className="stat-cell"><span className="stat-lbl">WINS</span><span className="stat-val g">{snapshot?.wins ?? 0}</span></div>
            <div className="stat-cell"><span className="stat-lbl">BEST LAT</span><span className="stat-val a">{snapshot?.bestLatencyMs != null ? `${snapshot.bestLatencyMs}ms` : "--ms"}</span></div>
          </div>

          <div className="rnd-bar">
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

          <div className={"flash-box " + (phase === "result" && lastResult ? (lastResult.result === "win" ? "w" : "l") : "")} style={{ display: phase === "result" && lastResult ? "block" : "none" }}>
            {lastResult && (lastResult.result === "win"
              ? `⚡ HIT! +₹${lastResult.amount} ARB PROFIT · ${lastResult.latencyMs}ms`
              : `✗ SLIPPAGE! −₹${lastResult.amount}`)}
          </div>

          <div className="buy-area">
            <div className="zone-row">
              <div className={"zone-indicator" + (snapshot?.inZone ? " on" : "")} />
              <span className="zone-txt" style={{ color: snapshot?.inZone ? "var(--green)" : "var(--dim)" }}>
                {snapshot?.inZone ? "⚡ IN BUY ZONE — EXECUTE NOW!" : "WAIT FOR BUY ZONE"}
              </span>
              <span className="zone-range">
                ₹{snapshot?.buyZoneLow.toFixed(1) ?? "--"}–{snapshot?.buyZoneHigh.toFixed(1) ?? "--"}
              </span>
            </div>
            <button id="buy-btn" className={snapshot?.inZone && phase === "ready" ? "in-zone" : ""} onClick={handleBuy} disabled={phase !== "ready"}>
              {phase === "countdown" ? (
                <>NEXT IN {countdown}s...<span className="btn-sub">PREPARE YOUR POSITION</span></>
              ) : (
                <>⚡ BUY<span className="btn-sub">EXECUTE MARKET ORDER</span></>
              )}
            </button>
            <div className="hint">TAP WHEN PRICE ENTERS GREEN ZONE ↑</div>
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
          <button className="btn-ghost" onClick={() => setScreen("intro")}>↺ RETRADE THE SESSION</button>
        </div>
      )}

      {/* ══ SCREEN 4 — LEADERBOARD ══ */}
      {screen === "leaderboard" && (
        <div className="screen active" id="s-lb">
          <div className="lb-hdr">
            <div>
              <div className="lb-title">LEADERBOARD</div>
              <div className="lb-sub">INDEX HFT · ALL TRADERS</div>
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