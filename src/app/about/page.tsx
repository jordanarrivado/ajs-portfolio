"use client";
import { motion } from "framer-motion";
import { Code2, Wrench, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="p-10 relative">
      {/* Heading with animated underline */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#E5D8C2] relative inline-block"
      >
        About Me
        <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-[#E5D8C2] to-transparent rounded-full" />
      </motion.h1>

      {/* Intro paragraph */}
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-gray-300 max-w-2xl leading-relaxed"
      >
        Hi, I’m{" "}
        <span className="font-semibold text-[#E5D8C2]">Jordan Arrivado</span>, a
        recent graduate and aspiring <strong>Web/Software Developer</strong>{" "}
        passionate about building clean, modern, and user-friendly applications.
      </motion.p>

      {/* Paragraphs with stagger */}
      <div className="mt-6 space-y-6 max-w-2xl">
        {[
          {
            icon: <Code2 className="w-5 h-5 text-[#E5D8C2]" />,
            text: "Although I don’t have professional work experience yet, I’ve completed several projects that allowed me to apply my knowledge, solve problems, and deliver results I’m proud of. I also learned how to structure applications, understand different architectures, organize file structures, and follow best practices that keep code scalable and maintainable.",
          },
          {
            icon: <Wrench className="w-5 h-5 text-[#E5D8C2]" />,
            text: "Aside from coding, I can do basic troubleshooting and provide technical support. I value continuous learning, collaboration, and adaptability, which I’m excited to apply in my first professional role.",
          },
          {
            icon: <Rocket className="w-5 h-5 text-[#E5D8C2]" />,
            text: "My goal is to keep growing as a developer, improving my skills, learning from every experience, and working with others to create projects that are meaningful, helpful, and something I can truly be proud of.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + idx * 0.2 }}
            className="flex items-start gap-3"
          >
            {item.icon}
            <p className="text-gray-400 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-10"
      >
        <a
          href="/projects"
          className="px-6 py-3 bg-[#E5D8C2] text-black font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all"
        >
          View My Projects →
        </a>
      </motion.div>
    </section>
  );
}
