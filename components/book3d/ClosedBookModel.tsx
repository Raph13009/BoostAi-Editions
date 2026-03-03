"use client";

/**
 * Closed or single-cover-open book. Clean geometry.
 */

import { useRef, useMemo } from "react";
import { Mesh } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { EngravedLogo } from "./EngravedLogo";

const PAGES_COLOR = "#EAE0D5";
const COVER_COLOR = "#5E503F";

const OPEN_ANGLE_RAD = (155 * Math.PI) / 180;
const BOOK_SCALE = 0.56;
const CORNER_RADIUS = 0.03;
const BEVEL_SEGMENTS = 2;

const BOOK = {
  width: 3,
  height: 0.5,
  depth: 4,
  coverOverhang: 0.06,
  pagesInset: 0.03,
  coverThickness: 0.04,
  spineWidth: 0.07,
  hingeGap: 0.01,
} as const;

interface ClosedBookModelProps {
  isOpen?: boolean;
}

export function ClosedBookModel({ isOpen = false }: ClosedBookModelProps) {
  const pagesW = BOOK.width - BOOK.pagesInset * 2;
  const pagesH = BOOK.height - BOOK.pagesInset * 2;
  const pagesD = BOOK.depth;
  const coverW = BOOK.width + BOOK.coverOverhang * 2;
  const coverH = BOOK.height + BOOK.coverOverhang * 2;
  const coverD = BOOK.depth + BOOK.coverOverhang * 2;
  const coverThick = BOOK.coverThickness;
  const spineW = BOOK.spineWidth;
  const pageRadius = Math.min(pagesW, pagesH, pagesD) * 0.1;

  const pagesGeo = useMemo(
    () => new RoundedBoxGeometry(pagesW, pagesH, pagesD, BEVEL_SEGMENTS, pageRadius),
    [pagesW, pagesH, pagesD, pageRadius]
  );
  const coverGeo = useMemo(
    () => new RoundedBoxGeometry(coverW, coverThick, coverD, BEVEL_SEGMENTS, CORNER_RADIUS),
    [coverW, coverThick, coverD]
  );
  const spineGeo = useMemo(
    () => new RoundedBoxGeometry(spineW, coverH, coverD, BEVEL_SEGMENTS, CORNER_RADIUS * 0.7),
    [spineW, coverH, coverD]
  );

  return (
    <group scale={BOOK_SCALE}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow geometry={pagesGeo}>
        <meshStandardMaterial color={PAGES_COLOR} roughness={0.88} metalness={0} />
      </mesh>

      <group
        position={[-BOOK.width / 2 - BOOK.hingeGap / 2, BOOK.height / 2 + coverThick / 2, 0]}
        rotation={[0, 0, isOpen ? OPEN_ANGLE_RAD : 0]}
      >
        <mesh
          position={[BOOK.width / 2 + BOOK.hingeGap / 2, 0, 0]}
          castShadow
          receiveShadow
          geometry={coverGeo}
        >
          <meshStandardMaterial color={COVER_COLOR} roughness={0.9} metalness={0} />
        </mesh>
        <EngravedLogo coverD={coverD} />
      </group>

      <mesh
        position={[0, -BOOK.height / 2 - coverThick / 2, 0]}
        castShadow
        receiveShadow
        geometry={coverGeo}
      >
        <meshStandardMaterial color={COVER_COLOR} roughness={0.9} metalness={0} />
      </mesh>

      <mesh
        position={[-BOOK.width / 2 - spineW / 2 - BOOK.coverOverhang * 0.5, 0, 0]}
        castShadow
        receiveShadow
        geometry={spineGeo}
      >
        <meshStandardMaterial color={COVER_COLOR} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}
