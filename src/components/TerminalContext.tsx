"use client";

import { createContext, useContext, useState } from "react";

type TerminalCtx = { open: boolean; setOpen: (v: boolean) => void };

const Ctx = createContext<TerminalCtx | null>(null);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}

export function useTerminal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTerminal must be used inside <TerminalProvider>");
  return ctx;
}
