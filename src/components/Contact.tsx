"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please try again.");
    }
  }

  return (
    <section id="contact" className="py-20 px-8 bg-navy text-white">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <SectionHeading index="05" label="Let's connect" title="Get in touch." light />
          <p className="text-white/60 text-[0.97rem] max-w-[420px] font-light mb-8 -mt-4">
            Open to internship opportunities, research collaborations, and interesting projects. My
            inbox is always open.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="mailto:abhutani@berkeley.edu"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm border border-white/15 text-white/85 no-underline text-[0.88rem] font-normal hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              ✉ abhutani@berkeley.edu
            </a>
            <a
              href="https://linkedin.com/in/anika-bhutani/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm border border-white/15 text-white/85 no-underline text-[0.88rem] font-normal hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/anikabhutani"
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm border border-white/15 text-white/85 no-underline text-[0.88rem] font-normal hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Honeypot — hidden from real users, bots often fill every field */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="hidden"
            aria-hidden="true"
          />

          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-white/5 border border-white/15 rounded-sm px-4 py-2.5 text-white placeholder:text-white/40 text-[0.9rem] outline-none focus:border-white/40"
          />
          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-white/5 border border-white/15 rounded-sm px-4 py-2.5 text-white placeholder:text-white/40 text-[0.9rem] outline-none focus:border-white/40"
          />
          <textarea
            required
            rows={4}
            minLength={10}
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="bg-white/5 border border-white/15 rounded-sm px-4 py-2.5 text-white placeholder:text-white/40 text-[0.9rem] outline-none focus:border-white/40 resize-none"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-white text-navy px-6 py-2.5 rounded-sm text-[0.9rem] font-medium hover:bg-white/90 transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>

          {status === "success" && (
            <p className="text-[0.85rem] text-[#86efac]">Thanks — your message is on its way.</p>
          )}
          {status === "error" && <p className="text-[0.85rem] text-[#fca5a5]">{errorMsg}</p>}
        </form>
      </div>
    </section>
  );
}
