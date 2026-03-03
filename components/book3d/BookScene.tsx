"use client";

import { BookModel, type BookState } from "./BookModel";
import { ContactShadows, OrbitControls } from "@react-three/drei";

interface BookSceneProps {
  state?: BookState;
}

export function BookScene({ state = "closed" }: BookSceneProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-4, 4, -3]} intensity={0.3} color="#fff5eb" />

      <BookModel state={state} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.8}
      />

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.22}
        scale={12}
        blur={2}
        far={4}
      />
    </>
  );
}
