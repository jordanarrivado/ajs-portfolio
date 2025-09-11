import SkillsSection from "./SkillsSection";

export const metadata = {
  title: "My Skills | Jordan Arrivado",
  description:
    "Explore my technical skills, frameworks, tools, and software expertise.",
  keywords: ["Skills", "Technologies", "Software", "Portfolio"],
};

export default function SkillsPage() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold mb-8 text-[#E5D8C2] tracking-wide text-left">
          My <span className="text-[#E5D8C2]">Skills</span>
        </h2>
        <p className="text-lg text-[#E5D8C2]/80 max-w-2xl mb-16 text-left">
          A blend of technologies and tools I use to build clean, modern, and
          seamless digital experiences.
        </p>
        <SkillsSection />
      </div>
    </section>
  );
}
