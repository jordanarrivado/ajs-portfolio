"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { forwardRef, useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import type { ComponentPropsWithoutRef } from "react";

useGLTF.preload("/models/cuteRobot.glb");

type GroupProps = ComponentPropsWithoutRef<"group">;

const MotionGroup = motion.create(
  forwardRef<THREE.Group, GroupProps>(function MotionGroupBase(props, ref) {
    return <group ref={ref} {...props} />;
  })
);

function Model({ onYChange }: { onYChange: (y: number) => void }) {
  const gltf = useGLTF("/models/cuteRobot.glb");
  const group = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const progress = useRef(0);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    if (!introDone) {
      progress.current += delta * 0.5;
      const t = Math.min(progress.current, 1);
      group.current.position.y = THREE.MathUtils.lerp(-5, 0, t);
      if (t >= 1) setIntroDone(true);
    } else {
      // Floating
      const y = Math.sin(clock.getElapsedTime() * 1.5) * 0.15;
      group.current.position.y = y;
      onYChange(y);

      // Sway with mouse
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
      initial={{ scale: 0.2, y: -5 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <primitive object={gltf.scene} scale={2.3} position={[0, -2.5, 0]} />
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
        intensity={0.1}
        castShadow
      />
      {/* Ground glow spotlight */}
      <spotLight
        position={[0, 3, 0]}
        angle={0.6}
        penumbra={0.7}
        intensity={1.2}
        color={"#80CBFA"} // sci-fi glow
        castShadow
      />
    </>
  );
}

export default function MiniRobot() {
  const [shadowScale, setShadowScale] = useState(1);

  return (
    <div className="relative w-[25vw] h-[80vh] mb-10 sm:flex flex-col items-center hidden">
      <Canvas camera={{ position: [0, 2, 7], fov: 50 }}>
        <CinematicLights />

        <Suspense fallback={null}>
          <Model
            onYChange={(y) => {
              // y ranges about -0.15 to +0.15
              // Map it so: low y → scale = 1.2, high y → scale = 0.8
              const minY = -0.15;
              const maxY = 0.15;
              const minScale = 1.2;
              const maxScale = 0.8;

              const t = (y - minY) / (maxY - minY); // normalize 0..1
              const scale = minScale + (maxScale - minScale) * t;

              setShadowScale(scale);
            }}
          />
        </Suspense>

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.35} />
        </mesh>

        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Shadow span */}
      <span
        style={{
          transform: `scale(${shadowScale}, ${shadowScale * 0.4})`,
          transition: "transform 0.05s linear", // faster to feel more synced
        }}
        className="absolute bottom-4 w-24 h-6 bg-black/40 rounded-full blur-md"
      />
    </div>
  );
}
