"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MAX_TILT_DEG = 10;
const LERP_FACTOR = 0.08;

export function useMouseTilt() {
  const meshRef = useRef<THREE.Group>(null);
  const targetEuler = useRef(new THREE.Euler(0, 0, 0));
  const currentEuler = useRef(new THREE.Euler(0, 0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      const maxRad = (MAX_TILT_DEG * Math.PI) / 180;
      targetEuler.current.y = x * maxRad;
      targetEuler.current.x = -y * maxRad;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    currentEuler.current.x +=
      (targetEuler.current.x - currentEuler.current.x) * LERP_FACTOR;
    currentEuler.current.y +=
      (targetEuler.current.y - currentEuler.current.y) * LERP_FACTOR;
    meshRef.current.rotation.x = currentEuler.current.x;
    meshRef.current.rotation.y = currentEuler.current.y;
  });

  return meshRef;
}
