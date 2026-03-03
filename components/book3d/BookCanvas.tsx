"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const BookCanvasScene = dynamic(
  () => import("./BookCanvasScene").then((m) => ({ default: m.BookCanvasScene })),
  { ssr: false }
);

/**
 * Client-only wrapper. Delays rendering of Canvas until after mount to guarantee
 * @react-three/fiber never runs during SSR or initial hydration. Prevents
 * ReactCurrentOwner error from fiber's reconciler executing before React is ready.
 */
function BookCanvasInner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full min-h-screen" aria-hidden />;
  }

  return <BookCanvasScene />;
}

export function BookCanvas() {
  return <BookCanvasInner />;
}

export default BookCanvas;
