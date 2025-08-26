import { motion } from "framer-motion"

export default function AboutMe() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-br from-gray-950 via-black to-gray-900 py-12 sm:py-16 md:py-20"
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-red-800 to-yellow-900 mb-6 sm:mb-8 text-center"
      >
        About Me
      </motion.h2>

      {/* Content */}
      <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.02 }}
          className="p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-[0_0_25px_#ec4899] transition-all duration-500 text-center md:text-left"
        >
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-3 sm:mb-4">
            I am{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500">
              Masood Ahmad
            </span>
            , a dedicated{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
              Mathematician
            </span>{" "}
            with a passion for research and discovery. My academic focus lies in{" "}
            <span className="italic text-pink-400">Measure Theory</span>,{" "}
            <span className="italic text-purple-400">Ergodic Theory</span>, and{" "}
            <span className="italic text-blue-400">advanced problem-solving</span>.
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-3 sm:mb-4">
            I also explore{" "}
            <span className="text-cyan-400 font-semibold">Dynamical System</span> and{" "}
            <span className="text-indigo-400 font-semibold">Group theory</span>, 
            combining mathematical principles with computational techniques to address real-world challenges.
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
            I possess strong{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              problem-solving
            </span>{" "}
            and{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500">
              logical reasoning
            </span>{" "}
            skills, with experience in{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
              teaching, research, and critical analysis
            </span>. 
          </p>
        </motion.div>
      </div>
    </section>
  )
}
