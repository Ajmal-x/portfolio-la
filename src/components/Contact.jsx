import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react"

const contactItems = [
  {
    title: "Email",
    subtitle: "Send me a message anytime",
    value: "abdullah.ah5695@gmail.com",
    href: "mailto:abdullah.ah5695@gmail.com",
    icon: Mail,
  },
  {
    title: "LinkedIn",
    subtitle: "Let's connect professionally",
    value: "Abdullah Ahmadi",
    href: "https://af.linkedin.com/in/abdullah-ahmadi-703306364",
    icon: Linkedin,
  },
  {
    title: "GitHub",
    subtitle: "Check out my repositories",
    value: "Ajmal-x",
    href: "https://github.com/Ajmal-x",
    icon: Github,
  },
  {
    title: "WhatsApp",
    subtitle: "Message me on WhatsApp",
    value: "+93 744 415 695",
    href: "https://wa.me/93744415695",
    icon: MessageCircle,
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f4f5f7] px-4 py-28 text-neutral-900 transition-colors duration-500 dark:bg-[#090b0f] dark:text-white sm:px-6 md:px-10 lg:px-16"
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

      {/* Cyan glow */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-400/10" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center"
        >
          {/* Small label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
            <Send size={13} />
            Contact
          </div>

          {/* Heading */}
          <h2 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Let's Work{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Together
            </span>
          </h2>

          {/* Accent line */}
          <div className="mt-7 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-500 dark:text-white/45 sm:text-lg">
            Have a project, an opportunity, or an idea in mind?
            I'm always open to discussing new projects and development
            opportunities.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {contactItems.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.a
                key={item.title}
                href={item.href}
                target={
                  item.href.startsWith("mailto:") ? "_self" : "_blank"
                }
                rel={
                  item.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#11141a]/80 dark:hover:border-cyan-400/30 dark:hover:shadow-[0_15px_50px_rgba(0,0,0,0.25)] sm:p-7"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-400/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-5">
                  {/* Left */}
                  <div className="flex min-w-0 items-start gap-5">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-cyan-600 transition-all duration-300 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 group-hover:text-cyan-500 dark:text-cyan-400">
                      <Icon size={21} strokeWidth={1.6} />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500 dark:text-white/40">
                        {item.subtitle}
                      </p>

                      <p className="mt-4 truncate text-sm font-semibold text-cyan-600 dark:text-cyan-400 sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-neutral-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-500 dark:text-white/30 dark:group-hover:text-cyan-400"
                  />
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-violet-500 transition-transform duration-500 group-hover:scale-x-100" />
              </motion.a>
            )
          })}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 flex flex-col items-center text-center"
        >
          <p className="text-sm text-neutral-400 dark:text-white/25">
            Abdullah Ahmadi · Full-Stack Developer
          </p>

          <p className="mt-2 text-xs text-neutral-400 dark:text-white/20">
            React · Node.js · Express · MongoDB
          </p>
        </motion.div>
      </div>
    </section>
  )
}