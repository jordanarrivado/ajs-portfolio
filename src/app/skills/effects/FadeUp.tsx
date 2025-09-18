import { Variants } from "framer-motion";
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.06,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};
