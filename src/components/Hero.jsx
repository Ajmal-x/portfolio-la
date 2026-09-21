import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Terminal as TerminalIcon,
} from "lucide-react"

const terminalSteps = [
  {
    command: "whoami",
    output: "Abdullah Ahmadi",
  },
  {
    command: "role",
    output: "Full-Stack Developer",
  },
  {
    command: "stack",
    output: "React / Node.js / Express / MongoDB",
  },
  {
    command: "project --current",
    output: "Trendify E-Commerce",
  },
]

function DeveloperTerminal() {
  const [step, setStep] = useState(0)
  const [text, setText] = useState("")
  const [showOutput, setShowOutput] = useState(false)

  const current = terminalSteps[step]

  useEffect(() => {
    setText("")
    setShowOutput(false)

    let index = 0

    const typing = setInterval(() => {
      if (index < current.command.length) {
        setText(current.command.slice(0, index + 1))
        index += 1
      } else {
        clearInterval(typing)

        setTimeout(() => {
          setShowOutput(true)
        }, 300)
      }
    }, 65)

    return () => clearInterval(typing)
  }, [step, current.command])

  useEffect(() => {
    if (!showOutput) return

    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % terminalSteps.length)
    }, 1900)

    return () => clearTimeout(timer)
  }, [showOutput])

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* Decorative label */}
      <div className="absolute -right-1 -top-5 hidden text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600 sm:block">
        Developer Environment
      </div>

      {/* Terminal */}
      <div
        className="
          relative overflow-hidden rounded-[22px]
          border bg-white
          shadow-[0_30px_80px_rgba(0,0,0,0.08)]
          transition-all duration-500
          border-black/[0.08]

          dark:border-white/[0.09]
          dark:bg-[#111318]
          dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)]
        "
      >
        {/* Window bar */}
        <div
          className="
            flex h-12 items-center justify-between
            border-b px-4
            border-black/[0.07]
            bg-neutral-100

            dark:border-white/[0.08]
            dark:bg-[#181a20]
          "
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <TerminalIcon size={13} />
            <span>abdullah@portfolio</span>
          </div>

          <span className="w-[38px]" />
        </div>

        {/* Terminal body */}
        <div className="h-[420px] p-6 font-mono text-sm sm:p-8">
          {/* Path */}
          <div className="flex items-center text-[12px]">
            <span className="text-neutral-700 dark:text-neutral-300">
              abdullah
            </span>

            <span className="mx-1 text-neutral-400 dark:text-neutral-700">
              @
            </span>

            <span className="text-neutral-500">portfolio</span>

            <span className="mx-2 text-neutral-400 dark:text-neutral-700">
              :
            </span>

            <span className="text-neutral-500">~</span>
          </div>

          {/* Command */}
          <div className="mt-10">
            <div className="flex items-center gap-3">
              <span className="text-cyan-600 dark:text-cyan-400">$</span>

              <span className="text-neutral-900 dark:text-neutral-100">
                {text}
              </span>

              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
                className="h-[18px] w-[7px] bg-cyan-500 dark:bg-cyan-400"
              />
            </div>

            {/* Output */}
            <div className="mt-5 min-h-[28px] pl-6">
              {showOutput && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {current.output}
                </motion.span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-black/[0.07] dark:bg-white/[0.07]" />

          {/* System information */}
          <div className="grid grid-cols-2 gap-y-6 text-xs sm:grid-cols-3">
            <div>
              <p className="mb-1 text-neutral-400 dark:text-neutral-600">
                STATUS
              </p>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <span className="text-neutral-700 dark:text-neutral-300">
                  Available
                </span>
              </div>
            </div>

            <div>
              <p className="mb-1 text-neutral-400 dark:text-neutral-600">
                FOCUS
              </p>

              <span className="text-neutral-700 dark:text-neutral-300">
                Web Development
              </span>
            </div>

            <div>
              <p className="mb-1 text-neutral-400 dark:text-neutral-600">
                WORK
              </p>

              <span className="text-neutral-700 dark:text-neutral-300">
                Remote
              </span>
            </div>

            <div>
              <p className="mb-1 text-neutral-400 dark:text-neutral-600">
                FRONTEND
              </p>

              <span className="text-neutral-700 dark:text-neutral-300">
                React
              </span>
            </div>

            <div>
              <p className="mb-1 text-neutral-400 dark:text-neutral-600">
                BACKEND
              </p>

              <span className="text-neutral-700 dark:text-neutral-300">
                Node.js
              </span>
            </div>

            <div>
              <p className="mb-1 text-neutral-400 dark:text-neutral-600">
                DATABASE
              </p>

              <span className="text-neutral-700 dark:text-neutral-300">
                MongoDB
              </span>
            </div>
          </div>

          {/* Ready */}
          <div className="mt-10 flex items-center gap-3 text-xs">
            <span className="text-neutral-400 dark:text-neutral-600">
              ready
            </span>

            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="h-3 w-1.5 bg-neutral-500"
            />
          </div>
        </div>

        {/* Status bar */}
        <div
          className="
            flex h-9 items-center justify-between
            border-t px-4
            text-[10px] uppercase tracking-[0.16em]
            border-black/[0.07]
            bg-neutral-100
            text-neutral-400

            dark:border-white/[0.07]
            dark:bg-[#0d0f13]
            dark:text-neutral-600
          "
        >
          <span>main</span>
          <span>UTF-8</span>
          <span>React</span>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute -bottom-7 right-0 text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-700">
        Build / Deploy / Create
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative min-h-screen overflow-hidden
        bg-[#f4f5f7] text-[#111318]
        transition-colors duration-500
        dark:bg-[#0c0d10] dark:text-white
      "
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.7) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          opacity: 0.022,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient light */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-cyan-400/[0.06] blur-[120px] dark:bg-cyan-400/[0.035]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Availability */}
            <div className="mb-7 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-400 opacity-40" />

                <span className="relative h-2.5 w-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              </span>

              <span className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <h1 className="text-[clamp(3.6rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
              Abdullah
              <br />
              <span className="text-neutral-400 dark:text-neutral-500">
                Ahmadi.
              </span>
            </h1>

            {/* Headline */}
            <div className="mt-8">
              <p className="max-w-xl text-2xl font-medium leading-tight tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-3xl">
                I build the web,
                <br />
                <span className="text-cyan-600 dark:text-cyan-400">
                  from interface to backend.
                </span>
              </p>
            </div>

            {/* Role */}
            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-12 bg-cyan-500 dark:bg-cyan-400" />

              <span className="text-sm uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
                Full-Stack Developer
              </span>
            </div>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:text-lg">
              I build modern, responsive web applications with React,
              Node.js, Express and MongoDB — from polished interfaces
              to complete backend systems.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="
                  group inline-flex items-center gap-3
                  rounded-full bg-[#111318]
                  px-6 py-3.5
                  text-sm font-semibold text-white
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-cyan-500 hover:text-black
                  dark:bg-white dark:text-black
                  dark:hover:bg-cyan-400
                "
              >
                View my work

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#contact"
                className="
                  inline-flex items-center gap-3
                  rounded-full border
                  border-black/[0.12]
                  px-6 py-3.5
                  text-sm text-neutral-700
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-cyan-500/40
                  hover:text-cyan-600
                  dark:border-white/[0.12]
                  dark:text-neutral-300
                  dark:hover:border-cyan-400/40
                  dark:hover:text-cyan-400
                "
              >
                <Mail size={16} />
                Let's connect
              </a>
            </div>

            {/* Socials */}
            <div className="mt-10 flex items-center gap-5">
              <a
                href="https://github.com/Ajmal-x"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
              >
                <Github size={19} />
              </a>

              <a
                href="https://af.linkedin.com/in/abdullah-ahmadi-703306364"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
              >
                <Linkedin size={19} />
              </a>

              <span className="h-px w-14 bg-black/[0.08] dark:bg-white/[0.08]" />

              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                React · Node · MongoDB
              </span>
            </div>
          </motion.div>

          {/* RIGHT */}
          <DeveloperTerminal />
        </div>

        {/* Scroll */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="
            absolute bottom-8 left-6 hidden
            items-center gap-3
            text-[10px] uppercase tracking-[0.25em]
            text-neutral-400
            transition-colors
            hover:text-neutral-700
            dark:text-neutral-600
            dark:hover:text-neutral-400
            sm:flex lg:left-12
          "
        >
          <ArrowDown size={14} className="animate-bounce" />
          Scroll to explore
        </motion.a>
      </div>
    </section>
  )
}