"use client";

import { useTerminal } from "./TerminalContext";

export default function FloatingTerminalButton() {
  const { setOpen } = useTerminal();

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Open interactive terminal"
      title="Open terminal"
      className="fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-[14px] shadow-modal flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      style={{
        background: "linear-gradient(160deg, #1c1c1e, #0a0a0c)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* macOS-Terminal-style glyph: prompt chevron + cursor bar */}
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M5 8L11 13L5 18"
          stroke="#4ade80"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="13" y1="18" x2="21" y2="18" stroke="#e2e8f0" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}
