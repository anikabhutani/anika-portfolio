"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import type { Project } from "@/types/project";
import ProjectModal from "./ProjectModal";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0 text-light group-hover:text-mid transition-colors">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export default function Projects({ activeFilter }: { activeFilter: string | null }) {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-8 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading index="03" label="Work" title="Projects" />
        <p className="text-[0.82rem] text-light italic mb-7 -mt-6">
          {activeFilter ? `Showing projects using ${activeFilter}. ` : ""}Click any card for a deeper look.
        </p>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}>
          {PROJECTS.map((p, i) => {
            const matches = activeFilter ? p.stack.includes(activeFilter) : true;
            return (
              <Reveal key={p.key} delay={(i % 3) * 0.08}>
              <motion.div
                onClick={() => setOpenProject(p)}
                animate={{ opacity: matches ? 1 : 0.25, scale: matches ? 1 : 0.98 }}
                transition={{ duration: 0.25 }}
                whileHover={matches ? { y: -2 } : undefined}
                className="group relative flex flex-col bg-white border border-border rounded-sm p-6 cursor-pointer overflow-hidden hover:shadow-cardHover"
              >
                <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-mid to-sky opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between gap-2 mb-2">
                  {p.award ? (
                    <span className="inline-flex items-center gap-1 bg-[#fef9c3] border border-[#fde68a] text-[#92400e] text-[0.7rem] px-2 py-0.5 rounded font-medium">
                      {p.award}
                    </span>
                  ) : (
                    <span />
                  )}
                  <GithubIcon />
                </div>
                <div className="font-medium text-[1rem] text-navy mb-2 leading-snug">{p.title}</div>
                <div className="text-[0.85rem] text-muted leading-relaxed mb-4 font-light flex-1">
                  {p.overview.split(".")[0]}.
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="bg-white border border-border text-blue text-[0.72rem] px-2 py-0.5 rounded font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                  <span className="text-[0.75rem] text-light italic">Click to read more</span>
                  {p.github ? (
                    <a
                      href={p.github}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.78rem] text-mid no-underline flex items-center gap-1 font-medium border border-border px-2.5 py-1 rounded bg-white hover:border-sky hover:bg-off transition-colors"
                    >
                      ↗ GitHub
                    </a>
                  ) : (
                    <span className="text-[0.75rem] text-light italic">GitHub coming soon</span>
                  )}
                </div>
              </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
