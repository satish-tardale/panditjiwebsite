import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';

function HavanFire() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Base of Havan Kund */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2, 0.4, 2]} />
        <meshStandardMaterial color="#4a2c2a" />
      </mesh>
      
      {/* Fire Effect */}
      <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <coneGeometry args={[0.5, 1.5, 8]} />
          <meshStandardMaterial 
            color="#FF6B00" 
            emissive="#FF4500" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.8} 
          />
        </mesh>
      </Float>

      {/* Glow */}
      <pointLight position={[0, 1, 0]} intensity={2} color="#FF6B00" />
      <Sparkles count={50} scale={3} size={2} speed={0.4} color="#D4AF37" />
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <HavanFire />
        
        <fog attach="fog" args={['#000', 5, 15]} />
      </Canvas>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />
    </div>
  );
}
