"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MotionGroup from "./MotionGroup";

useGLTF.preload("/models/hero3d.glb");

export default function Model() {
  const gltf = useGLTF("/models/hero3d.glb");
  const group = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const progress = useRef(0);
  const [introDone, setIntroDone] = useState(false);

  // Enable shadows
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate rotation
  useFrame((_, delta) => {
    if (!group.current) return;

    if (!introDone) {
      progress.current += delta * 0.5;
      const t = Math.min(progress.current, 1);
      group.current.rotation.y = THREE.MathUtils.lerp(Math.PI, 0, t);

      if (t >= 1) setIntroDone(true);
    } else {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.x * 0.5,
        0.05
      );
    }
  });

  return (
    <MotionGroup
      ref={group}
      initial={{ scale: 0.2, y: -3 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <primitive object={gltf.scene} scale={2.7} position={[0, -3, 0]} />
    </MotionGroup>
  );
}
