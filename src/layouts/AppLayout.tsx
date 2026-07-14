import type { PropsWithChildren } from "react";
import Container from "../components/ui/Container";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <Container>
        <div className="py-6 md:py-8">
          {children}
        </div>
      </Container>
    </main>
  );
}