import GithubStats from "./GithubStats";
import ReadingWidget from "./ReadingWidget";
import Reveal from "./Reveal";

export default function LiveSection() {
  return (
    <section id="live" className="py-24 px-8 bg-off">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-[0.72rem] tracking-[0.14em] uppercase text-sky font-medium mb-2.5">
          Right now
        </div>
        <h2 className="font-serif text-[1.9rem] text-navy mb-10">Currently</h2>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GithubStats />
            <ReadingWidget />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
