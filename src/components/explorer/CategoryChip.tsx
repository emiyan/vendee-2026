import type { LucideIcon } from "lucide-react";

import { cn } from "../../lib/cn";

interface CategoryChipProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryChip({
  icon: Icon,
  label,
  active = false,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border px-4",
        "select-none whitespace-nowrap",
        "text-sm font-medium",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20",
        active
          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-sm"
          : "border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-slate-300 hover:bg-slate-50"
      )}
    >
      <Icon size={16} strokeWidth={2} />

      <span>{label}</span>
    </button>
  );
}