import { motion } from "framer-motion"
import { FaWhatsapp, FaPhone, FaEnvelope, FaLinkedin, FaFacebook } from "react-icons/fa"

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-16"
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 mb-12 text-center"
      >
        Contact Me
      </motion.h2>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 sm:gap-12">
        {/* Contact Form */}
        <motion.form
          name="contact"
          method="POST"
          data-netlify="true"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-2xl shadow-lg"
        >
          <input type="hidden" name="form-name" value="contact" />

          <div className="mb-5">
            <label className="block text-gray-200 mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-200 mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-200 mb-2 font-semibold">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg hover:shadow-[0_0_20px_#ec4899] transition"
          >
            Send Message 🚀
          </motion.button>
        </motion.form>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-6 sm:gap-8"
        >
          <p className="text-base sm:text-lg text-gray-200 text-center">
            Or reach me directly through my socials:
          </p>

          <div className="flex flex-wrap gap-5 sm:gap-6 justify-center">
            {[
              { icon: <FaWhatsapp />, link: "https://wa.me/923339048670" },
              { icon: <FaPhone />, link: "tel:+923339048670" },
              { icon: <FaEnvelope />, link: "mailto:masoodahmadkhoro@gmail.com" },
              { icon: <FaLinkedin />, link: "linkedin.com/in/masood-ahmad-079330305" },
              { icon: <FaFacebook />, link: "https://facebook.com/your-profile" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-red-500 text-white text-xl sm:text-2xl shadow-md hover:shadow-[0_0_20px_#f472b6] transition"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
