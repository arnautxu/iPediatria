import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A subtle, abstract 3D backdrop for the hero.
 * Two soft organic blobs (cyan + magenta) drift slowly behind the editorial layout.
 * Purpose: suggest a sense of life, presence, and care without competing with the type.
 *
 * Why Three.js here and nowhere else:
 *   - The hero is the only place the user lingers long enough to perceive subtle 3D motion.
 *   - It pairs with the cyan/magenta gradient backdrop already present in the brand.
 *   - It's gated behind reduced-motion and pointer:fine to avoid taxing low-end devices.
 */

function Blob({ color, position, scale, speed = 0.3, distort = 0.18 }) {
  const ref = useRef();
  // Pre-shuffle the geometry once for an organic shape
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 24);
    const pos = geo.attributes.position;
    const seed = Math.random() * 100;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const n = Math.sin(x * 1.5 + seed) * Math.cos(y * 1.5 + seed) * Math.sin(z * 1.5 + seed);
      pos.setXYZ(i, x + n * distort * 0.4, y + n * distort * 0.4, z + n * distort * 0.4);
    }
    geo.computeVertexNormals();
    return geo;
  }, [distort]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(t * 0.6) * 0.4;
    ref.current.rotation.y = t * 0.5;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.18;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.1}
          transparent
          opacity={0.85}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color="#EC008C" />
      <pointLight position={[4, 3, 1]} intensity={0.7} color="#00AEEF" />

      <Blob color="#00AEEF" position={[2.6, 0.4, -1]} scale={1.7} speed={0.25} />
      <Blob color="#EC008C" position={[-2.4, -0.5, -1.5]} scale={1.3} speed={0.3} />
    </>
  );
}

export default function HeroScene({ className }) {
  // Skip on touch / coarse pointer devices for performance.
  const enable =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!enable) return null;

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 38 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
