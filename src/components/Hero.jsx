import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import profileImg from "../assets/images/Masood.png" // ✅ apna path sahi rakho

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 px-6 md:px-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-28 md:pt-32"
    >
      {/* Left: Text Section */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
        {/* Welcome Line */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 leading-tight"
        >
          <TypeAnimation
            sequence={["Welcome to my portfolio", 1000]}
            speed={50}
            cursor={false}
            repeat={0}
          />
        </motion.h2>

        {/* Big Name */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 leading-tight"
        >
          <TypeAnimation
            sequence={["I am Masood Ahmad", 1500]}
            speed={60}
            cursor={false}
            repeat={0}
          />
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-xl text-gray-300 text-sm sm:text-base md:text-lg leading-snug"
        >
          <TypeAnimation
            sequence={[
              "A passionate Mathematics Researcher and Teaching Assistant, exploring ergodic theory, measure theory, and dynamical systems. Skilled in problem solving, logical reasoning, and advancing innovation in education.",
              2000,
            ]}
            speed={40}
            cursor={false}
            repeat={0}
          />
        </motion.p>
      </div>

      {/* Right: Profile Image */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex-1 flex justify-center md:justify-end"
      >
        <div className="relative group">
          {/* Glow Aura */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-2xl opacity-70 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500"></div>

          {/* Profile Image */}
          <img
            src={profileImg}
            alt="Masood Ahmad"
            className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-full border-4 border-white/20 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_50px_#ec4899]"
          />
        </div>
      </motion.div>
    </section>
  )
}
