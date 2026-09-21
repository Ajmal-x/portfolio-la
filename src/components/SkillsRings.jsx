import { motion } from "framer-motion"
import {
  Code2,
  Server,
  Database,
  Wrench,
  GitBranch,
  Cloud,
} from "lucide-react"

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    description: "Interfaces & user experiences",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "APIs & server-side systems",
    skills: [
      "Node.js",
      "Express.js",
      "REST API",
      "JWT",
      "Axios",
    ],
  },
  {
    title: "Database",
    icon: Database,
    description: "Data & persistence",
    skills: [
      "MongoDB",
      "Mongoose",
    ],
  },
  {
    title: "Tools & Workflow",
    icon: Wrench,
    description: "Development workflow",
    skills: [
      "Git",
      "GitHub",
      "Vite",
      "VS Code",
      "Figma",
    ],
  },
  {
    title: "Deployment",
    icon: Cloud,
    description: "Production & hosting",
    skills: [
      "Render",
      "Vercel",
      "Cloudinary",
    ],
  },
  {
    title: "Development",
    icon: GitBranch,
    description: "Building complete products",
    skills: [
      "Responsive Design",
      "Authentication",
      "CRUD",
      "API Integration",
      "Component Architecture",
    ],
  },
]

export default function SkillsBars() {
  return (
    <section
      id="skills"
      className="
        relative overflow-hidden
        bg-[#f4f5f7]
        px-6 py-28
        text-[#111318]
        transition-colors duration-500

        dark:bg-[#0c0d10]
        dark:text-white

        sm:px-8
        lg:px-12
      "
    >
      {/* Background Grid */}
      <div
        className="
          pointer-events-none absolute inset-0
          opacity-[0.035]
          dark:hidden
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.7) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        className="
          pointer-events-none absolute inset-0
          hidden opacity-[0.022]
          dark:block
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-500 dark:bg-cyan-400" />

              <span
                className="
                  text-[11px] uppercase tracking-[0.28em]
                  text-cyan-600
                  dark:text-cyan-400
                "
              >
                Technical Stack
              </span>
            </div>

            <h2
              className="
                text-4xl font-semibold
                tracking-[-0.04em]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Tools I use
              <br />
              <span className="text-neutral-400 dark:text-neutral-500">
                to build.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="
              max-w-xl
              text-base leading-8
              text-neutral-600
              dark:text-neutral-400
              lg:ml-auto
            "
          >
            A practical stack focused on building responsive interfaces,
            scalable backend systems, reliable APIs and complete
            full-stack products.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.08] dark:border-white/[0.08] dark:bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.07,
                }}
                className="
                  group
                  relative
                  bg-[#f4f5f7]
                  p-7
                  transition-all duration-500
                  hover:bg-white

                  dark:bg-[#0c0d10]
                  dark:hover:bg-[#111318]
                "
              >
                {/* Number */}
                <span
                  className="
                    absolute right-6 top-6
                    font-mono text-[10px]
                    tracking-widest
                    text-neutral-300
                    dark:text-neutral-700
                  "
                >
                  0{index + 1}
                </span>

                {/* Icon */}
                <div
                  className="
                    mb-7 flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    border
                    transition-all duration-300

                    border-black/[0.08]
                    bg-white
                    text-neutral-700
                    group-hover:border-cyan-500/30
                    group-hover:text-cyan-600

                    dark:border-white/[0.08]
                    dark:bg-white/[0.03]
                    dark:text-neutral-400
                    dark:group-hover:border-cyan-400/30
                    dark:group-hover:text-cyan-400
                  "
                >
                  <Icon size={19} strokeWidth={1.7} />
                </div>

                {/* Title */}
                <h3
                  className="
                    text-lg font-semibold
                    tracking-tight
                    text-neutral-900
                    dark:text-white
                  "
                >
                  {group.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-2 text-sm
                    text-neutral-500
                    dark:text-neutral-500
                  "
                >
                  {group.description}
                </p>

                {/* Skills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        border
                        px-3 py-1.5
                        text-[11px]
                        font-medium
                        transition-all duration-300

                        border-black/[0.08]
                        bg-white
                        text-neutral-600
                        group-hover:border-black/[0.12]

                        dark:border-white/[0.08]
                        dark:bg-white/[0.03]
                        dark:text-neutral-400
                        dark:group-hover:border-white/[0.12]

                        hover:border-cyan-500/40
                        hover:text-cyan-600

                        dark:hover:border-cyan-400/40
                        dark:hover:text-cyan-400
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom Accent */}
                <div
                  className="
                    absolute bottom-0 left-7 right-7
                    h-px
                    origin-left
                    scale-x-0
                    bg-cyan-500
                    transition-transform duration-500
                    group-hover:scale-x-100

                    dark:bg-cyan-400
                  "
                />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="
            mt-10 flex flex-col gap-4
            border-t
            border-black/[0.08]
            pt-6

            dark:border-white/[0.08]

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span
            className="
              font-mono text-[10px]
              uppercase tracking-[0.2em]
              text-neutral-400
              dark:text-neutral-600
            "
          >
            React · Node.js · MongoDB
          </span>

          <span
            className="
              text-xs
              text-neutral-400
              dark:text-neutral-600
            "
          >
            Always learning. Always building.
          </span>
        </motion.div>
      </div>
    </section>
  )
}