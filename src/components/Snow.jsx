// src/components/Snow.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Snow() {
  const points = useRef();
  
  // Create buffer geometry with vertices
  const bufferGeometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(1000 * 3);
  
  for(let i = 0; i < vertices.length; i += 3) {
    vertices[i] = Math.random() * 100 - 50;     // x
    vertices[i + 1] = Math.random() * 100 - 50; // y
    vertices[i + 2] = Math.random() * 100 - 50; // z
  }
  
  bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
      points.current.position.y -= delta * 2;
      if(points.current.position.y < -50) {
        points.current.position.y = 50;
      }
    }
  });

  return (
    <points ref={points}>
      <primitive object={bufferGeometry} />
      <pointsMaterial size={0.1} color="#ffffff" />
    </points>
  );
}