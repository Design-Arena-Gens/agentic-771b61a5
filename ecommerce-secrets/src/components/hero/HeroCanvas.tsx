'use client';

import { Canvas } from '@react-three/fiber';
import { Float, Html, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

type TileConfig = {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  title: string;
  description: string;
};

const tiles: TileConfig[] = [
  {
    position: [-2.2, 0.4, 0],
    rotation: [-0.3, 0.5, -0.2],
    color: '#6366f1',
    title: 'Automated Funnels',
    description: 'AI-optimized conversion flows',
  },
  {
    position: [1.8, 0.1, -0.5],
    rotation: [0.4, -0.3, 0.2],
    color: '#f97316',
    title: 'Motion Commerce',
    description: '3D product showcases',
  },
  {
    position: [-0.2, -1.8, 0.6],
    rotation: [0.2, 0.5, -0.4],
    color: '#ec4899',
    title: 'Predictive Inventory',
    description: 'Forecast demand in real time',
  },
];

function FloatingTile({ config }: { config: TileConfig }) {
  return (
    <Float speed={2.2} rotationIntensity={0.9} floatIntensity={1.4}>
      <mesh position={config.position} rotation={config.rotation}>
        <boxGeometry args={[2, 1.2, 0.18]} />
        <meshStandardMaterial
          color={config.color}
          roughness={0.2}
          metalness={0.55}
          emissive={config.color}
          emissiveIntensity={0.3}
        />
        <Html distanceFactor={12} position={[0, 0, 0.12]} transform>
          <motion.div
            className="w-48 rounded-xl border border-white/15 bg-slate-900/70 p-4 text-white backdrop-blur-sm shadow-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
              {config.title}
            </p>
            <p className="mt-2 text-xs text-white/90">{config.description}</p>
          </motion.div>
        </Html>
      </mesh>
    </Float>
  );
}

function AuroraRibbon() {
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh position={[0, -3.6, -4]} rotation={[-Math.PI / 3.5, 0, Math.PI / 10]}>
        <planeGeometry args={[14, 6, 64, 64]} />
        <meshStandardMaterial
          color="#0ea5e9"
          transparent
          opacity={0.38}
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function OrbitingOrb({
  radius,
  color,
  speed,
  offset,
}: {
  radius: number;
  color: string;
  speed: number;
  offset: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh position={[Math.cos(offset) * radius, Math.sin(offset) * radius, -1.2]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function GroundGlow() {
  return (
    <mesh position={[0, -2.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[14, 6, 64, 64]} />
      <meshStandardMaterial
        color="#312e81"
        transparent
        opacity={0.38}
        emissive="#6366f1"
        emissiveIntensity={0.45}
      />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <div className="relative h-[520px] w-full">
      <div className="pointer-events-none absolute inset-0 rounded-[36px] border border-white/10 bg-white/2 blur-3xl" />
      <Canvas className="rounded-[36px]" shadows>
        <Suspense fallback={null}>
          <color attach="background" args={['#020617']} />
          <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={52} />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 6, 4]} intensity={1.3} castShadow />
          <AuroraRibbon />
          <GroundGlow />
          <OrbitingOrb radius={2.8} color="#f97316" speed={1.6} offset={1.2} />
          <OrbitingOrb radius={2.1} color="#22d3ee" speed={1.2} offset={2.8} />
          <Stars radius={20} depth={40} count={1300} factor={4} saturation={10} fade speed={1.2} />
          {tiles.map((tile) => (
            <FloatingTile key={tile.title} config={tile} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
