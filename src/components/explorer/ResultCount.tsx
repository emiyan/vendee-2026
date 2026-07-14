interface ResultCountProps {
    count: number;
  }
  
  export default function ResultCount({
    count,
  }: ResultCountProps) {
    return (
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">
          {count} lieux trouvés
        </h2>
  
        <span className="text-sm text-[var(--color-text-secondary)]">
          Mis à jour
        </span>
      </div>
    );
  }