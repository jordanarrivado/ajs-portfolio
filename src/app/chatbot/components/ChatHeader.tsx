import { Personality } from "../ChatbotBox";

interface Props {
  personality: Personality;
  setPersonality: (p: Personality) => void;
}

export default function ChatHeader({ personality, setPersonality }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#232323] p-4 sm:p-6 rounded-t-3xl border-b border-[#E5D8C2]/20 shadow-inner gap-3 sm:gap-0">
      {/* Title */}
      <h1 className="text-[#E5D8C2] text-lg sm:text-2xl font-extrabold tracking-wider drop-shadow-md text-center sm:text-left">
        Jordan’s Agent
      </h1>

      {/* Personality selector */}
      <div className="relative w-full sm:w-auto">
        <select
          name="personalities"
          className="w-full sm:w-auto appearance-none bg-[#313131] text-[#E5D8C2] text-sm sm:text-base font-medium px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-[#E5D8C2]/30 focus:outline-none focus:ring-2 focus:ring-[#E5D8C2]/60 transition cursor-pointer shadow-md"
          value={personality}
          onChange={(e) => setPersonality(e.target.value as Personality)}
        >
          <option value="" disabled>
            Personality
          </option>
          <option value="Professional">Professional</option>
          <option value="Casual">Casual</option>
          <option value="Funny">Funny</option>
        </select>
      </div>
    </div>
  );
}
