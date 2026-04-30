import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

/**
 * NavPulse — a tiny living mark next to the logo.
 * A glowing organic sphere that pulses gently. Acts as the brand mnemonic
 * (Ogilvy: "create a mnemonic"). Visually conveys "alive, online, ready".
 *
 * Only rendered on the home page where Three.js is already loaded for the hero.
 * On legal pages or reduced-motion, a pure-CSS dot is used instead.
 */
function PulseCore() {
  const meshRef = useRef();
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Gentle breathing scale (1.5s cycle)
    const s = 1 + Math.sin(t * 1.4) * 0.12;
    meshRef.current.scale.setScalar(s);
    // Slow rotation gives 3D depth cue
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    // Magenta light orbits to create shifting highlight
    if (lightRef.current) {
      lightRef.current.position.x = Math.cos(t * 0.6) * 1.8;
      lightRef.current.position.y = Math.sin(t * 0.6) * 1.8;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.65, 3]} />
      <meshStandardMaterial
        color="#00AEEF"
        emissive="#00AEEF"
        emissiveIntensity={0.6}
        roughness={0.35}
        metalness={0.15}
      />
    </mesh>
  );
}

function Lights() {
  const lightRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (lightRef.current) {
      lightRef.current.position.x = Math.cos(t * 0.6) * 1.8;
      lightRef.current.position.y = Math.sin(t * 0.6) * 1.8;
    }
  });
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[1.5, 1.5, 2]} intensity={1.2} color="#ffffff" />
      <pointLight ref={lightRef} position={[-1.5, -1, 2]} intensity={1.6} color="#EC008C" />
    </>
  );
}

export default function NavPulse({ size = 22 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 2.4], fov: 35 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <Lights />
        <PulseCore />
      </Canvas>
    </div>
  );
}
