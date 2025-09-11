export const metadata = {
  title: "My Projects | Jordan Arrivado",
  description:
    "Showcase of my web, mobile, and software projects built with modern technologies.",
  keywords: ["Projects", "Portfolio", "Web Development", "React", "Next.js"],
};

export default function ProjectsPage() {
  return (
    <section className="p-10">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Portfolio Website</h2>
          <p className="text-gray-400">
            A modern personal portfolio built with Next.js & Tailwind CSS.
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">AI Reviewer App</h2>
          <p className="text-gray-400">
            SmartReviewr – AI-powered study and quiz generator.
          </p>
        </div>
      </div>
    </section>
  );
}
