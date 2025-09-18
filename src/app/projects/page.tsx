import DisplayData from "./components/DisplayData";
import { projectsMetadata } from "./components/projectsMetadata";

export const metadata = projectsMetadata;

export default function ProjectsPage() {
  return (
    <section className="p-10 bg-[#111111] min-h-screen">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-[#E5D8C2]">
        Projects
      </h1>
      <p className="text-gray-400 text-center mt-2">
        A showcase of apps, websites, and software I built.
      </p>

      {/* Grid */}
      <DisplayData />
    </section>
  );
}
