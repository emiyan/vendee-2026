import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
}

export default function SectionTitle({
  children,
  subtitle,
}: SectionTitleProps) {
  return (
    <header className="space-y-2">
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
        {children}
      </h2>

      {subtitle && (
        <p className="max-w-prose text-[15px] leading-6 text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      )}
    </header>
  );
}