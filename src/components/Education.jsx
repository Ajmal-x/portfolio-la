import { motion } from "framer-motion"

const educationData = [
  {
    degree: "Master of Science (M.Sc.) in Mathematics",
    institution: "Lahore University of Management Sciences (LUMS)",
    year: "May 2025 • CGPA: 3.88 / 4.00",
    location: "Lahore, Pakistan",
    desc: "Thesis: Existence of invariant and ergodic measures on deterministic and random dynamical systems. Related coursework: Discrete and continuous dynamical systems, probability theory."
  },
  {
    degree: "Postgraduate Diploma in Mathematics",
    institution: "COMSATS University Islamabad",
    year: "Aug 2022",
    location: "Islamabad, Pakistan",
    desc: "Related coursework: Ergodic theory, functional analysis, measure theory."
  },
  {
    degree: "Bachelor of Science (B.Sc.) in Mathematics",
    institution: "University of Peshawar",
    year: "May 2023 • CGPA: 3.92 / 4.00",
    location: "Peshawar, Pakistan",
    desc: "Thesis: Improvements of the discrete and integral version of Jensen’s and Slater’s inequality. Related coursework: Real analysis, numerical analysis, algebra, differential equations."
  },
  {
    degree: "Intermediate (F.Sc. Pre-Engineering)",
    institution: "Govt. College",
    year: "2018",
    location: "Swabi, Pakistan",
    desc: "Focus on Mathematics and Physics. Built foundation of logical reasoning and analytical skills."
  },
  {
    degree: "Matriculation (Science)",
    institution: "Model High School",
    year: "2016",
    location: "Swabi, Pakistan",
    desc: "Completed foundation studies in Mathematics and Science with distinction."
  }
]

export default function Education() {
  return (
    <section
      id="education"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-br from-gray-950 via-black to-gray-900 py-16 sm:py-20"
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 mb-12 text-center"
      >
        Education
      </motion.h2>

      {/* Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl">
        {educationData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-[0_0_25px_#14b8a6] transition-all duration-500"
          >
            {/* Degree */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 mb-2">
              {item.degree}
            </h3>

            {/* Institution + Location */}
            <p className="text-gray-300 text-sm sm:text-base mb-1">
              {item.institution} • {item.location}
            </p>

            {/* Year */}
            <p className="text-gray-400 text-xs sm:text-sm mb-3">{item.year}</p>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
