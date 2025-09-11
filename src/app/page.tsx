import Hero from "./components/Hero";
import Shortabout from "./components/Short";
//import Float from "./components/Float";
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
      {/** <Float />*/}
      <Hero />
      <Shortabout />
    </main>
  );
}
