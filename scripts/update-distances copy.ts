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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getRoute(
  latitude: number,
  longitude: number
) {
  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          [HOME.longitude, HOME.latitude],
          [longitude, latitude],
        ],
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `HTTP ${response.status} ${response.statusText}\n${body}`
    );
  }

  const json = (await response.json()) as {
    routes: {
      summary: {
        distance: number;
        duration: number;
      };
    }[];
  };

  const summary = json.routes[0].summary;

  return {
    distance: Number((summary.distance / 1000).toFixed(1)),
    duration: Math.round(summary.duration / 60),
  };
}

async function main() {
  const files = await fs.readdir(DATA_FOLDER);

  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  let totalPlaces = 0;
  let changedPlaces = 0;

  for (const file of jsonFiles) {
    const filePath = path.join(DATA_FOLDER, file);

    const content = await fs.readFile(filePath, "utf-8");

    const places = JSON.parse(content);

    let fileChanged = false;

    console.log(`\n📄 ${file}`);

    for (const place of places) {
      totalPlaces++;

      let route;

      try {
        route = await getRoute(
          place.latitude,
          place.longitude
        );

        // Petite pause pour éviter de saturer ORS
        await sleep(200);
      } catch (error) {
        console.error(`\n❌ ${place.title}`);
        console.error(
          `   Coordonnées : ${place.latitude}, ${place.longitude}`
        );
        console.error(error);

        continue;
      }

      const distanceChanged =
        route.distance !== place.distance;

      const durationChanged =
        route.duration !== place.duration;

      if (!distanceChanged && !durationChanged) {
        continue;
      }

      const oldDistance = place.distance;
      const oldDuration = place.duration;

      place.distance = route.distance;
      place.duration = route.duration;

      fileChanged = true;
      changedPlaces++;

      console.log(`\n✓ ${place.title}`);
      console.log(
        `Distance : ${oldDistance} → ${place.distance} km`
      );
      console.log(
        `Durée    : ${oldDuration} → ${place.duration} min`
      );
    }

    if (fileChanged) {
      await fs.writeFile(
        filePath,
        JSON.stringify(places, null, 2),
        "utf-8"
      );

      console.log(`💾 ${file} mis à jour`);
    }
  }

  console.log("\n────────────────────────");
  console.log(`Lieux analysés : ${totalPlaces}`);
  console.log(`Modifications : ${changedPlaces}`);
}

main().catch(console.error);