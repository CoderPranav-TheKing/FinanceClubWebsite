import type { Metadata } from "next";
import HftTerminal from "@/components/game/HftTerminal";
import "@/components/game/hftTerminal.css";

export const metadata: Metadata = {
  title: "$CHAI HFT Terminal",
  description: "Trade the tape while you wait for the next session.",
};

export default function GamePage() {
  return <HftTerminal />;
}