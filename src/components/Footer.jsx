import { motion } from "framer-motion"
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
} from "lucide-react"

const navigation = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#f4f5f7] px-4 pb-6 pt-16 text-neutral-900 transition-colors duration-500 dark:border-white/10 dark:bg-[#090b0f] dark:text-white sm:px-6 md:px-10 lg:px-16">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Main footer */}
        <div className="grid gap-12 md:grid-cols-[1.5fr_0.7fr_1fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#home"
              className="inline-block text-2xl font-bold tracking-tight"
            >
              Abdullah{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Ahmadi
              </span>
            </a>

            <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500 dark:text-white/45">
              Full-Stack Developer focused on building modern,
              responsive and practical web applications with the
              MERN stack.
            </p>

            {/* Tech badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "Node.js", "Express", "MongoDB"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-neutral-500 dark:border-white/10 dark:text-white/45"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">
              Navigate
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-fit text-sm text-neutral-500 transition-colors hover:text-cyan-500 dark:text-white/45 dark:hover:text-cyan-400"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Get in touch */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">
              Get in touch
            </h3>

            <p className="mt-5 text-sm leading-7 text-neutral-500 dark:text-white/45">
              Available for freelance projects, collaborations and
              development opportunities.
            </p>

            <a
              href="mailto:abdullah.ah5695@gmail.com"
              className="mt-5 flex items-center gap-2 text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
            >
              <Mail size={16} />
              abdullah.ah5695@gmail.com
            </a>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-black/10 pt-6 dark:border-white/10">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            {/* Socials */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Ajmal-x"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-neutral-500 transition-all hover:border-cyan-500/30 hover:text-cyan-500 dark:border-white/10 dark:text-white/40 dark:hover:border-cyan-400/30 dark:hover:text-cyan-400"
              >
                <Github size={17} />
              </a>

              <a
                href="https://af.linkedin.com/in/abdullah-ahmadi-703306364"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-neutral-500 transition-all hover:border-cyan-500/30 hover:text-cyan-500 dark:border-white/10 dark:text-white/40 dark:hover:border-cyan-400/30 dark:hover:text-cyan-400"
              >
                <Linkedin size={17} />
              </a>

              <a
                href="mailto:abdullah.ah5695@gmail.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-neutral-500 transition-all hover:border-cyan-500/30 hover:text-cyan-500 dark:border-white/10 dark:text-white/40 dark:hover:border-cyan-400/30 dark:hover:text-cyan-400"
              >
                <Mail size={17} />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-center text-xs text-neutral-400 dark:text-white/30">
              © {currentYear} Abdullah Ahmadi. All rights reserved.
            </p>

            {/* Back to top */}
            <a
              href="#home"
              aria-label="Back to top"
              className="group flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-400 transition-colors hover:text-cyan-500 dark:text-white/30 dark:hover:text-cyan-400"
            >
              Top
              <ArrowUp
                size={15}
                className="transition-transform group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}