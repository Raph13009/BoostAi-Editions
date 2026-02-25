import Image from "next/image";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#EAE0D5] px-8 pt-8 pb-[90px] md:px-[120px] md:pt-[120px]"
      aria-labelledby="hero-title"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover pointer-events-none"
        aria-hidden
        role="presentation"
      >
        <source src="/video/video-hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-[5] bg-[#EAE0D5]/20" aria-hidden />

      {/* Logo */}
      <a
        href="/"
        className="absolute left-6 top-6 z-20 w-7 md:left-[60px] md:top-[60px] md:w-9"
        aria-label="BoostAI Editions home"
      >
        <Image
          src="/brand/logo-black.svg"
          alt="BoostAI Editions"
          width={36}
          height={23}
          className="h-auto w-full object-contain object-left"
        />
      </a>

      {/* Bottom-right content */}
      <div className="relative z-10 mt-auto flex flex-col items-end">
        <div className="w-full max-w-[750px] text-right">
          <h1
            id="hero-title"
            className="font-display text-[#0A0908]"
            style={{
              fontSize: "clamp(56px, 7vw, 120px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            The Digital
            <br />
            Builder Library
          </h1>
          <p
            className="ml-auto mt-[25px] max-w-[520px] text-base text-[#5E503F] md:text-xl"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 1.6,
            }}
          >
            A curated collection of thoughts on building thoughtful digital
            products.
          </p>
        </div>
      </div>
    </section>
  );
}
