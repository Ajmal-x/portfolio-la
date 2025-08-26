import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import AboutMe from "./components/AboutMe"
import Education from "./components/Education"
import Experience from "./components/Experience"
import Presentations from "./components/Presentations"
import SkillsRings from "./components/SkillsRings"
import Honours from "./components/Honours"
import Contact from "./components/Contact"

export default function App() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero />
      <AboutMe />
      <Education />
      <Experience />
      <Presentations />
      <SkillsRings />
      <Honours />
      <Contact/>
    </div>
  )
}
