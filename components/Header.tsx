import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="w-full border-b border-umber/20">
      <Container>
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded"
            aria-label="BoostAI Editions home"
          >
            <Image
              src="/brand/logo-black.svg"
              alt="BoostAI Editions"
              width={40}
              height={40}
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              priority
            />
          </Link>
          <div className="flex-1" aria-hidden="true" />
        </div>
      </Container>
    </header>
  );
}
