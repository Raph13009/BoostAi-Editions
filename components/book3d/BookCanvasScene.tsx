"use client";

import { memo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { BookScene } from "./BookScene";
import type { BookState } from "./BookModel";

interface BookCanvasSceneProps {
  state?: BookState;
}

/**
 * Isolated Canvas + Scene. Loaded only after client mount via dynamic import.
 */
function BookCanvasSceneInner({ state = "closed" }: BookCanvasSceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        camera={{
          position: [2.0, 1.6, 3.8],
          fov: 40,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        frameloop="always"
        shadows
      >
        <Suspense fallback={null}>
          <BookScene state={state} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export const BookCanvasScene = memo(BookCanvasSceneInner);
