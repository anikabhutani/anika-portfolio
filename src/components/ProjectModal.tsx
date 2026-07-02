"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types/project";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          style={{ background: "rgba(10,22,40,0.55)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="bg-white rounded-sm border border-border w-full max-w-[700px] max-h-[88vh] overflow-y-auto shadow-modal"
          >
            <div className="px-8 pt-7 pb-5 border-b border-border sticky top-0 bg-white z-10 rounded-none">
              <div className="flex items-start justify-between gap-4">
                <div className="font-serif text-2xl text-navy leading-tight">{project.title}</div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="border border-border rounded-sm w-8 h-8 flex items-center justify-center text-muted hover:border-sky hover:text-mid transition-colors flex-shrink-0"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 items-center">
                {project.award && (
                  <span className="inline-flex items-center gap-1 bg-[#fef9c3] border border-[#fde68a] text-[#92400e] text-[0.7rem] px-2 py-0.5 rounded font-medium">
                    {project.award}
                  </span>
                )}
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="bg-white border border-border text-blue text-[0.72rem] px-2 py-0.5 rounded font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-8 py-7">
              <ModalSection label="Overview">
                <p className="text-[0.93rem] text-muted leading-relaxed font-light">{project.overview}</p>
              </ModalSection>

              <ModalSection label="Highlights">
                <ul className="pl-5 flex flex-col gap-1.5 list-disc">
                  {project.details.map((d) => (
                    <li key={d} className="text-[0.93rem] text-muted leading-relaxed font-light">
                      {d}
                    </li>
                  ))}
                </ul>
              </ModalSection>

              <ModalSection label="Visuals">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt={project.imageAlt} className="w-full rounded-sm" />
                ) : (
                  <div className="w-full bg-off border border-dashed border-border rounded-sm flex flex-col items-center justify-center py-8 text-light text-[0.82rem] italic min-h-[160px] text-center gap-2">
                    📸 Add a screenshot by setting <code className="text-[0.75rem]">image</code> in{" "}
                    <code className="text-[0.75rem]">src/lib/data.ts</code>.
                  </div>
                )}
              </ModalSection>

              {project.snippet && (
                <ModalSection label="Code highlight">
                  <pre className="w-full bg-[#f8fafc] border border-border rounded-sm p-5 text-muted text-[0.8rem] font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
                    {project.snippet}
                  </pre>
                </ModalSection>
              )}

              <ModalSection label="Links">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-[0.85rem] font-medium no-underline bg-navy text-white hover:bg-blue transition-colors"
                  >
                    ↗ View on GitHub
                  </a>
                ) : (
                  <p className="italic text-light text-[0.85rem]">GitHub repo coming soon.</p>
                )}
              </ModalSection>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-7 last:mb-0">
      <div className="text-[0.72rem] tracking-[0.12em] uppercase text-sky font-medium mb-2.5">
        {label}
      </div>
      {children}
    </div>
  );
}
