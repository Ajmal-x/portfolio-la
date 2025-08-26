import { motion } from "framer-motion"

const presentations = [
  {
    title: "Introduction to Math’s Volunteers",
    place: "Peshawar, Pakistan",
    date: "6 Jan 2024",
  },
  {
    title: "Campaign About IMM Program",
    place: "Peshawar, Pakistan",
    date: "4 Dec 2023",
  }
]

const conferences = [
  {
    title: "School & Workshop on Dynamical Systems",
    place: "Trieste, Italy",
    date: "22 Jul – 8 Aug 2024",
  },
  {
    title: "CIMPA School on Applied Number Theory",
    place: "Ho Chi Minh, Vietnam",
    date: "3 – 14 Jun 2024",
  },
  {
    title: "Conference on Recent Trends in Mathematics",
    place: "Lahore, Pakistan",
    date: "1 – 2 Jun 2024",
  },
  {
    title: "CIMPA School on Algebra & Algebraic Geometry",
    place: "Lahore, Pakistan",
    date: "26 Feb – 8 Mar 2024",
  },
  {
    title: "CIMPA School on Recent Advances in Combinatorics",
    place: "Lahore, Pakistan",
    date: "1 – 11 Nov 2022",
  }
]

export default function Presentations() {
  return (
    <section
      id="presentations"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-br from-gray-950 via-black to-gray-900 py-12 sm:py-16"
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-10 sm:mb-12 text-center"
      >
        Presentations & Conferences
      </motion.h2>

      {/* Presentations Grid */}
      <div className="w-full max-w-5xl mb-12">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 mb-6 text-center">
          📢 Presentations
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {presentations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl backdrop-blur-md border border-cyan-400/20 shadow hover:shadow-[0_0_20px_#06b6d4] transition-all"
            >
              {/* Date bubble */}
              <span className="text-xs sm:text-sm font-semibold text-white bg-cyan-600 px-3 py-1 rounded-full mb-3">
                {item.date}
              </span>
              {/* Content */}
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-cyan-300">
                {item.title}
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm">{item.place}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Conferences Grid */}
      <div className="w-full max-w-5xl">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-400 mb-6 text-center">
          🎓 Conferences & Schools
        </h3>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {conferences.map((conf, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-4 sm:p-5 rounded-xl bg-white/5 backdrop-blur-md border border-purple-400/20 shadow hover:shadow-[0_0_20px_#a855f7] transition-all"
            >
              <span className="text-xs sm:text-sm font-semibold text-purple-300 block mb-2">
                {conf.date}
              </span>
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-purple-200 mb-1">
                {conf.title}
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm">{conf.place}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
