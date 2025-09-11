"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CurveCarousel() {
  const images = Array.from({ length: 7 }, (_, i) => ({
    src: "/qwe.webp",
    alt: `Project ${i + 1}`,
    id: i,
  }));

  const [angle, setAngle] = useState(0);

  // auto rotate every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev - 360 / images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="relative w-[600px] h-[400px] mx-auto mt-20"
      style={{ perspective: "1400px" }}
    >
      <div
        className="w-full h-full relative transition-transform duration-1000 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `translateZ(-450px) rotateY(${angle}deg)`,
        }}
      >
        {images.map((img, i) => {
          const step = 360 / images.length;
          const itemAngle = i * step;

          // figure out how close each item is to "front" (0deg)
          const relative = (((angle + itemAngle) % 360) + 360) % 360;
          const distanceFromFront = Math.min(relative, 360 - relative);

          // emphasize front image
          const isFront = distanceFromFront < step / 2;

          return (
            <div
              key={img.id}
              className="absolute w-[220px] h-[220px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(450px) rotateY(-12deg)`,
                opacity: isFront ? 1 : 0.25,
                filter: isFront ? "blur(0px)" : "blur(4px)",
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={220}
                height={220}
                className={`rounded-xl shadow-xl transition-all duration-700 ${
                  isFront ? "scale-110" : "scale-90"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
