"use client";

import { motion, Variants } from "framer-motion";

const technologies = [
  {
    name: "HTML",
    logo: "/logos/html.png",
    variants: ["HTML5", "HTML4", "XHTML", "ARIA", "Microdata"],
  },
  {
    name: "CSS",
    logo: "/logos/css.png",
    variants: ["Flexbox", "Grid", "Animations", "Media Queries"],
  },
  {
    name: "JavaScript",
    logo: "/logos/javascript.png",
    variants: ["ES6+", "DOM", "Fetch API", "Async/Await"],
  },
  {
    name: "PHP",
    logo: "/logos/php.png",
    variants: ["OOP PHP", "Laravel Basics", "Sessions", "Forms"],
  },
  {
    name: "Node.js",
    logo: "/logos/node.png",
    variants: ["FS Module", "Events", "Streams", "npm"],
  },
  {
    name: "ReactJS",
    logo: "/logos/react.png",
    variants: ["Hooks", "JSX", "Context API", "React Router"],
  },
  {
    name: "Next.js",
    logo: "/logos/next.png",
    variants: ["Routing", "SSR/SSG", "API Routes", "Dynamic Pages"],
  },
  {
    name: "TypeScript",
    logo: "/logos/typescript.png",
    variants: ["Interfaces", "Generics", "Type Inference"],
  },
  {
    name: "React Native",
    logo: "/logos/reactnative.png",
    variants: ["Components", "Navigation", "AsyncStorage"],
  },
  {
    name: "Expo Go",
    logo: "/logos/expo.png",
    variants: ["Asset Loading", "Push Notifications", "OTA Updates"],
  },
  {
    name: "Three JS",
    logo: "/logos/three.png",
    variants: ["Canvas", "OrbitControls", "GLTF Loader"],
  },
  {
    name: "Electron JS",
    logo: "/logos/electron.png",
    variants: ["Main/Renderer", "IPC", "App Packaging"],
  },
  {
    name: "TailwindCSS",
    logo: "/logos/tailwind.png",
    variants: ["Utility Classes", "Dark Mode", "Responsive"],
  },
  {
    name: "Bootstrap",
    logo: "/logos/bootstrap.png",
    variants: ["Grid System", "Utilities", "Components"],
  },
  {
    name: "Express JS",
    logo: "/logos/express.png",
    variants: ["Routing", "Middleware", "CORS", "JWT"],
  },
  {
    name: "MongoDB",
    logo: "/logos/mongo.png",
    variants: ["Mongoose", "Schemas", "Aggregation"],
  },
  {
    name: "MySQL",
    logo: "/logos/mysql.png",
    variants: ["Joins", "Indexes", "Stored Procedures"],
  },
  {
    name: "Git & GitHub",
    logo: "/logos/git.png",
    variants: ["Branching", "Pull Requests", "CI/CD"],
  },
  {
    name: "REST APIs",
    logo: "/logos/api.png",
    variants: ["CRUD", "Status Codes", "Auth Headers"],
  },
];

const softwareTools = [
  { name: "VS Code", logo: "/logos/vscode.png" },
  { name: "Figma", logo: "/logos/figma.png" },
  { name: "Postman", logo: "/logos/postman.png" },
  { name: "Blender", logo: "/logos/blender.png" },
  { name: "XAMPP", logo: "/logos/xampp.png" },
  { name: "Android Studio", logo: "/logos/androidstudio.png" },
  { name: "Adobe Photoshop", logo: "/logos/photoshop.png" },
  { name: "Adobe Premiere", logo: "/logos/premiere.png" },
  { name: "CapCut", logo: "/logos/capcut.png" },
  { name: "Filmora Go", logo: "/logos/filmora.png" },
  { name: "KineMaster", logo: "/logos/kinemaster.png" },
  { name: "PicsArt", logo: "/logos/picsart.png" },
];

const fadeInUp: Variants = {
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

export default function SkillsSection() {
  return (
    <div className="space-y-20">
      {/* Technologies */}
      <div>
        <h3 className="text-2xl font-bold text-[#E5D8C2] mb-8 text-left">
          Technologies
        </h3>
        <div className="flex flex-wrap gap-4 justify-start">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-44 rounded-xl p-4 backdrop-blur-md bg-white/5 border border-[#E5D8C2]/20 
                        shadow-md hover:shadow-[#E5D8C2]/30 transition-transform hover:-translate-y-1 text-left"
            >
              <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-[#E5D8C2]/10">
                <img
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h4 className="text-base font-semibold text-[#E5D8C2] mb-2">
                {tech.name}
              </h4>
              <ul className="text-xs text-[#E5D8C2]/80 space-y-1">
                {tech.variants?.map((variant, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <span className="text-[#E5D8C2]">▹</span> {variant}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Software & Tools */}
      <div>
        <h3 className="text-2xl font-bold text-[#E5D8C2] mb-8 text-left">
          Software & Tools
        </h3>
        <div className="flex flex-wrap gap-4 justify-start">
          {softwareTools.map((tool, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-40 rounded-xl p-4 backdrop-blur-md bg-white/5 border border-[#E5D8C2]/20 
                        shadow-md hover:shadow-[#E5D8C2]/30 transition-transform hover:-translate-y-1 text-left"
            >
              <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-[#E5D8C2]/10">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h4 className="text-sm font-semibold text-[#E5D8C2]">
                {tool.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
