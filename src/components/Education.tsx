import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="py-24 px-8 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-[0.72rem] tracking-[0.14em] uppercase text-sky font-medium mb-2.5">
          Background
        </div>
        <h2 className="font-serif text-[1.9rem] text-navy mb-10">Education</h2>
        <Reveal>
          <div
            className="rounded-sm border border-border p-8"
            style={{ background: "linear-gradient(135deg, #f0f5ff, #e8effc)" }}
          >
            <div className="font-medium text-[1.1rem] text-navy mb-1">University of California, Berkeley</div>
            <div className="text-[0.9rem] text-mid mb-2.5">
              B.S. Electrical Engineering &amp; Computer Sciences
            </div>
            <div className="text-[0.82rem] text-muted leading-relaxed font-light">
              Relevant coursework: Structure and Interpretation of Computer Programs (SICP) · Data
              Structures &amp; Algorithms · Linear Algebra &amp; Differential Equations · Foundations,
              Principles and Techniques of Data Science · Great Ideas of Computer Architecture ·
              Discrete Mathematics and Probability Theory
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
