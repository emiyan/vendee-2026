import "dotenv/config";
import fs from "fs/promises";
import path from "path";

const API_KEY = process.env.ORS_API_KEY;

if (!API_KEY) {
  throw new Error("ORS_API_KEY manquante");
}

const HOME = {
  latitude: 46.6949,
  longitude: -1.937,
};

const DATA_FOLDER = "./src/data/places";

const files = [
  "plages.json",
  "nature.json",
  "patrimoine.json",
  "restaurants.json",
  "marches.json",
  "villes.json",
];

async function getRoute(place) {
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
          [place.longitude, place.latitude],
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    console.warn(
      `⚠ ${place.title} : ${error?.error?.message ?? "Impossible de calculer l'itinéraire"
      }`
    );

    return null;
  }

  const json = await response.json();

  return {
    distance: Number(
      (json.routes[0].summary.distance / 1000).toFixed(1)
    ),
    duration: Math.round(
      json.routes[0].summary.duration / 60
    ),
  };
}

for (const file of files) {
  try {
    console.log(`\n📄 ${file}`);

    const filename = path.join(DATA_FOLDER, file);

    const content = await fs.readFile(filename, "utf8");

    const places = JSON.parse(content);

    let modified = false;

    for (const place of places) {
      if (
        place.distance !== undefined &&
        place.duration !== undefined
      ) {
        console.log(`✔ ${place.title}`);
        continue;
      }

      console.log(`⏳ ${place.title}`);

      const route = await getRoute(place);

      if (!route) {
        continue;
      }

      place.distance = route.distance;
      place.duration = route.duration;

      console.log(
        `   🚗 ${route.distance} km • ${route.duration} min`
      );

      modified = true;

      await new Promise((resolve) =>
        setTimeout(resolve, 250)
      );
    }

    if (modified) {
      await fs.writeFile(
        filename,
        JSON.stringify(places, null, 2),
        "utf8"
      );

      console.log("💾 Sauvegardé");
    } else {
      console.log("Aucune modification");
    }
  } catch (error) {
    console.error(`❌ Erreur dans ${file}`);
    console.error(error);
  }
}

console.log("\n🎉 Terminé");