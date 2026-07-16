import type { Place } from "../types/place";

import plages from "./places/plages.json";
import nature from "./places/nature.json";
import patrimoine from "./places/patrimoine.json";
import restaurants from "./places/restaurants.json";
import marches from "./places/marches.json";
import villes from "./places/villes.json";

export const places: Place[] = [
  ...plages,
  ...villes,
  ...nature,
  ...patrimoine,
  ...restaurants,
  ...marches,
];