import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";

const API_KEY = process.env.ORS_API_KEY;

if (!API_KEY) {
  throw new Error("ORS_API_KEY est introuvable dans le fichier .env");
}

const DATA_FOLDER = path.resolve("src/data/places");

const HOME = {
  latitude: 46.69807684821846,
  longitude: -1.9423998210194302,
};

interface Place {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  distance?: number;
  duration?: number;
  [key: string]: unknown;
}

interface MatrixResponse {
  distances: number[][];
  durations: number[][];
}

async function getRoutes(
  places: Place[]
): Promise<{ distance: number; duration: number }[]> {
  const locations = [
    [HOME.longitude, HOME.latitude],
    ...places.map((place) => [
      place.longitude,
      place.latitude,
    ]),
  ];

  const destinations = places.map((_, index) => index + 1);

  const response = await fetch(
    "https://api.openrouteservice.org/v2/matrix/driving-car",
    {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locations,
        sources: [0],
        destinations,
        metrics: ["distance", "duration"],
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `HTTP ${response.status}\n${body}`
    );
  }

  const matrix =
    (await response.json()) as MatrixResponse;

  const distances = matrix.distances[0];
  const durations = matrix.durations[0];

  return places.map((_, index) => ({
    distance: Number(
      (distances[index] / 1000).toFixed(1)
    ),
    duration: Math.round(
      durations[index] / 60
    ),
  }));
}

async function main() {
  const started = Date.now();

  const files = (await fs.readdir(DATA_FOLDER))
    .filter((file) => file.endsWith(".json"))
    .sort();

  let totalFiles = 0;
  let totalPlaces = 0;
  let updatedPlaces = 0;
  let errors = 0;

  for (const [index, file] of files.entries()) {
    console.log(
      `\n[${index + 1}/${files.length}] ${file}`
    );

    const filePath = path.join(DATA_FOLDER, file);

    try {
      const content = await fs.readFile(
        filePath,
        "utf8"
      );

      const places = JSON.parse(content) as Place[];

      totalFiles++;
      totalPlaces += places.length;

      if (places.length === 0) {
        console.log("Aucun lieu.");
        continue;
      }

      const routes = await getRoutes(places);

      let modified = false;

      for (let i = 0; i < places.length; i++) {
        const place = places[i];
        const route = routes[i];

        const distanceChanged =
          place.distance !== route.distance;

        const durationChanged =
          place.duration !== route.duration;

        if (!distanceChanged && !durationChanged) {
          continue;
        }

        console.log(
          `✓ ${place.title}\n   ${place.distance} km → ${route.distance} km\n   ${place.duration} min → ${route.duration} min`
        );

        place.distance = route.distance;
        place.duration = route.duration;

        updatedPlaces++;
        modified = true;
      }

      // Trie toujours les lieux par distance croissante
      places.sort((a, b) => {
        if (a.distance === undefined) return Number.POSITIVE_INFINITY;
        if (b.distance === undefined) return Number.NEGATIVE_INFINITY;

        return a.distance - b.distance;
      });

      // Réécrit toujours le fichier
      await fs.writeFile(
        filePath,
        JSON.stringify(places, null, 2),
        "utf8"
      );

      if (modified) {
        console.log("💾 Fichier mis à jour");
      } else {
        console.log("📋 Fichier trié (aucune distance modifiée)");
      }
    } catch (error) {
      errors++;

      console.error(
        `❌ Erreur sur ${file}`
      );

      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  const elapsed = (
    (Date.now() - started) /
    1000
  ).toFixed(1);

  console.log("\n────────────────────────────");
  console.log("Résumé");
  console.log("────────────────────────────");
  console.log(`Fichiers analysés : ${totalFiles}`);
  console.log(`Lieux analysés    : ${totalPlaces}`);
  console.log(`Lieux modifiés    : ${updatedPlaces}`);
  console.log(`Erreurs           : ${errors}`);
  console.log(`Temps             : ${elapsed} s`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});