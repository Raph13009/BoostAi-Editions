"use client";

import { useRef, useEffect, useState } from "react";

const VIDEO_SRC = "/video/video-book-section.mp4";
const SCROLL_RANGE_VH = 100;

const ARTICLES = [
  {
    tag: "Strategy",
    title: "Designing systems that think ahead",
    description:
      "How intentional architecture creates products that scale with clarity.",
  },
  {
    tag: "Craft",
    title: "The discipline of quiet interfaces",
    description:
      "Why restraint in design is the hardest — and most impactful — skill.",
  },
  {
    tag: "Execution",
    title: "From spark to structure",
    description:
      "Turning abstract ideas into tangible, lasting digital products.",
  },
];

export function CandleIgnitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoadedMetadata = () => setDuration(video.duration);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    if (video.readyState >= 1) setDuration(video.duration);
    return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || duration <= 0) return;

    const update = () => {
      const scrollRange = SCROLL_RANGE_VH * window.innerHeight * 0.01;
      const rect = container.getBoundingClientRect();

      if (rect.top > 0) {
        video.currentTime = 0;
        setScrollProgress(0);
        rafRef.current = null;
        return;
      }

      const scrollPast = -rect.top;
      const progress = Math.min(1, Math.max(0, scrollPast / scrollRange));
      setScrollProgress(progress);
      const targetTime = progress * duration;
      if (Math.abs(video.currentTime - targetTime) > 0.03) {
        video.currentTime = targetTime;
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [duration]);

  const textReveal = Math.min(1, Math.max(0, (scrollProgress - 0.12) / 0.35));

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${100 + SCROLL_RANGE_VH}vh` }}
    >
      <section
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          transition: "filter 900ms cubic-bezier(0.33, 1, 0.68, 1)",
          filter: scrollProgress > 0.1 ? "brightness(1.04)" : "brightness(1)",
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 z-0 h-full w-full object-cover object-top"
          aria-hidden
          style={{ contain: "paint" }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-[1] bg-[#EAE0D5]/40" aria-hidden />

        <div className="relative z-10 flex w-full max-w-6xl flex-1 items-center justify-between gap-6 px-6 lg:gap-12">
          <div
            className="flex max-w-[280px] flex-col text-left"
            style={{
              opacity: textReveal,
              transform: `translateX(${16 * (1 - textReveal)}px)`,
              transition: "opacity 400ms cubic-bezier(0.33, 1, 0.68, 1), transform 400ms cubic-bezier(0.33, 1, 0.68, 1)",
            }}
          >
            <h2
              className="font-display text-ink"
              style={{
                fontSize: "clamp(24px, 3vw, 42px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              Where ideas catch light
            </h2>
            <div
              className="mt-6 h-px w-16 bg-ink/60"
              style={{ opacity: textReveal, transition: "opacity 400ms ease-out 80ms" }}
            />
            <p
              className="mt-4 text-sm text-ink"
              style={{ lineHeight: 1.6, fontFamily: "system-ui, sans-serif" }}
            >
              Strategy, craft, execution.
            </p>
          </div>

          <div className="shrink-0 px-4" style={{ minWidth: "180px" }} aria-hidden />

          <div
            className="grid max-w-[320px] grid-cols-1 gap-6 text-right"
            style={{
              opacity: textReveal,
              transform: `translateX(${-16 * (1 - textReveal)}px)`,
              transition: "opacity 400ms cubic-bezier(0.33, 1, 0.68, 1) 60ms, transform 400ms cubic-bezier(0.33, 1, 0.68, 1) 60ms",
            }}
          >
            {ARTICLES.map((article, i) => (
              <article
                key={article.tag}
                style={{
                  opacity: textReveal,
                  transform: `translateY(${12 * (1 - textReveal)}px)`,
                  transition: `opacity 400ms cubic-bezier(0.33, 1, 0.68, 1) ${120 + i * 80}ms, transform 400ms cubic-bezier(0.33, 1, 0.68, 1) ${120 + i * 80}ms`,
                }}
              >
                <span
                  className="text-ink/90 text-xs font-medium uppercase tracking-[0.12em]"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {article.tag}
                </span>
                <h3
                  className="font-display text-ink mt-2"
                  style={{
                    fontSize: "clamp(16px, 1.8vw, 22px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {article.title}
                </h3>
                <p
                  className="mt-1.5 text-sm text-ink/90"
                  style={{ lineHeight: 1.55 }}
                >
                  {article.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
