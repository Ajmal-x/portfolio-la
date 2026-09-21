import { motion } from "framer-motion"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
} from "lucide-react"

const experiences = [
  {
    number: "01",
    role: "Full-Stack Developer",
    company: "Independent Projects",
    period: "2025 — Present",
    type: "Independent",
    description:
      "Developing web applications from interface design and frontend implementation to backend APIs, databases and deployment.",
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Git",
    ],
  },
  {
    number: "02",
    role: "Software Developer",
    company: "Top in Town Technology",
    period: "3 Months",
    type: "Professional Experience",
    description:
      "Worked in a software development environment, contributing to practical web projects and applying frontend and backend development skills.",
    technologies: [
      "Web Development",
      "React",
      "JavaScript",
      "Git",
      "Teamwork",
    ],
  },
]

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#f4f5f7] px-4 py-28 text-neutral-900 transition-colors duration-500 dark:bg-[#0c0d10] dark:text-white sm:px-6 md:px-12 lg:px-20"
    >
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
            03 / Experience
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Experience
            <span className="text-neutral-400 dark:text-white/30">.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-500 dark:text-white/45 sm:text-lg">
            A combination of professional software development and
            hands-on project work across frontend, backend and full-stack
            development.
          </p>
        </motion.div>

        {/* Experience */}
        <div className="mt-20">

          {experiences.map((item, index) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              className="group relative border-t border-black/10 py-10 dark:border-white/10 sm:py-12"
            >
              <div className="grid gap-8 md:grid-cols-[80px_1fr_180px] lg:grid-cols-[100px_1fr_220px]">

                {/* Number */}
                <div className="hidden md:block">
                  <span className="text-xs font-medium tracking-[0.2em] text-neutral-400 dark:text-white/25">
                    {item.number}
                  </span>
                </div>

                {/* Main Content */}
                <div>
                  <div className="flex items-start gap-4">

                    <div className="mt-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 sm:flex">
                      {index === 0 ? (
                        <Code2 size={17} strokeWidth={1.5} />
                      ) : (
                        <BriefcaseBusiness size={17} strokeWidth={1.5} />
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400 sm:text-3xl">
                        {item.role}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <span className="font-medium text-neutral-700 dark:text-white/70">
                          {item.company}
                        </span>

                        <span className="text-neutral-300 dark:text-white/20">
                          /
                        </span>

                        <span className="text-neutral-400 dark:text-white/35">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 max-w-2xl sm:ml-[52px]">
                    <p className="text-sm leading-7 text-neutral-500 dark:text-white/45 sm:text-base">
                      {item.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {item.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="text-xs font-medium text-neutral-400 transition-colors duration-300 group-hover:text-neutral-600 dark:text-white/30 dark:group-hover:text-white/55"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="md:text-right">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-white/30">
                    {item.period}
                  </p>
                </div>
              </div>

              {/* Hover line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-cyan-500/50"
              />
            </motion.article>
          ))}

          {/* Bottom border */}
          <div className="border-t border-black/10 dark:border-white/10" />
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-sm leading-6 text-neutral-400 dark:text-white/30">
            Continuously learning, building and improving through real
            projects and practical development experience.
          </p>

          <a
            href="#projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-cyan-600 dark:text-white/60 dark:hover:text-cyan-400"
          >
            View projects
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}