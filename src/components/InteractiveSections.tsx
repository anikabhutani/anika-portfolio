"use client";

import { useState } from "react";
import Timeline from "./Timeline";
import Projects from "./Projects";
import TechStackFilter from "./TechStackFilter";

export default function InteractiveSections() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <>
      <Timeline activeFilter={activeFilter} />
      <Projects activeFilter={activeFilter} />
      <TechStackFilter activeFilter={activeFilter} onSelect={setActiveFilter} />
    </>
  );
}
