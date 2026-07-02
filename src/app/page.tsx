import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import InteractiveSections from "@/components/InteractiveSections";
import Education from "@/components/Education";
import LiveSection from "@/components/LiveSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import FloatingTerminalButton from "@/components/FloatingTerminalButton";
import { TerminalProvider } from "@/components/TerminalContext";

export default function Home() {
  return (
    <TerminalProvider>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <InteractiveSections />
      <Education />
      <LiveSection />
      <Contact />
      <Footer />
      <Terminal />
      <FloatingTerminalButton />
    </TerminalProvider>
  );
}
