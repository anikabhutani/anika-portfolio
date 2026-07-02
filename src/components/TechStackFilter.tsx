"use client";

import { SKILL_GROUPS } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function TechStackFilter({
  activeFilter,
  onSelect,
}: {
  activeFilter: string | null;
  onSelect: (skill: string | null) => void;
}) {
  return (
    <section id="skills" className="py-24 px-8 bg-off">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading
          index="04"
          label="Toolbox"
          title="Skills"
          trailing={
            activeFilter ? (
              <button
                onClick={() => onSelect(null)}
                className="text-[0.8rem] text-mid border border-border rounded-sm px-3 py-1.5 hover:border-sky transition-colors bg-white"
              >
                Clear filter: {activeFilter} ✕
              </button>
            ) : undefined
          }
        />
        <p className="text-[0.82rem] text-light italic mb-7 -mt-6">
          Click a skill to highlight the projects and timeline entries that used it.
        </p>

        <Reveal>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="bg-white border border-border rounded-sm p-5">
              <div className="text-[0.75rem] tracking-[0.1em] uppercase text-sky font-medium mb-3">
                {group.title}
              </div>
              <div className="flex flex-col gap-1.5">
                {group.items.map((skill) => {
                  const active = activeFilter === skill;
                  return (
                    <button
                      key={skill}
                      onClick={() => onSelect(active ? null : skill)}
                      className="text-left text-[0.85rem] font-normal py-1 px-2 -mx-2 rounded transition-colors"
                      style={{
                        color: active ? "#1a3a6e" : "#0f172a",
                        background: active ? "#dbeafe" : "transparent",
                        fontWeight: active ? 500 : 400,
                      }}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
