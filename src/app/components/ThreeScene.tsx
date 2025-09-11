"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { forwardRef, useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import type { ComponentPropsWithoutRef } from "react";

useGLTF.preload("/models/hero3d.glb");

type GroupProps = ComponentPropsWithoutRef<"group">;

const MotionGroup = motion.create(
  forwardRef<THREE.Group, GroupProps>(function MotionGroupBase(props, ref) {
    return <group ref={ref} {...props} />;
  })
);

function Model() {
  const gltf = useGLTF("/models/hero3d.glb");
  const group = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const progress = useRef(0);
  const [introDone, setIntroDone] = useState(false);

  // Enable shadows for model meshes
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

function CinematicLights() {
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
        intensity={0.1} // instead of 0
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

export default function ThreeScene() {
  return (
    <div className="relative w-[50vw] h-[100vh]">
      <Canvas camera={{ position: [0, 2, 7], fov: 50 }}>
        <CinematicLights />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.9} />
        </mesh>

        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
