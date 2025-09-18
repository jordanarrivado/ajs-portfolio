"use client";

import { technologies } from "../data/Technologies";
import { motion } from "framer-motion";
import { fadeInUp } from "../effects/FadeUp";
import DonutChart from "./Chart";

export default function Technology() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-[#E5D8C2] mb-8 text-center">
        Technologies
      </h3>

      <div className="flex flex-wrap gap-6 justify-center">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-44 rounded-xl p-6 flex flex-col items-center text-center 
               backdrop-blur-md bg-white/5 border border-[#E5D8C2]/20 
               shadow-md hover:shadow-[#E5D8C2]/30 
               transition-transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-[#E5D8C2]/10">
              <img
                src={tech.logo}
                alt={`${tech.name} logo`}
                className="w-7 h-7 object-contain"
              />
            </div>

            <h4 className="text-base font-semibold text-[#E5D8C2] mb-2">
              {tech.name}
            </h4>

            {/* Donut Chart for confidence */}
            <div className="mb-3">
              <DonutChart value={tech.confidence} />
            </div>

            {tech.variants && (
              <ul className="text-xs text-[#E5D8C2]/80 space-y-1 text-center">
                {tech.variants.map((variant, i) => (
                  <li key={i} className="flex items-center justify-left gap-1">
                    <span className="text-[#E5D8C2]">▹</span> {variant}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
