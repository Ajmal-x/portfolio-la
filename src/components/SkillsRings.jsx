import { motion } from "framer-motion"
import {
  Code2,
  Server,
  Database,
  Wrench,
  GitBranch,
  Cloud,
} from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    description: "Building experiences that matter",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    gradient: "from-violet-500 to-purple-500",
    hover: "hover:border-violet-400/40",
    badge:
      "group-hover:bg-violet-500/10 group-hover:border-violet-400/40 group-hover:text-violet-600 dark:group-hover:text-violet-300",
  },
  {
    title: "Backend",
    icon: Server,
    description: "APIs that scale reliably",
    skills: ["Node.js", "Express.js", "REST API", "Fastify"],
    gradient: "from-blue-500 to-cyan-500",
    hover: "hover:border-blue-400/40",
    badge:
      "group-hover:bg-blue-500/10 group-hover:border-blue-400/40 group-hover:text-blue-600 dark:group-hover:text-blue-300",
  },
  {
    title: "Database",
    icon: Database,
    description: "Data architecture & optimization",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Firebase"],
    gradient: "from-emerald-500 to-teal-500",
    hover: "hover:border-emerald-400/40",
    badge:
      "group-hover:bg-emerald-500/10 group-hover:border-emerald-400/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-300",
  },
  {
    title: "DevOps",
    icon: Cloud,
    description: "Deployment & infrastructure",
    skills: ["Docker", "Vercel", "Render", "AWS"],
    gradient: "from-orange-500 to-amber-500",
    hover: "hover:border-orange-400/40",
    badge:
      "group-hover:bg-orange-500/10 group-hover:border-orange-400/40 group-hover:text-orange-600 dark:group-hover:text-orange-300",
  },
  {
    title: "Tools",
    icon: Wrench,
    description: "Workflow & productivity",
    skills: ["Git", "GitHub", "VS Code", "Vite"],
    gradient: "from-pink-500 to-rose-500",
    hover: "hover:border-pink-400/40",
    badge:
      "group-hover:bg-pink-500/10 group-hover:border-pink-400/40 group-hover:text-pink-600 dark:group-hover:text-pink-300",
  },
  {
    title: "Architecture",
    icon: GitBranch,
    description: "Building at scale",
    skills: ["Microservices", "System Design", "Testing", "CI/CD"],
    gradient: "from-indigo-500 to-purple-500",
    hover: "hover:border-indigo-400/40",
    badge:
      "group-hover:bg-indigo-500/10 group-hover:border-indigo-400/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-300",
  },
]

export default function SkillsShowcase() {
  const { dark } = useTheme()

  const isDark = dark


  return (
    <section
      className={`
        relative min-h-screen overflow-hidden
        px-6 py-28 sm:px-8 lg:px-12
        transition-colors duration-500
        ${
          isDark
            ? "bg-[#050505] text-white"
            : "bg-[#f7f7f8] text-slate-950"
        }
      `}
    >
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-emerald-400/5 blur-3xl" />
          </>
        )}
      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="mb-6 flex items-center gap-3">
            <div
              className={`
                h-px w-12
                bg-gradient-to-r
                from-violet-500 to-transparent
              `}
            />

            <span
              className={`
                text-xs font-semibold uppercase tracking-[0.2em]
                ${
                  isDark
                    ? "text-violet-400"
                    : "text-violet-600"
                }
              `}
            >
              Technical Expertise
            </span>
          </div>

          <div className="max-w-3xl">
            <h2
              className={`
                text-5xl font-bold tracking-tight
                sm:text-6xl lg:text-7xl
                ${
                  isDark
                    ? "text-white"
                    : "text-slate-950"
                }
              `}
            >
              Specialized in

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-violet-500
                  via-purple-500
                  to-blue-500
                  bg-clip-text
                  text-transparent
                "
              >
                full-stack development
              </span>
            </h2>

            <p
              className={`
                mt-6 max-w-2xl
                text-lg leading-relaxed
                ${
                  isDark
                    ? "text-neutral-400"
                    : "text-slate-600"
                }
              `}
            >
              Production-ready expertise across the entire stack.
              From interactive interfaces to scalable backend systems,
              I build complete solutions that matter.
            </p>
          </div>
        </motion.div>

        {/* ================= SKILLS GRID ================= */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="group"
              >
                <div
                  className={`
                    relative h-full overflow-hidden
                    rounded-2xl border
                    p-8
                    backdrop-blur-sm
                    transition-all duration-500
                    hover:-translate-y-1
                    ${
                      isDark
                        ? `
                          border-white/10
                          bg-white/[0.035]
                          hover:bg-white/[0.06]
                          ${group.hover}
                        `
                        : `
                          border-slate-200
                          bg-white/80
                          shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                          hover:bg-white
                          hover:shadow-[0_20px_60px_rgba(15,23,42,0.09)]
                          ${group.hover}
                        `
                    }
                  `}
                >

                  {/* TOP GRADIENT LINE */}

                  <div
                    className={`
                      absolute inset-x-0 top-0 h-[2px]
                      rounded-t-2xl
                      bg-gradient-to-r ${group.gradient}
                      opacity-0
                      transition-opacity duration-300
                      group-hover:opacity-100
                    `}
                  />

                  {/* ================= ICON ================= */}

                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                    className={`
                      mb-6 inline-flex
                      rounded-xl
                      bg-gradient-to-br
                      ${group.gradient}
                      p-3
                      shadow-lg
                    `}
                  >
                    <Icon
                      size={24}
                      className="text-white"
                      strokeWidth={1.7}
                    />
                  </motion.div>

                  {/* ================= TITLE ================= */}

                  <h3
                    className={`
                      mb-2 text-2xl font-bold
                      ${
                        isDark
                          ? "text-white"
                          : "text-slate-950"
                      }
                    `}
                  >
                    {group.title}
                  </h3>

                  {/* ================= DESCRIPTION ================= */}

                  <p
                    className={`
                      mb-6 text-sm
                      ${
                        isDark
                          ? "text-neutral-400"
                          : "text-slate-500"
                      }
                    `}
                  >
                    {group.description}
                  </p>

                  {/* ================= SKILLS ================= */}

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay:
                            index * 0.08 +
                            i * 0.05,
                        }}
                        className={`
                          inline-flex
                          rounded-full
                          border
                          px-3 py-1.5
                          text-xs font-medium
                          transition-all duration-300
                          ${
                            isDark
                              ? "border-white/10 bg-white/[0.04] text-neutral-300"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                          }
                          ${group.badge}
                        `}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* ================= HOVER GLOW ================= */}

                  <div
                    className={`
                      pointer-events-none
                      absolute inset-0
                      rounded-2xl
                      bg-gradient-to-br
                      ${group.gradient}
                      opacity-0
                      blur-2xl
                      transition-opacity duration-500
                      group-hover:opacity-[0.035]
                    `}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ================= STATS ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className={`
            mt-20 grid
            gap-8
            rounded-2xl
            border
            p-8
            backdrop-blur-sm
            sm:grid-cols-3
            ${
              isDark
                ? "border-white/10 bg-white/[0.035]"
                : "border-slate-200 bg-white/80 shadow-[0_10px_40px_rgba(15,23,42,0.05)]"
            }
          `}
        >

          {/* STAT 1 */}

          <div className="text-center">
            <div
              className="
                mb-2 text-4xl font-bold
                bg-gradient-to-r
                from-violet-500
                to-purple-500
                bg-clip-text
                text-transparent
              "
            >
              6+
            </div>

            <p
              className={`
                text-sm
                ${
                  isDark
                    ? "text-neutral-400"
                    : "text-slate-500"
                }
              `}
            >
              Technology domains
            </p>
          </div>

          {/* STAT 2 */}

          <div
            className={`
              border-x
              text-center
              ${
                isDark
                  ? "border-white/10"
                  : "border-slate-200"
              }
            `}
          >
            <div
              className="
                mb-2 text-4xl font-bold
                bg-gradient-to-r
                from-blue-500
                to-cyan-500
                bg-clip-text
                text-transparent
              "
            >
              20+
            </div>

            <p
              className={`
                text-sm
                ${
                  isDark
                    ? "text-neutral-400"
                    : "text-slate-500"
                }
              `}
            >
              Production projects
            </p>
          </div>

          {/* STAT 3 */}

          <div className="text-center">
            <div
              className="
                mb-2 text-4xl font-bold
                bg-gradient-to-r
                from-emerald-500
                to-teal-500
                bg-clip-text
                text-transparent
              "
            >
              Continuous
            </div>

            <p
              className={`
                text-sm
                ${
                  isDark
                    ? "text-neutral-400"
                    : "text-slate-500"
                }
              `}
            >
              Learning & growth
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}