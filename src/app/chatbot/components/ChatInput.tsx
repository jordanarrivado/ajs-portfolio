interface Props {
  message: string;
  setMessage: (v: string) => void;
  sendMessage: () => void;
  loading: boolean;
}

export default function ChatInput({
  message,
  setMessage,
  sendMessage,
  loading,
}: Props) {
  return (
    <div className="flex items-center border-t border-[#E5D8C2]/20 px-3 sm:px-5 py-3 sm:py-6 bg-[#232323] rounded-b-3xl gap-2">
      <input
        className="flex-1 px-3 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#313131] text-white placeholder-[#E5D8C2]/70 focus:outline-none focus:ring-2 focus:ring-[#E5D8C2]/60 shadow-inner text-sm sm:text-base"
        placeholder="Ask about me..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        disabled={loading}
      />
      <button
        onClick={sendMessage}
        disabled={loading || !message.trim()}
        className="shrink-0 text-lg sm:text-xl font-bold text-[#232323] bg-[#E5D8C2] py-2 sm:py-3 px-4 sm:px-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "..." : "➤"}
      </button>
    </div>
  );
}
