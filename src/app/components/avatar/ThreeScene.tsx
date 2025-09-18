"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import CinematicLights from "./CinematicLights";
import Model from "./Model";
import Ground from "./Ground";

export default function ThreeScene() {
  return (
    <div className="relative w-[60vw] h-[45vh] md:w-[50vw] md:h-[100vh]">
      <Canvas camera={{ position: [0, 2, 7], fov: 50 }}>
        <CinematicLights />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <Ground />
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
