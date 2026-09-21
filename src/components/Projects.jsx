import { motion } from "framer-motion"
import {
  ArrowUpRight,
  ExternalLink,
  ShoppingBag,
  Hotel,
  Car,
  BriefcaseBusiness,
  Store,
  Map,
  LayoutDashboard,
  Box,
  Github,
  Code2
} from "lucide-react"

import ecommerce from "../assets/ecommerce.png"
import hotelbooking from "../assets/hotelbooking.png"
import dportfolio from "../assets/dportfolio.png"
import carrent from "../assets/carrent.png"
import jobit from "../assets/jobit.png"
import supermarket from "../assets/supermarket.png"
import tripguide from "../assets/tripguide.png"
import admin from "../assets/admin.png"

const projects = [
  {
    number: "01",
    title: "Trendify",
    subtitle: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with authentication, product management, cloud image handling, and an admin dashboard.",
    image: ecommerce,
    category: "Full-Stack",
    tech: ["React", "Node.js", "MongoDB"],
    live: "https://mern-ecommerce-qe7e.onrender.com",
    icon: ShoppingBag,
  },
  {
    number: "02",
    title: "Hotel Booking",
    subtitle: "Booking Platform",
    description:
      "A modern hotel booking experience focused on responsive design and a clean user interface.",
    image: hotelbooking,
    category: "Web App",
    tech: ["React", "JavaScript", "Tailwind"],
    live: "https://hotel-booking-d3xn.vercel.app/",
    icon: Hotel,
  },
  {
    number: "03",
    title: "3D Portfolio",
    subtitle: "Interactive Portfolio",
    description:
      "An interactive developer portfolio built around 3D visuals, motion and immersive presentation.",
    image: dportfolio,
    category: "3D Experience",
    tech: ["React", "Three.js", "Motion"],
    live: "https://portfolio-ten-livid-eto1u02lqq.vercel.app/",
    icon: Box,
  },
  {
    number: "04",
    title: "Car Rental",
    subtitle: "Rental Platform",
    description:
      "A responsive car rental interface designed around vehicle discovery and a streamlined user experience.",
    image: carrent,
    category: "Web App",
    tech: ["React", "JavaScript", "Tailwind"],
    live: null,
    icon: Car,
  },
  {
    number: "05",
    title: "Jobit",
    subtitle: "Job Platform",
    description:
      "A modern job platform interface designed for discovering and exploring employment opportunities.",
    image: jobit,
    category: "Web App",
    tech: ["React", "JavaScript", "Tailwind"],
    live: null,
    icon: BriefcaseBusiness,
  },
  {
    number: "06",
    title: "Supermarket",
    subtitle: "E-Commerce Interface",
    description:
      "A product-focused supermarket shopping experience with a responsive and modern interface.",
    image: supermarket,
    category: "E-Commerce",
    tech: ["React", "JavaScript", "Tailwind"],
    live: null,
    icon: Store,
  },
  {
    number: "07",
    title: "Trip Guide",
    subtitle: "Travel Experience",
    description:
      "A travel-focused interface designed around destinations, exploration and visual discovery.",
    image: tripguide,
    category: "Travel",
    tech: ["React", "JavaScript", "Tailwind"],
    live: null,
    icon: Map,
  },
  {
    number: "08",
    title: "Admin Dashboard",
    subtitle: "Management Interface",
    description:
      "A dedicated dashboard for managing products and administration within the Trendify platform.",
    image: admin,
    category: "Dashboard",
    tech: ["React", "REST API", "JavaScript"],
    live: "https://mern-ecommerce-admin-oemh.onrender.com",
    icon: LayoutDashboard,
  },
]

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-neutral-50 px-4 py-28 text-neutral-900 transition-colors duration-500 dark:bg-[#0c0d10] dark:text-white sm:px-6 md:px-12 lg:px-20"
    >
      {/* Background Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-cyan-500" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
              02 / Selected Work
            </span>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl md:text-7xl">
              Projects<span className="text-cyan-500">.</span>
            </h2>

            <p className="max-w-md text-sm font-medium leading-7 text-neutral-600 dark:text-neutral-400">
              A selection of web applications and digital experiences built
              across frontend, backend and full-stack development.
            </p>
          </div>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => {
            const Icon = project.icon

            return (
              <motion.article
                key={project.number}
                variants={item}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-xl dark:border-white/10 dark:bg-[#13151a] dark:hover:shadow-cyan-500/5"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative overflow-hidden border-b border-neutral-200 bg-neutral-100 dark:border-white/10 dark:bg-neutral-800">
                    <div className="aspect-[16/10] overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={`${project.title} project`}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Number Badge */}
                    <div className="absolute left-4 top-4">
                      <span className="rounded-lg border border-white/20 bg-neutral-900/80 px-2.5 py-1.5 font-mono text-[10px] tracking-widest text-white backdrop-blur-md">
                        {project.number}
                      </span>
                    </div>

                    {/* Icon Badge */}
                    <div className="absolute right-4 top-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-neutral-900/80 text-white backdrop-blur-md">
                        <Icon size={16} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6">
                    {/* Category & Link Status */}
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                        {project.category}
                      </span>

                      {project.live ? (
                        <ExternalLink
                          size={14}
                          className="shrink-0 text-neutral-400 transition-colors duration-300 group-hover:text-cyan-500"
                        />
                      ) : (
                        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                          <Code2 size={12} />
                          UI Concept
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="mt-4 min-h-[72px] text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-neutral-100 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-neutral-700 dark:bg-white/[0.05] dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Area */}
                <div className="mt-auto border-t border-neutral-100 p-6 pt-5 dark:border-white/5">
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors duration-300 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400"
                    >
                      View Live Project
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <span className="inline-block font-mono text-xs text-neutral-400 dark:text-neutral-600">
                      Currently offline
                    </span>
                  )}
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 flex flex-col justify-between gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#13151a] sm:flex-row sm:items-center sm:p-8"
        >
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            More complete works, backend APIs, and experimental code are available on my GitHub.
          </p>

          <a
            href="https://github.com/Ajmal-x"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit shrink-0 items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-cyan-500 hover:text-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-cyan-400"
          >
            <Github size={16} />
            Explore GitHub
            <ArrowUpRight 
              size={15} 
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}