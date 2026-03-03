"use client";

/**
 * Fully open book — dedicated geometry.
 * V-shaped pages, curved spine, natural tension.
 * NOT a rotated closed book.
 */

import { useMemo } from "react";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import * as THREE from "three";

const PAGES_COLOR = "#EAE0D5";
const COVER_COLOR = "#5E503F";

const BOOK_SCALE = 0.56;
const CORNER_RADIUS = 0.02;

const BOOK = {
  width: 3,
  height: 0.5,
  depth: 4,
  coverOverhang: 0.06,
  coverThickness: 0.04,
  spineRadius: 0.04,
  pageLayers: 16,
  spreadAngle: Math.PI * 0.82,
} as const;

export function OpenBookSpread() {
  const halfAngle = BOOK.spreadAngle / 2;
  const pageRadial = BOOK.width / 2 - 0.08;
  const pageSpine = BOOK.depth - 0.08;

  const spineGeo = useMemo(() => {
    return new THREE.CylinderGeometry(
      BOOK.spineRadius,
      BOOK.spineRadius * 1.05,
      BOOK.depth + BOOK.coverOverhang,
      12,
      1,
      false,
      Math.PI / 2 - halfAngle,
      halfAngle * 2
    );
  }, []);

  const coverGeo = useMemo(
    () =>
      new RoundedBoxGeometry(
        BOOK.width + BOOK.coverOverhang,
        BOOK.coverThickness,
        BOOK.depth + BOOK.coverOverhang,
        1,
        CORNER_RADIUS
      ),
    []
  );

  return (
    <group scale={BOOK_SCALE}>
      {/* Curved spine — central cylinder segment */}
      <mesh
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
        geometry={spineGeo}
      >
        <meshStandardMaterial color={COVER_COLOR} roughness={0.9} metalness={0} side={2} />
      </mesh>

      {/* Left page stack — V fan, vertical planes along spine (Z) */}
      {Array.from({ length: BOOK.pageLayers }).map((_, i) => {
        const t = (i + 0.5) / BOOK.pageLayers;
        const angle = halfAngle * (0.15 + t * 0.85);
        const dist = pageRadial * (0.4 + t * 0.55);
        const x = -Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        return (
          <mesh
            key={`l-${i}`}
            position={[x, y, 0]}
            rotation={[Math.PI / 2, 0, -angle]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[pageRadial * 0.9, pageSpine]} />
            <meshStandardMaterial
              color={PAGES_COLOR}
              roughness={0.88}
              metalness={0}
              side={2}
            />
          </mesh>
        );
      })}

      {/* Right page stack — mirrored V */}
      {Array.from({ length: BOOK.pageLayers }).map((_, i) => {
        const t = (i + 0.5) / BOOK.pageLayers;
        const angle = halfAngle * (0.15 + t * 0.85);
        const dist = pageRadial * (0.4 + t * 0.55);
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        return (
          <mesh
            key={`r-${i}`}
            position={[x, y, 0]}
            rotation={[Math.PI / 2, 0, angle]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[pageRadial * 0.9, pageSpine]} />
            <meshStandardMaterial
              color={PAGES_COLOR}
              roughness={0.88}
              metalness={0}
              side={2}
            />
          </mesh>
        );
      })}

      {/* Left cover — flat, hinged at spine */}
      <mesh
        position={[
          -Math.cos(halfAngle) * (BOOK.width + BOOK.coverOverhang) / 2,
          Math.sin(halfAngle) * (BOOK.width + BOOK.coverOverhang) / 2,
          0,
        ]}
        rotation={[Math.PI / 2, 0, -halfAngle]}
        castShadow
        receiveShadow
        geometry={coverGeo}
      >
        <meshStandardMaterial color={COVER_COLOR} roughness={0.9} metalness={0} />
      </mesh>

      {/* Right cover */}
      <mesh
        position={[
          Math.cos(halfAngle) * (BOOK.width + BOOK.coverOverhang) / 2,
          Math.sin(halfAngle) * (BOOK.width + BOOK.coverOverhang) / 2,
          0,
        ]}
        rotation={[Math.PI / 2, 0, halfAngle]}
        castShadow
        receiveShadow
        geometry={coverGeo}
      >
        <meshStandardMaterial color={COVER_COLOR} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}
