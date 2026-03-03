"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { BookState } from "./BookModel";

const BookCanvasScene = dynamic(
  () => import("./BookCanvasScene").then((m) => ({ default: m.BookCanvasScene })),
  { ssr: false }
);

interface BookShowcaseSectionProps {
  state: BookState;
}

/**
 * Full-viewport section with centered 3D book. Client-only, no SSR.
 */
export function BookShowcaseSection({ state }: BookShowcaseSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section
        className="h-screen w-full"
        style={{ backgroundColor: "#EAE0D5" }}
        aria-hidden
      />
    );
  }

  return (
    <section
      className="h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: "#EAE0D5" }}
    >
      <div className="h-full w-full">
        <BookCanvasScene state={state} />
      </div>
    </section>
  );
}
