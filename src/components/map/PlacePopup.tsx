import {
  ExternalLink,
  MapPin,
  Car,
  Waves,
  Building2,
  Trees,
  Landmark,
  UtensilsCrossed,
  ShoppingBag,
} from "lucide-react";

import { formatDuration } from "../../lib/formatDuration";

import type { Place } from "../../types/place";

interface PlacePopupProps {
  place: Place;
}

export default function PlacePopup({
  place,
}: PlacePopupProps) {
  function getCategory() {
    switch (place.category) {
      case "Plages":
        return {
          icon: <Waves size={14} />,
          className: "bg-blue-50 text-blue-600",
        };

      case "Villes":
        return {
          icon: <Building2 size={14} />,
          className: "bg-cyan-50 text-cyan-600",
        };

      case "Nature":
        return {
          icon: <Trees size={14} />,
          className: "bg-green-50 text-green-600",
        };

      case "Patrimoine":
        return {
          icon: <Landmark size={14} />,
          className: "bg-amber-50 text-amber-600",
        };

      case "Restaurants":
        return {
          icon: <UtensilsCrossed size={14} />,
          className: "bg-red-50 text-red-600",
        };

      case "Marchés":
        return {
          icon: <ShoppingBag size={14} />,
          className: "bg-violet-50 text-violet-600",
        };

      default:
        return {
          icon: null,
          className: "bg-slate-100 text-slate-600",
        };
    }
  }

  const categoryStyle = getCategory();

  return (
    <div className="w-[280px]">
      <img
        src={place.image}
        alt={place.title}
        className="h-36 w-full rounded-xl object-cover"
      />

      <div className="mt-3">
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${categoryStyle.className}`}
        >
          {categoryStyle.icon}
          {place.category}
        </span>

        <h3 className="mt-2 text-lg font-semibold">
          {place.title}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={14} />
          {place.city}
        </div>

        {place.distance !== undefined &&
          place.duration !== undefined && (
            <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-[var(--color-text)]">
              <Car size={15} />
              <span>
                {place.distance.toFixed(0)} km • {formatDuration(place.duration)}
              </span>
            </p>
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