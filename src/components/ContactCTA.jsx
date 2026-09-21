import { motion } from "framer-motion"
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Linkedin,
  Mail,
} from "lucide-react"

export default function ContactCTA() {
  return (
    <section
      className="relative overflow-hidden bg-[#f4f5f7] px-4 py-24 text-neutral-900 transition-colors duration-500 dark:bg-[#090b0f] dark:text-white sm:px-6 md:px-10 lg:px-16"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/70 px-6 py-12 text-center shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#101318]/80 sm:px-10 sm:py-14"
        >
          {/* Top gradient line */}
          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

          {/* Inner glow */}
          <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-violet-500/10 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              Open to opportunities
            </div>

            {/* Heading */}
            <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-500 dark:text-white/45 sm:text-base">
              Whether you have a detailed project brief or just an idea,
              let's discuss how we can turn it into a real web experience.
            </p>

            {/* Info */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs text-neutral-500 dark:border-white/10 dark:text-white/45">
                <Clock3 size={14} className="text-cyan-500" />
                Open for new projects
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs text-neutral-500 dark:border-white/10 dark:text-white/45">
                <CheckCircle2 size={14} className="text-cyan-500" />
                Direct communication
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs text-neutral-500 dark:border-white/10 dark:text-white/45">
                <ArrowUpRight size={14} className="text-cyan-500" />
                Available remotely
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="mailto:abdullah.ah5695@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-[#071014] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_10px_35px_rgba(34,211,238,0.2)]"
              >
                <Mail size={17} />
                Send Email
              </a>

              <a
                href="https://af.linkedin.com/in/abdullah-ahmadi-703306364"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-6 py-3.5 text-sm font-semibold text-neutral-800 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:text-cyan-600 dark:border-white/10 dark:text-white dark:hover:border-cyan-400/30 dark:hover:text-cyan-400"
              >
                <Linkedin size={17} />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}