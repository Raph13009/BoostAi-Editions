import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-umber/20">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 sm:py-8 text-sm text-slate">
          <span>BoostAI Editions</span>
          <span>© {year}</span>
        </div>
      </Container>
    </footer>
  );
}
