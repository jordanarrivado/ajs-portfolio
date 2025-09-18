"use client";

import { motion } from "framer-motion";
import Button from "./ui/Button";
import { FaUser, FaLaptopCode, FaFolderOpen } from "react-icons/fa6";

export default function ShortAbout() {
  return (
    <motion.div
      className="
        relative lg:absolute 
        mt-14 lg:mt-0 
        px-4 lg:px-0
        bottom-auto lg:bottom-10 lg:left-10
        w-full lg:w-80 
        text-center lg:text-left
        space-y-2 lg:space-y-4 z-10
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
        <Button title="About Me" href="/about" className="text-[#E5D8C2]">
          <FaUser />
        </Button>
        <Button title="My Projects" href="/projects" className="text-[#E5D8C2]">
          <FaLaptopCode />
        </Button>
        <Button title="My Skills" href="/skills" className="text-[#E5D8C2]">
          <FaFolderOpen />
        </Button>
      </motion.div>
    </motion.div>
  );
}
