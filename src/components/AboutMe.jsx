import React from "react"
import { motion } from "framer-motion"
import {
  Monitor,
  Server,
  Layers,
  GitBranch,
} from "lucide-react"

const services = [
  {
    title: "Frontend Development",
    description:
      "Building responsive and modern interfaces with React, JavaScript and Tailwind CSS.",
    icon: Monitor,
    badges: ["React", "JavaScript", "Tailwind"],
  },
  {
    title: "Backend Development",
    description:
      "Building REST APIs and backend services with Node.js, Express and MongoDB.",
    icon: Server,
    badges: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Full-Stack Development",
    description:
      "Connecting frontend, backend and database into complete web applications.",
    icon: Layers,
    badges: ["MERN", "REST API", "JWT"],
  },
  {
    title: "Development Workflow",
    description:
      "Working with modern development tools, version control and deployment workflows.",
    icon: GitBranch,
    badges: ["Git", "GitHub", "Vite"],
  },
]

const ServiceCard = ({
  index,
  title,
  description,
  icon: Icon,
  badges,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="group h-full"
    >
      <div className="relative h-full min-h-[330px] overflow-hidden rounded-[24px] border border-black/10 bg-white p-7 shadow-sm transition-all duration-500 hover:border-cyan-500/40 hover:shadow-xl dark:border-white/10 dark:bg-[#14161b] dark:hover:border-cyan-400/40 dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]">

        {/* Subtle hover glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl transition-opacity duration-500 group-hover:bg-cyan-400/10" />

        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: 6,
            scale: 1.08,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/5 text-cyan-600 transition-colors duration-300 group-hover:bg-cyan-500/10 dark:text-cyan-400"
        >
          <Icon size={28} strokeWidth={1.5} />
        </motion.div>

        {/* Content */}
        <div className="relative mt-10">
          <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            {title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-neutral-500 dark:text-white/45">
            {description}
          </p>
        </div>

        {/* Badges */}
        <div className="relative mt-8 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[11px] font-medium text-neutral-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/50"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-7 right-7 h-px origin-left scale-x-0 bg-cyan-400 transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </motion.div>
  )
}

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f4f5f7] px-4 py-24 text-neutral-900 transition-colors duration-500 dark:bg-[#0c0d10] dark:text-white sm:px-6 md:px-12 lg:px-20"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] dark:bg-cyan-500/10" />

      <div className="relative mx-auto w-full max-w-7xl">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
            ABOUT ME
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            What I Do.
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="mt-6 max-w-3xl text-base leading-8 text-neutral-600 dark:text-white/50 sm:text-[17px]"
        >
          I'm a Full-Stack Developer focused on building modern web
          applications from frontend to backend. I work with React,
          JavaScript, Node.js, Express and MongoDB to create responsive
          interfaces, reliable APIs and complete web applications.
        </motion.p>

        {/* Service Cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  )
}