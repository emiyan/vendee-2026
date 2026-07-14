import { ExternalLink, MapPin } from "lucide-react";

import type { Place } from "../../types/place";

interface PlacePopupProps {
  place: Place;
}

export default function PlacePopup({
  place,
}: PlacePopupProps) {
  return (
    <div className="w-[280px]">
      <img
        src={place.image}
        alt={place.title}
        className="h-36 w-full rounded-xl object-cover"
      />

      <div className="mt-3">
        <span className="inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-[var(--color-primary)]">
          {place.category}
        </span>

        <h3 className="mt-2 text-lg font-semibold">
          {place.title}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={14} />
          {place.city}
        </div>

        {place.distance !== undefined && (
          <div className="mt-2 font-medium text-[var(--color-primary)]">
            {place.distance.toFixed(1)} km
          </div>
        )}

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {place.description}
        </p>

        <div className="mt-4 flex justify-end">
          <a
            href={place.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ouvrir le site officiel de ${place.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] transition hover:bg-slate-50"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}