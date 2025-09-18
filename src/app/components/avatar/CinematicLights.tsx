"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CinematicLights() {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((_, delta) => {
    if (lightRef.current && lightRef.current.intensity < 0.8) {
      lightRef.current.intensity += delta * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={0.1}
        castShadow
      />
      <spotLight
        position={[-5, 8, -5]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.3}
        color={"#232323"}
        castShadow
      />
    </>
  );
}
