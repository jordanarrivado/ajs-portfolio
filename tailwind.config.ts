import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        smallest: "320px",
        xs: "475px",
      },
      colors: {
        background: "#0f0f0f", 
        surface: "#1a1a1a", 
        accent: {
          purple: "#8b5cf6", 
          pink: "#ec4899",   
          blue: "#3b82f6",   
        },
        text: {
          primary: "#E5D8C2",
          secondary: "#000000",
          dark: "#1a1a1a", 
          muted: "#9ca3af",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
