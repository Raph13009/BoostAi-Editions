"use client";

/**
 * BookModel — Hardcover book with three states: closed, open, spread.
 * Delegates to ClosedBookModel (closed/open) and OpenBookSpread (spread).
 */

import { ClosedBookModel } from "./ClosedBookModel";
import { OpenBookSpread } from "./OpenBookSpread";

export type BookState = "closed" | "open" | "spread";

interface BookModelProps {
  state?: BookState;
}

export function BookModel({ state = "closed" }: BookModelProps) {
  if (state === "spread") {
    return <OpenBookSpread />;
  }
  return <ClosedBookModel isOpen={state === "open"} />;
}
