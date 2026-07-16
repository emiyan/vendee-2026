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
  function getColors() {
    switch (label) {
      case "Villes":
        return "bg-cyan-50 text-cyan-600 border-cyan-200";

      case "Plages":
        return "bg-blue-50 text-blue-600 border-blue-200";

      case "Nature":
        return "bg-green-50 text-green-600 border-green-200";

      case "Patrimoine":
        return "bg-amber-50 text-amber-600 border-amber-200";

      case "Restaurants":
        return "bg-red-50 text-red-600 border-red-200";

      case "Marchés":
        return "bg-violet-50 text-violet-600 border-violet-200";

      default:
        return "bg-white text-[var(--color-text)] border-[var(--color-border)]";
    }
  }

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
        getColors(),
        active &&
          "border-current shadow-md ring-2 ring-current/15 scale-[1.02]"
      )}
    >
      <Icon size={16} strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
}