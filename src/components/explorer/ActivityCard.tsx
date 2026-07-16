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

interface ActivityCardProps {
  place: Place;
}

export default function ActivityCard({
  place,
}: ActivityCardProps) {
  const {
    title,
    category,
    city,
    description,
    image,
    website,
    distance,
    duration,
  } = place;

  function getCategory() {
    switch (category) {
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
    <article className="flex gap-4 rounded-3xl border border-[var(--color-border)] bg-white p-3 shadow-sm">
      {/* Photo */}
      <div className="w-[120px] shrink-0">
        <img
          src={image}
          alt={title}
          className="h-full min-h-[132px] w-full rounded-2xl object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${categoryStyle.className}`}
          >
            {categoryStyle.icon}
            {category}
          </span>

          <h3 className="mt-2 text-lg font-semibold leading-tight text-[var(--color-text)]">
            {title}
          </h3>

          <p className="mt-1 flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
            <MapPin size={14} />
            {city}
          </p>

          {distance !== undefined && duration !== undefined && (
            <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-[var(--color-text)]">
              <Car size={15} />
              <span>
                {distance.toFixed(0)} km • {formatDuration(duration)}
              </span>
            </p>
          )}

          <p className="mt-2 line-clamp-2 text-sm leading-5 text-[var(--color-text-secondary)]">
            {description}
          </p>
        </div>

        <div className="flex justify-end">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] transition hover:bg-slate-50"
            aria-label={`Ouvrir le site officiel de ${title}`}
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}