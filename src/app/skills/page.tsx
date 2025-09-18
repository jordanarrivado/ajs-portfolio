import SkillsSection from "./SkillsSection";

export const metadata = {
  title: "My Skills | Jordan Arrivado",
  description:
    "Explore my technical skills, frameworks, tools, and software expertise.",
  keywords: [
    "Skills",
    "Technologies",
    "Software",
    "Portfolio",
    "Jordan Arrivado",
  ],
};

export default function SkillsPage() {
  return (
    <section id="skills" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        {/* Section Title */}
        <h1 className="text-4xl font-bold text-[#E5D8C2] relative inline-block">
          My Skills
          <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-[#E5D8C2] to-transparent rounded-full" />
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[#E5D8C2]/80 max-w-2xl mt-5 mb-10 text-center leading-relaxed">
          A blend of technologies, frameworks, and tools I use to craft clean,
          modern, and seamless digital experiences.
        </p>

        {/* Skills Content */}
        <SkillsSection />
      </div>
    </section>
  );
}
