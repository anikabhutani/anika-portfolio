"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#about", label: "About", n: "01" },
  { href: "#experience", label: "Experience", n: "02" },
  { href: "#projects", label: "Projects", n: "03" },
  { href: "#skills", label: "Skills", n: "04" },
  { href: "#contact", label: "Contact", n: "05" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("#about");

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => !!el
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/92 backdrop-blur-md border-b border-border px-8">
      <div className="max-w-[1000px] mx-auto flex items-center justify-between h-14">
        <a href="#hero" className="font-serif text-[1.1rem] text-navy no-underline tracking-tight">
          Anika Bhutani
        </a>
        <ul className="flex gap-6 list-none">
          {LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className="flex items-center gap-1.5 text-[0.85rem] no-underline tracking-wide font-normal transition-colors py-2"
                  style={{ color: isActive ? "#2563a8" : "#4a5568" }}
                >
                  <span className="font-mono text-[0.68rem] text-light">{l.n}</span>
                  {l.label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-mid"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
