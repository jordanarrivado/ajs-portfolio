interface BtnProps {
  name: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ReadBtn({ name, className, onClick }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-md font-medium transition-colors duration-300 
        border border-[#E5D8C2]/40 
        bg-[#1A1A1A] text-[#E5D8C2] 
        hover:bg-[#E5D8C2] hover:text-[#111111] hover:shadow-md hover:shadow-[#E5D8C2]/20
        ${className}`}
    >
      {name}
    </button>
  );
}
