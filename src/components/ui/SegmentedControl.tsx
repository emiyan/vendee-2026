import { cn } from "../../lib/cn";

export interface SegmentedOption<T extends string | number> {
    label: string;
    value: T;
}

interface SegmentedControlProps<T extends string | number> {
    value: T;
    options: SegmentedOption<T>[];
    onChange?: (value: T) => void;
}

export default function SegmentedControl<T extends string | number>({
    value,
    options,
    onChange,
}: SegmentedControlProps<T>) {
    return (
        <div className="rounded-2xl bg-slate-100 p-1">
            <div
                className="grid gap-1"
                style={{
                    gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
                }}
            >
                {options.map((option) => {
                    const active = option.value === value;

                    return (
                        <button
                            key={String(option.value)}
                            type="button"
                            onClick={() => onChange?.(option.value)}
                            className={cn(
                                "h-11 rounded-xl px-4 text-sm font-medium transition-all duration-200",
                                active
                                    ? "bg-white text-[var(--color-primary)] shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                            )}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}