"use client";

import { BookShowcaseSection } from "@/components/book3d/BookShowcaseSection";

export function CraftView() {
  return (
    <>
      <BookShowcaseSection state="closed" />
      <BookShowcaseSection state="open" />
      <BookShowcaseSection state="spread" />
    </>
  );
}
