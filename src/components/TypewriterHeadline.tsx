"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["Anika Bhutani.", "a builder.", "an ideator.", "a systems thinker."];
const TYPE_MS = 62;
const DELETE_MS = 32;
const HOLD_MS = 1500;
const GAP_MS = 350;

export default function TypewriterHeadline() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "gap">("typing");
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) setText(WORDS[0]);
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;
    const current = WORDS[wordIndex];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_MS);
      } else {
        t = setTimeout(() => setPhase("holding"), HOLD_MS);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_MS);
      } else {
        t = setTimeout(() => setPhase("gap"), GAP_MS);
      }
    } else if (phase === "gap") {
      setWordIndex((i) => (i + 1) % WORDS.length);
      setPhase("typing");
    }
    return () => clearTimeout(t);
  }, [text, phase, wordIndex]);

  return (
    <span className="relative inline-block">
      {text}
      <span
        aria-hidden="true"
        className="inline-block w-[3px] md:w-[4px] h-[0.85em] ml-1 align-middle bg-mid animate-pulse2"
      />
    </span>
  );
}
