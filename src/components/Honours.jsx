import { motion } from "framer-motion"
import { FaMedal, FaTrophy, FaAward } from "react-icons/fa"

const honours = [
  {
    title: "IMM-LUMS Fellowship",
    org: "International Center of Theoretical Physics",
    year: "2023",
    icon: <FaTrophy className="text-yellow-400 text-3xl sm:text-4xl md:text-5xl" />,
  },
  {
    title: "IMM-COMSATS Fellowship",
    org: "London Library",
    year: "2022",
    icon: <FaMedal className="text-orange-400 text-3xl sm:text-4xl md:text-5xl" />,
  },
  {
    title: "Gold Medal",
    org: "University of Peshawar",
    year: "2022",
    icon: <FaAward className="text-yellow-300 text-3xl sm:text-4xl md:text-5xl" />,
  },
  {
    title: "Ehsaas Undergraduate Scholarship",
    org: "Government of Pakistan",
    year: "2020",
    icon: <FaMedal className="text-green-400 text-3xl sm:text-4xl md:text-5xl" />,
  },
]

export default function Honours() {
  return (
    <section
      id="honours"
      className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 py-12 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-10 sm:mb-12 text-center"
      >
        Honours & Awards
      </motion.h2>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl w-full">
        {honours.map((honour, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="flex items-center gap-4 sm:gap-5 bg-white/5 p-4 sm:p-6 lg:p-8 rounded-2xl backdrop-blur-md border border-yellow-400/20 shadow-lg hover:shadow-[0_0_25px_#facc15] transition"
          >
            {/* Icon */}
            <div className="p-3 sm:p-4 rounded-full bg-gradient-to-tr from-yellow-500 via-orange-400 to-red-400 shadow-lg flex items-center justify-center">
              {honour.icon}
            </div>

            {/* Text */}
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-yellow-300">
                {honour.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">{honour.org}</p>
              <span className="text-gray-500 text-xs sm:text-sm">{honour.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
