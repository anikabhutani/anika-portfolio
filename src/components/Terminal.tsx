"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS, EXPERIENCE, SKILL_GROUPS } from "@/lib/data";
import { useTerminal } from "./TerminalContext";

type Line = { type: "input" | "output" | "agent"; text: string; prompt?: string };
type HistoryTurn = { role: "user" | "assistant"; text: string };

const DIRS = ["about", "experience", "projects", "skills", "education", "contact"];

const HELP_TEXT = [
  "Available commands:",
  "  help              — list available commands",
  "  cat resume.md     — print a plain-text CV summary",
  "  resume            — download the actual resume PDF",
  "  projects          — list featured projects",
  "  cd <section>      — navigate into about / experience / projects / skills / education / contact",
  "  cd ~ (or cd home) — return to the root directory",
  "  ls                — list contents of the current directory",
  "  pwd               — print the current directory",
  "  anika             — bring Anika's AI agent into the terminal (type 'exit' to leave)",
  "  clear             — clear the terminal",
  "  sudo hack         — ...try it",
].join("\n");

const RESUME_TEXT = [
  "ANIKA BHUTANI",
  "UC Berkeley — B.S. Electrical Engineering & Computer Sciences, Expected 2028",
  "",
  "EXPERIENCE",
  "  Software Engineer — Luel AI (Feb 2026–Present)",
  "  AI/ML Engineer Intern — Outsampler (Jan 2026–Present)",
  "  Data Science Intern — PharmaACE (Jun–Aug 2025)",
  "  Data Science Research Intern — Stanford University (May–Oct 2024)",
  "",
  "FOCUS AREAS",
  "  Machine Learning · Full-Stack Development · Data Science",
  "  Reinforcement Learning · Spatial Transcriptomics",
  "",
  "CONTACT",
  "  abhutani@berkeley.edu · linkedin.com/in/anika-bhutani · github.com/anikabhutani",
  "",
  "(Type 'resume' to download the full PDF.)",
].join("\n");

function promptFor(dir: string | null, agentMode: boolean) {
  const path = dir ? `~/${dir}` : "~";
  return agentMode ? `anika@portfolio:${path}$` : `guest@portfolio:${path}$`;
}

function lsOutput(dir: string | null): string {
  switch (dir) {
    case "projects":
      return PROJECTS.map((p) => `${p.key}.md`).join("  ");
    case "experience":
      return EXPERIENCE.map((e) => `${e.company.split(" ")[0].toLowerCase()}.md`).join("  ");
    case "education":
      return "uc-berkeley.md  coursework.md";
    case "skills":
      return SKILL_GROUPS.map((g) => g.title.toLowerCase().replace(/[^a-z]+/g, "-") + ".md").join("  ");
    case "about":
      return "bio.md  interests.md";
    case "contact":
      return "email.md  linkedin.md  github.md";
    default:
      return DIRS.join("  ");
  }
}

function projectsOutput() {
  return PROJECTS.map((p, i) => `${i + 1}. ${p.title}${p.award ? ` — ${p.award}` : ""}`).join("\n");
}

export default function Terminal() {
  const { open, setOpen } = useTerminal();
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome. Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [hacking, setHacking] = useState(false);
  const [dir, setDir] = useState<string | null>(null);
  const [agentMode, setAgentMode] = useState(false);
  const [agentLoading, setAgentLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const agentHistoryRef = useRef<HistoryTurn[]>([]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, agentLoading]);

  async function runCommand(raw: string) {
    const cmd = raw.trim();
    const promptStr = promptFor(dir, agentMode);
    const withInput = (extra: Line[] = []): Line[] => [
      ...lines,
      { type: "input", text: cmd, prompt: promptStr },
      ...extra,
    ];

    if (cmd === "") {
      setLines(withInput());
      return;
    }

    // ── Agent mode: everything but 'exit'/'quit'/'bye' goes to the AI agent ──
    if (agentMode) {
      const lower = cmd.toLowerCase();
      if (lower === "exit" || lower === "quit" || lower === "bye") {
        setLines(
          withInput([{ type: "output", text: "Anika has left the terminal. Type 'anika' to bring her back." }])
        );
        setAgentMode(false);
        return;
      }

      setLines(withInput());
      setAgentLoading(true);
      try {
        const res = await fetch("/api/terminal-agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: cmd,
            directory: dir || "home",
            history: agentHistoryRef.current,
          }),
        });
        const data = await res.json();
        const replyText: string = data.reply || data.error || "...";
        setLines((prev) => [...prev, { type: "agent", text: replyText }]);
        agentHistoryRef.current = [
          ...agentHistoryRef.current,
          { role: "user" as const, text: cmd },
          { role: "assistant" as const, text: replyText },
        ].slice(-12);
      } catch {
        setLines((prev) => [...prev, { type: "output", text: "Network error reaching the agent." }]);
      } finally {
        setAgentLoading(false);
      }
      return;
    }

    // ── Normal shell commands ──
    if (cmd === "help") {
      setLines(withInput([{ type: "output", text: HELP_TEXT }]));
    } else if (cmd === "cat resume.md") {
      setLines(withInput([{ type: "output", text: RESUME_TEXT }]));
    } else if (cmd === "projects") {
      setLines(withInput([{ type: "output", text: projectsOutput() }]));
    } else if (cmd === "pwd") {
      setLines(withInput([{ type: "output", text: dir ? `~/${dir}` : "~" }]));
    } else if (cmd === "ls") {
      setLines(withInput([{ type: "output", text: lsOutput(dir) }]));
    } else if (cmd === "clear") {
      setLines([]);
    } else if (cmd.startsWith("cd")) {
      const arg = cmd.slice(2).trim();
      if (!arg || arg === "~" || arg === "home") {
        setDir(null);
        setLines(withInput());
      } else if (DIRS.includes(arg)) {
        setDir(arg);
        setLines(withInput());
      } else {
        setLines(withInput([{ type: "output", text: `cd: no such directory: ${arg}` }]));
      }
    } else if (cmd === "resume" || cmd === "download resume" || cmd === "cat resume.pdf") {
      setLines(withInput([{ type: "output", text: "Looking for resume.pdf..." }]));
      try {
        const check = await fetch("/assets/resume.pdf", { method: "HEAD" });
        if (check.ok) {
          const a = document.createElement("a");
          a.href = "/assets/resume.pdf";
          a.download = "Anika_Bhutani_Resume.pdf";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setLines((prev) => [...prev, { type: "output", text: "Download started: Anika_Bhutani_Resume.pdf" }]);
        } else {
          setLines((prev) => [
            ...prev,
            { type: "output", text: "resume.pdf isn't uploaded yet — add it to public/assets/resume.pdf." },
          ]);
        }
      } catch {
        setLines((prev) => [...prev, { type: "output", text: "Couldn't check for resume.pdf." }]);
      }
    } else if (cmd === "sudo hack") {
      setLines(withInput([{ type: "output", text: "Access granted. Initiating mainframe breach..." }]));
      setHacking(true);
      setTimeout(() => setHacking(false), 2600);
    } else if (cmd === "anika") {
      agentHistoryRef.current = [];
      setAgentMode(true);
      setLines(
        withInput([
          {
            type: "agent",
            text: "hey, it's anika 👋 ask me anything — projects, coursework, internships, whatever. type 'exit' to leave.",
          },
        ])
      );
    } else {
      setLines(withInput([{ type: "output", text: `command not found: ${cmd}` }]));
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-6"
          style={{ background: "rgba(10,22,40,0.7)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            className="relative w-full max-w-[640px] h-[440px] bg-[#0a1628] rounded-sm overflow-hidden border border-[#2563a8]/40 shadow-modal font-mono text-[0.85rem] flex flex-col"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f1f38] border-b border-[#2563a8]/30 flex-shrink-0">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
              </div>
              <span className="text-[#94a3b8] text-[0.75rem]">{promptFor(dir, agentMode).replace("$", "")}</span>
              <button onClick={() => setOpen(false)} className="text-[#94a3b8] hover:text-white text-xs">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 text-[#e2e8f0]">
              {lines.map((l, i) => (
                <div key={i} className="whitespace-pre-wrap leading-relaxed mb-1">
                  {l.type === "input" ? (
                    <span>
                      <span className="text-[#4b8fd4]">{l.prompt} </span>
                      {l.text}
                    </span>
                  ) : l.type === "agent" ? (
                    <span className="text-[#bbf7d0]">
                      <span className="text-[#4ade80] font-semibold">anika ▸ </span>
                      {l.text}
                    </span>
                  ) : (
                    <span className="text-[#94a3b8]">{l.text}</span>
                  )}
                </div>
              ))}
              {agentLoading && <div className="text-[#4ade80]/60 italic">anika is typing...</div>}
              <div ref={bottomRef} />
            </div>

            <form
              className="flex items-center gap-2 px-4 py-3 border-t border-[#2563a8]/30 flex-shrink-0"
              onSubmit={(e) => {
                e.preventDefault();
                runCommand(input);
                setInput("");
              }}
            >
              <span className={agentMode ? "text-[#4ade80]" : "text-[#4b8fd4]"}>
                {promptFor(dir, agentMode)}
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={agentLoading}
                className="flex-1 bg-transparent outline-none text-[#e2e8f0] caret-[#60a5fa] disabled:opacity-50"
                spellCheck={false}
                autoComplete="off"
              />
            </form>

            {hacking && <MatrixRain />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MatrixRain() {
  const columns = 24;
  const chars = "01アニカβγδθλπ";
  return (
    <div className="absolute inset-0 bg-black/90 overflow-hidden pointer-events-none">
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 text-[#22c55e] text-xs font-mono animate-matrixFall"
          style={{
            left: `${(i / columns) * 100}%`,
            animationDelay: `${Math.random() * 1.5}s`,
            animationDuration: `${1.5 + Math.random() * 1.5}s`,
          }}
        >
          {Array.from({ length: 16 })
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("\n")}
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-[#22c55e] font-mono text-lg tracking-widest">
        ACCESS GRANTED
      </div>
    </div>
  );
}
