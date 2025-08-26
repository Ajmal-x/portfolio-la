import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Education", link: "#education" },
    { name: "Experience", link: "#experience" },
    { name: "Presentations", link: "#presentations" },
    { name: "Skills", link: "#skills" },
    { name: "Honours", link: "#honours" },
    { name: "Contact", link: "#contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-gray-900/70 backdrop-blur-md border-b border-white/10 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-red-800 via-red-400 to-red-900 bg-clip-text text-transparent">
          Masood Ahmad
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          {navItems.map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer transition hover:text-pink-400"
            >
              <a href={item.link}>{item.name}</a>
            </motion.li>
          ))}
          {/* CV Button */}
          <motion.li whileHover={{ scale: 1.1 }}>
            <a
              href="/Masood Ahmad.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-xl text-white shadow-md hover:shadow-[0_0_15px_#facc15] transition"
            >
              CV
            </a>
          </motion.li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-2/3 sm:w-1/3 
                       bg-white/10 backdrop-blur-2xl border-l border-purple-500/30 
                       shadow-[0_0_25px_rgba(236,72,153,0.6)] 
                       z-50 rounded-l-2xl"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-purple-500/30">
              <h2 className="text-lg font-bold text-white">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <X size={26} className="text-white" />
              </button>
            </div>

            <ul className="flex flex-col gap-6 p-6 text-lg font-medium">
              {navItems.map((item, i) => (
                <li key={i} onClick={() => setOpen(false)}>
                  <a
                    href={item.link}
                    className="block hover:text-pink-400 transition"
                  >
                    {item.name}
                  </a>
                </li>
              ))}

              {/* CV Button for Mobile */}
              <li>
                <a
                  href="/Masood Ahmad.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-xl text-white text-center shadow-md hover:shadow-[0_0_20px_#facc15] transition"
                >
                  CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
