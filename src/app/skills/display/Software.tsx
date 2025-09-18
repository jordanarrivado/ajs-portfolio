"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "../effects/FadeUp";
import { softwareTools } from "../data/SoftwareTool";

export default function Software() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-[#E5D8C2] mb-8 text-center">
        Software & Tools
      </h3>

      <div className="flex flex-wrap gap-6 justify-center">
        {softwareTools.map((tool, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-40 rounded-xl p-6 flex flex-col items-center text-center 
                       backdrop-blur-md bg-white/5 border border-[#E5D8C2]/20 
                       shadow-md hover:shadow-[#E5D8C2]/30 
                       transition-transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-[#E5D8C2]/10">
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="w-7 h-7 object-contain"
              />
            </div>

            <h4 className="text-sm font-semibold text-[#E5D8C2]">
              {tool.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
