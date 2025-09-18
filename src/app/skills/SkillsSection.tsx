import Technology from "./display/Technology";
import Software from "./display/Software";
import Deployment from "./display/Deployment";

export default function SkillsSection() {
  return (
    <div className="space-y-20">
      <Technology />
      <Software />
      <Deployment />
    </div>
  );
}
