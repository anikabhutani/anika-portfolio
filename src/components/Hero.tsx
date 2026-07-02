"use client";

import { motion } from "framer-motion";
import TypewriterHeadline from "./TypewriterHeadline";
import { useTerminal } from "./TerminalContext";

export default function Hero() {
  const { setOpen } = useTerminal();
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-32 pb-20 px-8"
      style={{
        background: "linear-gradient(160deg, #f5f8ff 0%, #e8f0fd 50%, #dbeafe 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute -top-20 -right-24 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,168,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-20 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(75,143,212,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="font-serif text-[clamp(2.4rem,5vw,3.5rem)] text-navy leading-[1.12] tracking-tight mb-4"
            style={{ minHeight: "2.3em" }}
          >
            I&apos;m{" "}
            <span className="text-mid">
              <TypewriterHeadline />
            </span>
          </h1>
          <p className="text-[1.05rem] text-muted max-w-[480px] leading-relaxed mb-8 font-light">
            A student studying Electrical Engineering &amp; Computer Sciences at UC Berkeley, working
            at the intersection of machine learning, full-stack development, and data science.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#projects"
              className="bg-navy text-white px-6 py-2.5 rounded-sm text-[0.88rem] font-medium transition-all hover:bg-blue hover:-translate-y-px"
            >
              View my work
            </a>
            <a
              href="mailto:abhutani@berkeley.edu"
              className="border border-border text-muted px-6 py-2.5 rounded-sm text-[0.88rem] transition-colors hover:border-sky hover:text-mid"
            >
              Get in touch
            </a>
            <button
              onClick={() => setOpen(true)}
              className="border border-border text-muted px-6 py-2.5 rounded-sm text-[0.88rem] font-mono transition-colors hover:border-sky hover:text-mid"
            >
              guest@portfolio:~$
            </button>
          </div>
          <div className="flex gap-2.5 mt-6">
            {[
              { href: "https://linkedin.com/in/anika-bhutani/", label: "in", title: "LinkedIn" },
              { href: "https://github.com/anikabhutani", label: "gh", title: "GitHub" },
              { href: "mailto:abhutani@berkeley.edu", label: "@", title: "Email" },
            ].map((s) => (
              <a
                key={s.title}
                href={s.href}
                title={s.title}
                className="w-9 h-9 rounded-sm border border-border flex items-center justify-center text-muted no-underline text-[0.8rem] transition-colors hover:border-sky hover:text-mid"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden md:block bg-white border border-border rounded-sm px-7 py-6 min-w-[200px] shadow-card"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-serif text-[1.9rem] text-navy leading-none">2+</span>
              <span className="text-[0.73rem] text-light tracking-wide mt-0.5">Active internships</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex flex-col">
              <span className="font-serif text-[1.9rem] text-navy leading-none">5+</span>
              <span className="text-[0.73rem] text-light tracking-wide mt-0.5">Hackathon placements</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex flex-col">
              <span className="font-serif text-[1.9rem] text-navy leading-none">8+</span>
              <span className="text-[0.73rem] text-light tracking-wide mt-0.5">Projects shipped</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
