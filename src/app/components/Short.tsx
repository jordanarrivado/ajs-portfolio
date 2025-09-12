"use client";

import { motion } from "framer-motion";
import Button from "./ui/Button";

export default function ShortAbout() {
  return (
    <motion.div
      className="
        relative sm:absolute 
        mt-14 sm:mt-0 
        px-4 sm:px-0
        bottom-auto sm:bottom-10 sm:left-10
        w-full sm:w-80 
        text-center sm:text-left
        space-y-2 sm:space-y-4 z-10
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Name */}
      <motion.h1
        className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        Hi I’m <span className="text-brand">Jordan Arrivado</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        className="text-sm sm:text-lg md:text-xl text-gray-400"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        Web Developer / Software Engineer
      </motion.h2>

      {/* Short bio */}
      <motion.p
        className="text-xs sm:text-base text-gray-400 leading-relaxed"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      >
        I enjoy turning ideas into functional, user-friendly apps, and I love
        building seamless digital experiences with a clean, modern look.
      </motion.p>

      {/* Buttons (only mobile) */}
      <motion.div className="flex flex-row gap-3 justify-center sm:hidden">
        <Button href="/123">Projects</Button>
        <Button href="/123">My Skills</Button>
      </motion.div>
    </motion.div>
  );
}
