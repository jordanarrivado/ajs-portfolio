import { motion } from "framer-motion";

interface Props {
  msg: { role: "user" | "assistant"; content: string };
}

export default function MessageBubble({ msg }: Props) {
  return (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl max-w-[85%] sm:max-w-[75%] break-words transition-all duration-300 text-sm sm:text-base leading-relaxed ${
          msg.role === "user"
            ? "bg-[#E5D8C2] text-[#232323] rounded-br-none shadow-md hover:shadow-lg"
            : "bg-gradient-to-br from-[#2c271f]/90 to-[#1c1c1c]/80 backdrop-blur-md text-[#E5D8C2] border border-[#E5D8C2]/40 rounded-bl-none shadow-inner hover:border-[#E5D8C2]/70"
        }`}
      >
        {msg.role === "assistant" ? (
          <p>
            {msg.content.split("").map((char, i) => (
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
        ) : (
          msg.content
        )}
      </div>
    </div>
  );
}
