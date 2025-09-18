import { projects } from "./ProjectData";
import Button from "../../components/ui/Button";
export default function DisplayData() {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => {
        const Icon = project.icon;
        return (
          <div
            key={project.id}
            className="bg-[#1A1A1A] rounded-xl shadow-md border border-gray-800 hover:shadow-lg hover:shadow-[#E5D8C2]/30 transition flex flex-col p-6 min-h-[380px]"
          >
            {/* Year */}
            <span className="text-xs text-[#E5D8C2]/70 mb-2">
              {project.year}
            </span>

            {/* Icon */}
            <div className="mb-4 text-[#E5D8C2] bg-[#E5D8C2]/10 p-4 rounded-full w-fit">
              <Icon size={40} strokeWidth={1.6} />
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-white mb-2">
              {project.title}
            </h2>

            {/* Short Desc */}
            <p className="text-gray-400 text-sm mb-4">{project.desc}</p>

            {/* Tech Stack */}
            <div className="text-left mb-3">
              <h3 className="text-xs text-[#E5D8C2]/80 uppercase tracking-wide mb-1">
                Tech Stack
              </h3>
              <p className="text-gray-500 text-xs">{project.tech.join(", ")}</p>
            </div>

            {/* Features */}
            <div className="text-left mb-3">
              <h3 className="text-xs text-[#E5D8C2]/80 uppercase tracking-wide mb-1">
                Features
              </h3>
              <ul className="list-disc list-inside text-gray-500 text-xs space-y-1">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {/* Deployment */}
            <div className="text-left mb-6">
              <h3 className="text-xs text-[#E5D8C2]/80 uppercase tracking-wide mb-1">
                Deployment
              </h3>
              <p className="text-gray-500 text-xs">{project.deployment}</p>
            </div>

            {/* Button */}
            <Button href={project.url}>Live Demo</Button>
          </div>
        );
      })}
    </div>
  );
}
