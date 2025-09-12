"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaHome,
  FaLinkedin,
  FaRobot,
} from "react-icons/fa";
import Button from "./ui/Button";

type GithubLink = {
  link: string;
};

export default function Navbar({ link }: GithubLink) {
  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 py-3 bg-surface/90 sticky top-2 z-50">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/icon.png"
          alt="Arrivado, Jordan S."
          width={70}
          height={25}
          priority
          className="w-[60%] sm:w-[70%] h-[80%] sm:h-[20%] ml-2 sm:ml-0"
        />
      </Link>

      {/* Center: Links (hidden on mobile) */}
      <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 gap-4">
        <Button href="/">Portfolio</Button>
        <Button href="/chatbot">Chatbot</Button>
      </div>

      {/* Right: Circle Buttons */}
      <div className="flex gap-2 sm:gap-3 sm:hidden">
        <Button href="/" rounded>
          <FaHome size={20} />
        </Button>
        <Button href="/chatbot" rounded>
          <FaRobot size={20} />
        </Button>
      </div>
      <div className="sm:flex gap-2 sm:gap-3 hidden">
        <Button href="https://github.com/jordanarrivado" rounded>
          <FaGithub size={20} />
        </Button>
        <Button href="https://www.linkedin.com/in/jordan-arrivado" rounded>
          <FaLinkedin size={20} />
        </Button>
      </div>
    </nav>
  );
}
