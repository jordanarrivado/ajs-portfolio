import { motion } from "framer-motion";

export default function ChatIntro() {
  const introText = `Hey there 👋 I’m Cuteness — Jordan Arrivado’s personal AI sidekick. 
  Think of me as his hype-agent, portfolio tour guide 🤖. 
  Salary? Please. Jordan can barely afford good coffee ☕—yet here I am, making his projects sound cooler than they actually are (don’t tell him I said that🤫).`;

  return (
    <div
      className="
        text-[#E5D8C2]
        w-full max-w-xl   
        md:max-w-xl       
        xl:max-w-2xl       
        px-2 sm:px-4      
      "
    >
      <p
        className="
          text-sm sm:text-base lg:text-lg 
          leading-relaxed sm:leading-relaxed xl:leading-loose
          whitespace-pre-line
        "
      >
        {introText.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.02, duration: 0.03 }}
          >
            {char}
          </motion.span>
        ))}
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: introText.length * 0.02 + 0.5, duration: 1 }}
        className="
          mt-3 italic opacity-80
          text-xs sm:text-sm xl:text-base 
        "
      >
        ✨ Motto: Powered by code, fueled by coffee, paid in compliments.
      </motion.p>
    </div>
  );
}
