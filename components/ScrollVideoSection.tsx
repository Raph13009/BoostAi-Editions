"use client";

import { useRef, useEffect, useState } from "react";

const VIDEO_SRC = "/video/video-book-section.mp4";
const SCROLL_RANGE_VH = 100; // viewport heights of scroll to scrub full video

export function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Load video metadata and set duration once ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    if (video.readyState >= 1) setDuration(video.duration);

    return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
  }, []);

  // Scroll-driven video scrub
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || duration <= 0) return;

    const updateVideoTime = () => {
      const scrollRange = SCROLL_RANGE_VH * window.innerHeight * 0.01;
      const rect = container.getBoundingClientRect();

      // Section is "fully in view" when its top is at or above viewport top
      if (rect.top > 0) {
        video.currentTime = 0;
        rafRef.current = null;
        return;
      }

      // How far we've scrolled past "section fully in view"
      const scrollPast = -rect.top;
      const progress = Math.min(1, Math.max(0, scrollPast / scrollRange));
      const targetTime = progress * duration;

      if (Math.abs(video.currentTime - targetTime) > 0.03) {
        video.currentTime = targetTime;
      }

      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(updateVideoTime);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateVideoTime();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [duration]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${100 + SCROLL_RANGE_VH}vh` }}
    >
      <section
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#EAE0D5]"
        aria-label="Scroll-controlled video section"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
          style={{ contain: "paint" }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </section>
    </div>
  );
}
