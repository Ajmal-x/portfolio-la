import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Education from "./components/Education";
import Experience from "./components/Experience";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import SkillsRings from "./components/SkillsRings";
import Projects from "./components/Projects"
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero />
      <AboutMe />
      <Projects />
      <Education />
      <Experience />
      <SkillsRings />
      <Contact />

      <ContactCTA />

      <Footer />
    </div>
  );
}
