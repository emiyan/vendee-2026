import { useState } from "react";

import {
  Waves,
  Trees,
  Landmark,
  UtensilsCrossed,
  ShoppingBag,
} from "lucide-react";

import Hero from "../components/hero/Hero";
import SectionTitle from "../components/explorer/SectionTitle";
import CategoryChip from "../components/explorer/CategoryChip";
import RadiusSelector from "../components/explorer/RadiusSelector";
import ResultCount from "../components/explorer/ResultCount";
import ActivityCard from "../components/explorer/ActivityCard";
import SegmentedControl from "../components/ui/SegmentedControl";
import ExplorerMap from "../components/map/ExplorerMap";

import { places } from "../data";
import { home } from "../data/home";
import { calculateDistance } from "../lib/distance";

export default function ExplorerPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("Toutes");

  const [selectedRadius, setSelectedRadius] =
    useState(20);

  const [view, setView] =
    useState<"list" | "map">("list");

  // Filtre par catégorie
  const filteredPlaces =
    selectedCategory === "Toutes"
      ? places
      : places.filter(
        (place) => place.category === selectedCategory
      );

  // Calcul des distances
  const placesWithDistance = filteredPlaces.map((place) => ({
    ...place,
    distance: calculateDistance(
      home.latitude,
      home.longitude,
      place.latitude,
      place.longitude,
    ),
  }));

  // Filtre par rayon
  const visiblePlaces = placesWithDistance.filter(
    (place) => place.distance <= selectedRadius
  );

  console.log(
    "Rayon :", selectedRadius,
    "Visible :", visiblePlaces.length
  );

  return (
    <>
      <Hero />

      <section className="mt-8">
        <SectionTitle>
          Que souhaitez-vous découvrir ?
        </SectionTitle>

        <div className="mt-4 flex flex-wrap gap-3">
          <CategoryChip
            icon={Waves}
            label="Toutes"
            active={selectedCategory === "Toutes"}
            onClick={() => setSelectedCategory("Toutes")}
          />

          <CategoryChip
            icon={Waves}
            label="Plages"
            active={selectedCategory === "Plages"}
            onClick={() => setSelectedCategory("Plages")}
          />

          <CategoryChip
            icon={Trees}
            label="Nature"
            active={selectedCategory === "Nature"}
            onClick={() => setSelectedCategory("Nature")}
          />

          <CategoryChip
            icon={Landmark}
            label="Patrimoine"
            active={selectedCategory === "Patrimoine"}
            onClick={() => setSelectedCategory("Patrimoine")}
          />

          <CategoryChip
            icon={UtensilsCrossed}
            label="Restaurants"
            active={selectedCategory === "Restaurants"}
            onClick={() => setSelectedCategory("Restaurants")}
          />

          <CategoryChip
            icon={ShoppingBag}
            label="Marchés"
            active={selectedCategory === "Marchés"}
            onClick={() => setSelectedCategory("Marchés")}
          />
        </div>
      </section>

      <section className="mt-10">
        <SectionTitle subtitle="Choisissez jusqu'où vous souhaitez explorer autour de votre location.">
          Rayon autour de votre lieu de vacances
        </SectionTitle>

        <RadiusSelector
          value={selectedRadius}
          onChange={setSelectedRadius}
        />
      </section>

      <section className="mt-10">
        <SectionTitle subtitle="Choisissez votre mode d'affichage.">
          Afficher
        </SectionTitle>

        <SegmentedControl
          value={view}
          onChange={(value) =>
            setView(value as "list" | "map")
          }
          options={[
            {
              label: "Liste",
              value: "list",
            },
            {
              label: "Carte",
              value: "map",
            },
          ]}
        />
      </section>

      {view === "list" && (
        <>
          <ResultCount count={visiblePlaces.length} />

          <section className="mt-6">
            {visiblePlaces.map((place) => (
              <div
                key={place.id}
                className="mt-6"
              >
                <ActivityCard place={place} />
              </div>
            ))}
          </section>
        </>
      )}

      {view === "map" && (
        <section className="mt-8">
          <ExplorerMap places={visiblePlaces} />
        </section>
      )}

    </>
  );
}