"use client";

import { motion } from "framer-motion";

export default function ShortAbout() {
  return (
    <motion.div
      className="absolute bottom-10 left-10 w-80 text-left space-y-4 Z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Name */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold tracking-tight"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        Hi I’m <span className="text-brand">Jordan Arrivado</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        className="text-lg md:text-xl text-gray-400"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        Web Developer / Software Engineer
      </motion.h2>

      {/* Short bio */}
      <motion.p
        className="text-gray-400 leading-relaxed"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      >
        I enjoy turning ideas into functional, user-friendly apps, and I love
        building seamless digital experiences with a clean, modern look.
      </motion.p>
    </motion.div>
  );
}
