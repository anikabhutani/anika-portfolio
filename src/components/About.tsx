import Reveal from "./Reveal";

const INTERESTS = [
  "Machine Learning",
  "Full-Stack",
  "Data Science",
  "Reinforcement Learning",
  "Spatial Transcriptomics",
  "UI/UX",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-8 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-baseline gap-4 mb-14">
          <span className="font-mono text-[0.8rem] text-light">01</span>
          <div className="text-[0.72rem] tracking-[0.14em] uppercase text-sky font-medium">
            About me
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <div className="flex flex-col gap-6">
              <div className="w-full aspect-[4/3] rounded-sm overflow-hidden border border-border bg-off flex items-center justify-center">
                {/* Swap for a real <img src="/assets/anika_headshot.jpeg" .../> once uploaded */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/anika_headshot.jpeg"
                  alt="Anika Bhutani"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <FactCard label="Currently at" value="UC Berkeley — B.S. Engineering, Expected 2028" />
                <FactCard label="Based in" value="Bay Area, California" />
                <FactCard
                  label="Recognition"
                  value="National Merit Finalist · Non-Trivial Fellow · Outstanding Achievement in Math & English"
                />
                <FactCard
                  label="Community"
                  value="Project Manager, Business & Software at Berkeley · Data Developer, The Daily Californian · Logistics, Asha"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="font-serif text-[1.9rem] text-navy leading-tight mb-4">
                Engineer, researcher,
                <br />
                and builder.
              </h2>
              <p className="text-muted text-[0.97rem] leading-relaxed mb-3.5 font-light">
                I&apos;m a student at UC Berkeley studying EECS, with a deep focus on machine
                learning, data science, and full-stack development. I&apos;m drawn to problems where
                code and data can create real-world impact — from clinical decision support to
                energy equity modeling.
              </p>
              <p className="text-muted text-[0.97rem] leading-relaxed mb-3.5 font-light">
                Currently, I&apos;m contracting as a Software Engineer at Luel AI and interning as
                an AI/ML Engineer at Outsampler, working on reinforcement learning for code
                generation. Previously, I spent a summer doing data science research at Stanford.
              </p>
              <p className="text-muted text-[0.97rem] leading-relaxed mb-3.5 font-light">
                Outside of technical projects, I&apos;m a Project Manager at Business &amp; Software
                at Berkeley, a data developer at The Daily Californian, and involved in advocacy
                work with Asha. I&apos;m also a former Speech &amp; Debate captain and like to dance
                and play card games.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {INTERESTS.map((tag) => (
                  <span
                    key={tag}
                    className="bg-off border border-border text-blue px-3 py-1 rounded-sm text-[0.78rem] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-off border border-border rounded-sm px-5 py-4">
      <strong className="block text-[0.78rem] tracking-[0.08em] uppercase text-sky font-medium mb-1">
        {label}
      </strong>
      <span className="text-[0.92rem] text-[#0f172a]">{value}</span>
    </div>
  );
}
