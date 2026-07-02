"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCE } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Timeline({ activeFilter }: { activeFilter: string | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 px-8 bg-off">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading index="02" label="Work" title="Journey timeline" />

        <div className="flex flex-col">
          {EXPERIENCE.map((item, i) => {
            const matches = activeFilter ? item.tech.includes(activeFilter) : true;
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.role + item.date} delay={i * 0.06}>
              <div
                className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 py-8 border-b border-border last:border-b-0 transition-opacity duration-300"
                style={{ opacity: matches ? 1 : 0.3 }}
              >
                <div className="text-[0.78rem] text-light tracking-wide pt-1 leading-relaxed">
                  {item.date}
                </div>
                <div>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left group"
                  >
                    <span className="inline-block bg-mid/10 text-mid border border-mid/20 text-[0.7rem] px-2 py-0.5 rounded font-medium tracking-wide mb-2">
                      {item.badge}
                    </span>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-[1rem] text-navy mb-0.5">{item.role}</div>
                        <div className="text-[0.9rem] text-mid mb-2 font-normal">{item.company}</div>
                      </div>
                      <span
                        className="text-light text-sm mt-1 transition-transform"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        ▾
                      </span>
                    </div>
                  </button>
                  <p className="text-[0.88rem] text-muted leading-relaxed font-light">
                    {item.description}
                  </p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-3 flex flex-col gap-1.5 pl-4 border-l-2 border-pale"
                      >
                        {item.achievements.map((a) => (
                          <li key={a} className="text-[0.85rem] text-muted font-light">
                            {a}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-white border border-border text-blue text-[0.72rem] px-2 py-0.5 rounded font-mono"
                        style={{
                          borderColor: activeFilter === t ? "#4b8fd4" : undefined,
                          background: activeFilter === t ? "#dbeafe" : undefined,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
