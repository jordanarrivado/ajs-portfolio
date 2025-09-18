"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ThreeScene from "./ThreeScene";
export default function Hero() {
  return (
    <section className="grid place-items-center h-[90vh] relative top-10 sm:top-[-20]">
      <motion.div
        initial={{ opacity: 0.2, y: -110, scale: 1.2, filter: "blur(15px)" }}
        animate={{ opacity: 0.7, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeIn" }}
        className="row-start-1 col-start-1 z-0"
      >
        <Image
          src="/AJS.png"
          alt="Arrivado, Jordan S."
          width={750}
          height={500}
          priority
        />
      </motion.div>

      {/* Foreground Hero (delayed, slide from right) */}
      <div className="z-10 row-start-1 col-start-1">
        <ThreeScene />
      </div>
    </section>
  );
}
