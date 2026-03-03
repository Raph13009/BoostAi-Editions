"use client";

/**
 * Engraved logo — SVG shape extruded into cover.
 * Embedded look via recessed position + darker material.
 */

import { useMemo } from "react";
import { ExtrudeGeometry } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const COVER_COLOR = "#5E503F";
const ENGRAVE_COLOR = "#3A2F24";

/** Logo shape — from brand/logo-black.svg, viewBox 0 0 256 256 */
const LOGO_SVG = `
<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <path d="M230.704 99.2a4.004 4.004 0 0 0-4.01-3.995h-50.981c-2.215 0-5.212-1.327-6.693-2.964L155.289 77.08c-17.795-19.65-41.628-16.256-53.234 7.58l-38.736 79.557C60.42 170.172 52.705 175 46.077 175H29.359a3.996 3.996 0 0 0-3.994 3.995v10.01A4 4 0 0 0 29.372 193h24.7c8.835 0 19.208-6.395 23.174-14.293l43.645-86.914c3.964-7.894 12.233-9.228 18.473-2.974l17.184 17.219c3.123 3.13 9.242 5.667 13.647 5.667H226.7a4.005 4.005 0 0 0 4.004-3.994v-8.512z" fill-rule="evenodd"/>
</svg>
`;

interface EngravedLogoProps {
  coverD: number;
}

const COVER_WIDTH = 3;
const HINGE_GAP = 0.01;

export function EngravedLogo({ coverD }: EngravedLogoProps) {
  const logoGeo = useMemo(() => {
    const loader = new SVGLoader();
    const svgData = loader.parse(LOGO_SVG);
    const paths = svgData.paths;
    if (!paths.length) return null;
    const shape = paths[0].toShapes(true)[0];
    if (!shape) return null;
    return new ExtrudeGeometry(shape, {
      depth: 0.006,
      bevelEnabled: true,
      bevelThickness: 0.001,
      bevelSize: 0.001,
      bevelSegments: 2,
      curveSegments: 8,
    });
  }, []);

  if (!logoGeo) return null;

  const s = 0.32 / 256;

  return (
    <mesh
      position={[
        COVER_WIDTH / 2 + HINGE_GAP / 2 - 0.2,
        0,
        coverD / 2 - 0.002,
      ]}
      scale={[s, s, -1]}
      geometry={logoGeo}
    >
      <meshStandardMaterial
        color={ENGRAVE_COLOR}
        roughness={0.95}
        metalness={0}
      />
    </mesh>
  );
}
