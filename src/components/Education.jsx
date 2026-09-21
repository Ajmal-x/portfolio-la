import { motion } from "framer-motion"
import { GraduationCap, ArrowUpRight } from "lucide-react"


const educationData = [
  {
    degree: "Secondary School",
    field: "General Education",
    institution: "High School",
    year: "Completed",
    location: "",
    desc: "Completed secondary school education with a focus on building a strong academic foundation."
  },
  {
    degree: "MERN Stack Development",
    field: "Full-Stack Web Development",
    institution: "Professional Training",
    year: "2024 — 2025",
    location: "",
    desc: "Completed practical training in frontend and backend web development using React, JavaScript, Node.js, Express.js, MongoDB, REST APIs and modern development tools."
  },
]

export default function Education() {
  return (
    <section
      id="education"
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
      {/* Light Grid */}
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

      {/* Dark Grid */}
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
                Background
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
              Education
              <br />
              <span className="text-neutral-400 dark:text-neutral-500">
                & learning.
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
            My academic background and practical learning have shaped
            the way I approach software development, problem solving
            and building real-world products.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="
              absolute bottom-0 left-[19px] top-0
              w-px
              bg-black/[0.08]
              dark:bg-white/[0.08]
              md:left-1/2
            "
          />

          <div className="space-y-12">
            {educationData.map((item, index) => {
              const isRight = index % 2 !== 0

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                  }}
                  className="
                    relative
                    grid
                    md:grid-cols-2
                  "
                >
                  {/* Timeline Dot */}
                  <div
                    className="
                      absolute left-[11px] top-8
                      z-10 flex h-[17px] w-[17px]
                      items-center justify-center
                      rounded-full
                      border
                      bg-[#f4f5f7]
                      border-cyan-500

                      dark:bg-[#0c0d10]
                      dark:border-cyan-400

                      md:left-1/2
                      md:-translate-x-1/2
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  </div>

                  {/* Content */}
                  <div
                    className={`
                      pl-12
                      md:pl-0
                      ${
                        isRight
                          ? "md:col-start-2 md:pl-16"
                          : "md:col-start-1 md:pr-16"
                      }
                    `}
                  >
                    <div
                      className="
                        group relative
                        rounded-2xl
                        border
                        p-7
                        transition-all duration-500

                        border-black/[0.08]
                        bg-white/60
                        hover:border-black/[0.14]
                        hover:bg-white

                        dark:border-white/[0.08]
                        dark:bg-white/[0.025]
                        dark:hover:border-white/[0.14]
                        dark:hover:bg-white/[0.04]
                      "
                    >
                      {/* Top Row */}
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <div
                          className="
                            flex h-10 w-10 shrink-0
                            items-center justify-center
                            rounded-xl
                            border
                            border-black/[0.07]
                            bg-black/[0.025]
                            text-cyan-600

                            dark:border-white/[0.08]
                            dark:bg-white/[0.04]
                            dark:text-cyan-400
                          "
                        >
                          <GraduationCap
                            size={18}
                            strokeWidth={1.7}
                          />
                        </div>

                        <span
                          className="
                            rounded-full
                            border
                            px-3 py-1.5
                            font-mono
                            text-[10px]
                            uppercase
                            tracking-wider

                            border-black/[0.08]
                            text-neutral-500

                            dark:border-white/[0.08]
                            dark:text-neutral-500
                          "
                        >
                          {item.year}
                        </span>
                      </div>

                      {/* Degree */}
                      <h3
                        className="
                          text-xl font-semibold
                          tracking-tight
                          text-neutral-900
                          dark:text-white
                        "
                      >
                        {item.degree}
                      </h3>

                      {/* Field */}
                      <p
                        className="
                          mt-1.5
                          text-sm font-medium
                          text-cyan-600
                          dark:text-cyan-400
                        "
                      >
                        {item.field}
                      </p>

                      {/* Institution */}
                      <div className="mt-5">
                        <p
                          className="
                            text-sm font-medium
                            text-neutral-700
                            dark:text-neutral-300
                          "
                        >
                          {item.institution}
                        </p>

                        <p
                          className="
                            mt-1 text-xs
                            text-neutral-400
                            dark:text-neutral-600
                          "
                        >
                          {item.location}
                        </p>
                      </div>

                      {/* Description */}
                      <p
                        className="
                          mt-5
                          text-sm leading-7
                          text-neutral-500
                          dark:text-neutral-500
                        "
                      >
                        {item.desc}
                      </p>

                      {/* Arrow */}
                      <ArrowUpRight
                        size={16}
                        className="
                          absolute bottom-7 right-7
                          text-neutral-300
                          transition-all duration-300

                          group-hover:-translate-y-1
                          group-hover:translate-x-1
                          group-hover:text-cyan-500

                          dark:text-neutral-700
                          dark:group-hover:text-cyan-400
                        "
                      />

                      {/* Accent */}
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
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}