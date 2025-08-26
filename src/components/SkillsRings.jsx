import { motion } from "framer-motion"

const skills = [
  { name: "MATLAB", level: 85, gradient: "from-pink-500 to-red-500" },
  { name: "Python", level: 70, gradient: "from-yellow-400 to-orange-500" },
  { name: "LaTeX", level: 80, gradient: "from-blue-400 to-indigo-500" },
  { name: "Machine Learning", level: 60, gradient: "from-green-400 to-teal-500" },
]

export default function SkillsBars() {
  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 py-12 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-20"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-teal-400 mb-8 sm:mb-12 text-center"
      >
        Skills
      </motion.h2>

      <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto w-full">
        {skills.map((skill, i) => (
          <div key={i} className="group">
            {/* Title + % */}
            <div className="flex justify-between mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
              <span className="text-gray-300">{skill.name}</span>
              <span className="text-gray-400 group-hover:text-white transition">
                {skill.level}%
              </span>
            </div>

            {/* Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3 md:h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.2 }}
                className={`h-2 sm:h-3 md:h-4 rounded-full bg-gradient-to-r ${skill.gradient} shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
