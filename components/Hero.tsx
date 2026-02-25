import Image from "next/image";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col bg-[#EAE0D5] px-8 pt-8 pb-[90px] md:px-[120px] md:pt-[120px]"
      aria-labelledby="hero-title"
    >
      {/* Top Glass Component */}
      <div className="absolute left-8 right-8 top-[60px] md:left-[120px] md:right-[120px]">
        <div
          className="relative mx-auto flex h-[58px] w-full max-w-[600px] items-center justify-between rounded-[20px] px-5"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 100%), rgba(198, 172, 143, 0.2)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <Image
            src="/brand/logo-black.svg"
            alt="BoostAI Editions"
            width={44}
            height={28}
            className="h-7 w-[44px] shrink-0 object-contain object-left"
          />
          <span
            className="absolute left-1/2 -translate-x-1/2 text-[20px] text-[#0A0908]"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 1.6,
            }}
          >
            BoostAI Editions
          </span>
          <div className="h-7 w-[44px] shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* Bottom-right content */}
      <div className="mt-auto flex flex-col items-end">
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
            className="ml-auto mt-[25px] max-w-[520px] text-base text-[#22333B] md:text-xl"
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
