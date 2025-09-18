"use client";

export default function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <shadowMaterial opacity={0.9} />
    </mesh>
  );
}
