export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-4 sm:py-6 text-center font-medium text-xs sm:text-sm text-[#232323] bg-[#E5D8C2] mt-10">
      © {new Date().getFullYear()}{" "}
      <span className="font-semibold">Jordan Arrivado</span>. All rights
      reserved.
    </footer>
  );
}
