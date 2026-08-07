// ══════════════════════════════════════════════
//  GAME CONSTANTS
// ══════════════════════════════════════════════
const TOTAL_ROUNDS = 5;
const WIN_THRESHOLD = 3;
const BASE_PRICE = 248.5;
const VOLATILITY = 7.5;
const BZ_HEIGHT = 13;
const MAX_HISTORY = 80;
const TICK_MS = 100;

export type TickSnapshot = {
  price: number;
  isUp: boolean;
  changePct: string;
  tickCount: number;
  sysLatencyMs: number;
  volatilityLabel: "LOW" | "MED" | "HIGH" | "EXTREME";
  inZone: boolean;
  buyZoneLow: number;
  buyZoneHigh: number;
  round: number;
  pnl: number;
  wins: number;
  bestLatencyMs: number | null;
  orderBook: {
    asks: { price: string; vol: number }[];
    bids: { price: string; vol: number }[];
    spread: string;
  };
};

export type RoundResult = {
  result: "win" | "loss";
  amount: number;
  latencyMs: number;
  roundIndex: number;
};

export type GameSummary = {
  wins: number;
  pnl: number;
  bestLatencyMs: number | null;
  isElite: boolean;
};

export type HftEngineCallbacks = {
  onTick: (snapshot: TickSnapshot) => void;
  onRoundResult: (result: RoundResult) => void;
  onCountdown: (secondsLeft: number) => void;
  onRoundReady: () => void;
  onGameEnd: (summary: GameSummary) => void;
};

export class HftEngine {
  private ctx: CanvasRenderingContext2D;
  private callbacks: HftEngineCallbacks;

  private price = BASE_PRICE;
  private prevPrice = BASE_PRICE;
  private drift = 0;
  private priceHistory: number[] = [];
  private tickCount = 0;
  private buyZoneLow = 0;
  private buyZoneHigh = 0;
  private round = 0;
  private wins = 0;
  private pnl = 0;
  private bestLatencyMs: number | null = null;
  private lastTickTime = Date.now();
  private roundActive = false;
  private gameActive = false;
  private canvasW = 0;
  private canvasH = 0;

  private tickInterval: ReturnType<typeof setInterval> | null = null;
  private countdownInterval: ReturnType<typeof setInterval> | null = null;
  private audioCtx: AudioContext | null = null;

  constructor(private canvas: HTMLCanvasElement, callbacks: HftEngineCallbacks) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");
    this.ctx = ctx;
    this.callbacks = callbacks;
  }

  // ── PUBLIC API ──────────────────────────────

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.canvasW = rect.width;
    this.canvasH = rect.height;
    this.drawChart();
  }

  start() {
    this.price = BASE_PRICE;
    this.prevPrice = BASE_PRICE;
    this.priceHistory = [];
    this.tickCount = 0;
    this.round = 0;
    this.wins = 0;
    this.pnl = 0;
    this.bestLatencyMs = null;
    this.drift = 0;
    this.lastTickTime = Date.now();
    this.gameActive = true;
    this.roundActive = true;

    this.ensureAudio();
    this.randomBuyZone();
    this.resize();

    if (this.tickInterval) clearInterval(this.tickInterval);
    this.tickInterval = setInterval(() => this.tick(), TICK_MS);
  }

  buy() {
    if (!this.roundActive || !this.gameActive) return;

    const latencyMs = Date.now() - this.lastTickTime;
    const inZone = this.inBuyZone(this.price);
    this.roundActive = false;

    let result: RoundResult;
    if (inZone) {
      const profit = Math.floor(75 + Math.random() * 130);
      this.pnl += profit;
      this.wins++;
      if (this.bestLatencyMs === null || latencyMs < this.bestLatencyMs) {
        this.bestLatencyMs = latencyMs;
      }
      this.sfxWin();
      result = { result: "win", amount: profit, latencyMs, roundIndex: this.round };
    } else {
      const loss = Math.floor(25 + Math.random() * 75);
      this.pnl -= loss;
      this.sfxLoss();
      result = { result: "loss", amount: loss, latencyMs, roundIndex: this.round };
    }

    this.callbacks.onRoundResult(result);
    this.round++;

    setTimeout(() => {
      if (this.round >= TOTAL_ROUNDS) this.endSession();
      else this.nextRound();
    }, 1100);
  }

  destroy() {
    if (this.tickInterval) clearInterval(this.tickInterval);
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.tickInterval = null;
    this.countdownInterval = null;
    this.gameActive = false;
  }

  // ── INTERNAL: GAME LOOP ─────────────────────

  private randomBuyZone() {
    const spread = VOLATILITY * 1.2;
    const center = BASE_PRICE + (Math.random() * 2 - 1) * spread;
    this.buyZoneLow = center - BZ_HEIGHT / 2;
    this.buyZoneHigh = center + BZ_HEIGHT / 2;
  }

  private inBuyZone(p: number) {
    return p >= this.buyZoneLow && p <= this.buyZoneHigh;
  }

  private tick() {
    this.prevPrice = this.price;
    this.drift += (Math.random() - 0.51) * 0.85;
    this.drift *= 0.91;
    this.price += this.drift + (Math.random() - 0.5) * (VOLATILITY * 0.42);
    this.price = Math.max(
      BASE_PRICE - VOLATILITY * 2.6,
      Math.min(BASE_PRICE + VOLATILITY * 2.1, this.price)
    );
    this.price = Math.round(this.price * 100) / 100;

    this.priceHistory.push(this.price);
    if (this.priceHistory.length > MAX_HISTORY) this.priceHistory.shift();
    this.tickCount++;
    this.lastTickTime = Date.now();

    this.drawChart();
    if (this.tickCount % 5 === 0) this.sfxTick();

    const isUp = this.price >= this.prevPrice;
    const pctNum = ((this.price - BASE_PRICE) / BASE_PRICE) * 100;
    const vols: TickSnapshot["volatilityLabel"][] = ["LOW", "MED", "HIGH", "EXTREME"];

    this.callbacks.onTick({
      price: this.price,
      isUp,
      changePct: (pctNum >= 0 ? "+" : "") + pctNum.toFixed(2) + "%",
      tickCount: this.tickCount,
      sysLatencyMs: Math.floor(Math.random() * 55) + 8,
      volatilityLabel: vols[Math.min(Math.floor(Math.abs(this.drift) / 1.5), 3)],
      inZone: this.inBuyZone(this.price),
      buyZoneLow: this.buyZoneLow,
      buyZoneHigh: this.buyZoneHigh,
      round: this.round,
      pnl: this.pnl,
      wins: this.wins,
      bestLatencyMs: this.bestLatencyMs,
      orderBook: this.buildOrderBook(),
    });
  }

  private buildOrderBook() {
    const asks = [];
    for (let i = 4; i >= 1; i--) {
      asks.push({
        price: (this.price + i * (0.25 + Math.random() * 0.65)).toFixed(2),
        vol: Math.floor(80 + Math.random() * 920),
      });
    }
    const bids = [];
    for (let i = 1; i <= 4; i++) {
      bids.push({
        price: (this.price - i * (0.25 + Math.random() * 0.65)).toFixed(2),
        vol: Math.floor(80 + Math.random() * 920),
      });
    }
    return { asks, bids, spread: (Math.random() * 0.35 + 0.08).toFixed(2) };
  }

  private nextRound() {
    this.randomBuyZone();
    let secondsLeft = 3;
    this.callbacks.onCountdown(secondsLeft);

    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(this.countdownInterval!);
        this.countdownInterval = null;
        if (!this.gameActive) return;
        this.roundActive = true;
        this.callbacks.onRoundReady();
      } else {
        this.callbacks.onCountdown(secondsLeft);
      }
    }, 1000);
  }

  private endSession() {
    if (this.tickInterval) clearInterval(this.tickInterval);
    this.tickInterval = null;
    this.gameActive = false;

    const isElite =
      this.wins === 5 || (this.wins === 4 && this.bestLatencyMs !== null && this.bestLatencyMs < 60);

    this.callbacks.onGameEnd({
      wins: this.wins,
      pnl: this.pnl,
      bestLatencyMs: this.bestLatencyMs,
      isElite,
    });
  }

  // ── INTERNAL: CHART ─────────────────────────

  private drawChart() {
    const W = this.canvasW, H = this.canvasH;
    if (!W || !H) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);

    const hist = this.priceHistory.length > 0 ? this.priceHistory : [this.price];
    const minP = Math.min(...hist, this.buyZoneLow - 4) - 1;
    const maxP = Math.max(...hist, this.buyZoneHigh + 4) + 1;
    const range = maxP - minP || 1;
    const toY = (p: number) => H - ((p - minP) / range) * (H - 18) - 9;

    ctx.strokeStyle = "rgba(28,34,48,0.9)";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([]);
    for (let i = 1; i < 4; i++) {
      const y = (H * i) / 4;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    const bzTop = toY(this.buyZoneHigh), bzBot = toY(this.buyZoneLow);
    ctx.fillStyle = "rgba(0,255,136,0.09)";
    ctx.fillRect(0, bzTop, W, bzBot - bzTop);
    ctx.strokeStyle = "rgba(0,255,136,0.35)";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(0, bzBot); ctx.lineTo(W, bzBot); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, bzTop); ctx.lineTo(W, bzTop); ctx.stroke();
    ctx.setLineDash([]);

    if (hist.length < 2) return;

    const isUp = this.price >= this.prevPrice;
    const step = W / (MAX_HISTORY - 1);
    const mainColor = isUp ? "#00ff88" : "#ff3355";

    ctx.beginPath();
    ctx.moveTo(0, H);
    hist.forEach((p, i) => ctx.lineTo(i * step, toY(p)));
    ctx.lineTo((hist.length - 1) * step, H);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, isUp ? "rgba(0,255,136,0.14)" : "rgba(255,51,85,0.1)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    hist.forEach((p, i) => {
      if (i === 0) ctx.moveTo(0, toY(p));
      else ctx.lineTo(i * step, toY(p));
    });
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([]);
    ctx.stroke();

    const cx = (hist.length - 1) * step, cy = toY(this.price);
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = mainColor;
    ctx.fill();

    ctx.strokeStyle = isUp ? "rgba(0,255,136,0.25)" : "rgba(255,51,85,0.25)";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W - 38, cy); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "rgba(88,96,105,0.7)";
    ctx.font = "9px Share Tech Mono, monospace";
    ctx.textAlign = "right";
    for (let i = 0; i <= 3; i++) {
      const frac = i / 3;
      const pVal = minP + frac * range;
      const yVal = toY(pVal);
      if (yVal > 8 && yVal < H - 4) {
        ctx.fillText("₹" + pVal.toFixed(1), W - 3, yVal - 2);
      }
    }
    ctx.textAlign = "left";
  }

  // ── INTERNAL: AUDIO ──────────────────────────

  private ensureAudio() {
    if (!this.audioCtx) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioCtx();
      } catch {
        // audio unsupported — game continues silently
      }
    }
  }

  private playTone(freq: number, type: OscillatorType, dur: number, vol: number, start = 0) {
    if (!this.audioCtx) return;
    const o = this.audioCtx.createOscillator();
    const g = this.audioCtx.createGain();
    o.connect(g);
    g.connect(this.audioCtx.destination);
    o.type = type;
    o.frequency.value = freq;
    const t = this.audioCtx.currentTime + start;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t);
    o.stop(t + dur);
  }

  private sfxWin() {
    this.playTone(440, "square", 0.1, 0.18, 0);
    this.playTone(554, "square", 0.15, 0.18, 0.08);
    this.playTone(659, "square", 0.2, 0.16, 0.18);
    this.playTone(880, "triangle", 0.3, 0.12, 0.28);
  }

  private sfxLoss() {
    this.playTone(200, "sawtooth", 0.08, 0.22, 0);
    this.playTone(160, "sawtooth", 0.15, 0.2, 0.07);
    this.playTone(100, "square", 0.25, 0.15, 0.15);
  }

  private sfxTick() {
    this.playTone(1400, "square", 0.015, 0.025);
  }
}