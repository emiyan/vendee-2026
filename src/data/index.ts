import type { Place } from "../types/place";

import plages from "./places/plages.json";
import nature from "./places/nature.json";
import patrimoine from "./places/patrimoine.json";
import balades from "./places/balades.json";
import restaurants from "./places/restaurants.json";
import marches from "./places/marches.json";

export const places: Place[] = [
  ...plages,
  ...nature,
  ...patrimoine,
  ...balades,
  ...restaurants,
  ...marches,
];