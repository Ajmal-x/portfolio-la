import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Work", link: "#projects" },
  { name: "Skills", link: "#skills" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const { dark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        "home",
        "about",
        "projects",
        "skills",
        "experience",
        "contact",
      ];

      let currentSection = "home";

      for (const id of sections) {
        const section = document.getElementById(id);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 180 && rect.bottom >= 180) {
          currentSection = id;
          break;
        }
      }

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (id) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <nav
        className={`
          mx-auto flex max-w-7xl items-center justify-between
          rounded-2xl border
          px-4 py-2.5 sm:px-5
          transition-all duration-500

          ${
            dark
              ? scrolled
                ? "border-white/[0.10] bg-[#111318]/85 shadow-2xl shadow-black/20 backdrop-blur-2xl"
                : "border-white/[0.07] bg-[#111318]/55 backdrop-blur-xl"
              : scrolled
                ? "border-black/[0.08] bg-white/85 shadow-xl shadow-black/10 backdrop-blur-2xl"
                : "border-black/[0.07] bg-white/65 backdrop-blur-xl"
          }
        `}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={() => handleNavigation("home")}
          className="group flex items-center gap-3"
        >
          <div
            className={`
              relative flex h-9 w-9 shrink-0
              items-center justify-center
              overflow-hidden rounded-xl border
              transition-all duration-300

              ${
                dark
                  ? "border-white/[0.13] bg-white/[0.05] group-hover:border-cyan-400/40"
                  : "border-black/[0.12] bg-black/[0.025] group-hover:border-cyan-500/40"
              }
            `}
          >
            <span
              className={`
                text-xs font-semibold tracking-[-0.05em]
                ${dark ? "text-white" : "text-neutral-900"}
              `}
            >
              AA
            </span>

            <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
          </div>

          <div className="hidden leading-none sm:block">
            <p
              className={`
                text-sm font-semibold tracking-tight
                ${dark ? "text-white" : "text-neutral-900"}
              `}
            >
              Abdullah Ahmadi
            </p>

            <p
              className={`
                mt-1.5 text-[9px] uppercase tracking-[0.24em]
                ${dark ? "text-neutral-600" : "text-neutral-500"}
              `}
            >
              Full-Stack Developer
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div
          className={`
            hidden items-center gap-1 rounded-full
            px-1 py-1 md:flex

            ${dark ? "bg-white/[0.025]" : "bg-black/[0.025]"}
          `}
        >
          {navItems.map((item) => {
            const id = item.link.replace("#", "");
            const isActive = active === id;

            return (
              <a
                key={item.name}
                href={item.link}
                onClick={() => handleNavigation(id)}
                className={`
                  relative rounded-full
                  px-4 py-2
                  text-[13px] font-medium
                  transition-all duration-300

                  ${
                    isActive
                      ? dark
                        ? "text-white"
                        : "text-neutral-900"
                      : dark
                        ? "text-neutral-500 hover:text-white"
                        : "text-neutral-500 hover:text-neutral-900"
                  }
                `}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`
                      absolute inset-0 -z-10 rounded-full

                      ${dark ? "bg-white/[0.07]" : "bg-black/[0.06]"}
                    `}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative">{item.name}</span>

                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`
              flex h-9 w-9 items-center justify-center
              rounded-full border
              transition-all duration-300

              ${
                dark
                  ? "border-white/[0.1] bg-white/[0.04] text-neutral-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-400"
                  : "border-black/[0.09] bg-black/[0.025] text-neutral-700 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-600"
              }
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {dark ? (
                <motion.span
                  key="sun"
                  initial={{
                    opacity: 0,
                    rotate: -60,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 60,
                    scale: 0.7,
                  }}
                >
                  <Sun size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{
                    opacity: 0,
                    rotate: 60,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -60,
                    scale: 0.7,
                  }}
                >
                  <Moon size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Resume */}
          <a
            href="/Abdullah-Ahmadi-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group hidden items-center gap-2
              rounded-full border
              px-4 py-2.5
              text-xs font-medium
              transition-all duration-300
              md:flex

              ${
                dark
                  ? "border-white/[0.1] bg-white/[0.05] text-white hover:border-cyan-400/40 hover:bg-cyan-400/10"
                  : "border-black/[0.09] bg-black/[0.025] text-neutral-900 hover:border-cyan-500/40 hover:bg-cyan-500/10"
              }
            `}
          >
            <span>Resume</span>

            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          {/* Mobile */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            className={`
              flex h-9 w-9 items-center justify-center
              rounded-full border
              transition-all duration-300
              md:hidden

              ${
                dark
                  ? "border-white/[0.1] bg-white/[0.04] text-white"
                  : "border-black/[0.09] bg-black/[0.025] text-neutral-900"
              }
            `}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.97,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className={`
              mx-auto mt-2 max-w-7xl
              overflow-hidden rounded-2xl border
              p-2.5 shadow-2xl
              backdrop-blur-2xl
              md:hidden

              ${
                dark
                  ? "border-white/[0.09] bg-[#111318]/95"
                  : "border-black/[0.08] bg-white/95"
              }
            `}
          >
            {navItems.map((item, index) => {
              const id = item.link.replace("#", "");
              const isActive = active === id;

              return (
                <motion.a
                  key={item.name}
                  href={item.link}
                  onClick={() => handleNavigation(id)}
                  initial={{
                    opacity: 0,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  className={`
                    flex items-center justify-between
                    rounded-xl px-4 py-3.5
                    text-sm font-medium
                    transition-colors duration-200

                    ${
                      isActive
                        ? dark
                          ? "bg-white/[0.06] text-white"
                          : "bg-black/[0.04] text-neutral-900"
                        : dark
                          ? "text-neutral-500 hover:bg-white/[0.04] hover:text-white"
                          : "text-neutral-600 hover:bg-black/[0.03] hover:text-neutral-900"
                    }
                  `}
                >
                  <span>{item.name}</span>

                  <ArrowUpRight
                    size={14}
                    className={
                      isActive
                        ? "text-cyan-400"
                        : dark
                          ? "text-neutral-700"
                          : "text-neutral-400"
                    }
                  />
                </motion.a>
              );
            })}

            <div
              className={`
                my-2 h-px
                ${dark ? "bg-white/[0.07]" : "bg-black/[0.07]"}
              `}
            />

            <a
              href="/Abdullah-Ahmadi-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`
    group hidden items-center gap-2
    rounded-full border
    px-4 py-2.5
    text-xs font-medium
    transition-all duration-300
    md:flex

    ${
      dark
        ? "border-white/[0.1] bg-white/[0.05] text-white hover:border-cyan-400/40 hover:bg-cyan-400/10"
        : "border-black/[0.09] bg-black/[0.025] text-neutral-900 hover:border-cyan-500/40 hover:bg-cyan-500/10"
    }
  `}
            >
              <span>Resume</span>

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="/Abdullah-Ahmadi-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl bg-cyan-400 px-4 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-cyan-300"
            >
              <span>View Resume</span>
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
