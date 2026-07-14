import { renderToStaticMarkup } from "react-dom/server";
import PlacePopup from "./PlacePopup";

import {
    Waves,
    Trees,
    Landmark,
    UtensilsCrossed,
    ShoppingBag,
    MapPin,
} from "lucide-react";

import { useEffect } from "react";

import L from "leaflet";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";

import type { Place } from "../../types/place";
import { home } from "../../data/home";

interface ExplorerMapProps {
    places: Place[];
}

const homeIcon = L.divIcon({
    className: "",
    html: `
      <div
        style="
          width:42px;
          height:42px;
          border-radius:999px;
          background:#2563eb;
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          border:3px solid white;
          box-shadow:0 4px 12px rgba(0,0,0,.25);
          font-size:22px;
        "
      >
        🏠
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
});

function createCategoryIcon(category: string) {
    let icon;

    switch (category) {
        case "Plages":
            icon = <Waves size={18} color="#2563eb" />;
            break;

        case "Nature":
            icon = <Trees size={18} color="#16a34a" />;
            break;

        case "Patrimoine":
            icon = <Landmark size={18} color="#d97706" />;
            break;

        case "Restaurants":
            icon = <UtensilsCrossed size={18} color="#dc2626" />;
            break;

        case "Marchés":
            icon = <ShoppingBag size={18} color="#9333ea" />;
            break;

        default:
            icon = <Landmark size={18} color="#64748b" />;
    }

    return L.divIcon({
        className: "",
        html: `
        <div
          style="
            width:36px;
            height:36px;
            border-radius:999px;
            background:white;
            display:flex;
            align-items:center;
            justify-content:center;
            box-shadow:0 4px 12px rgba(0,0,0,.18);
            border:2px solid white;
          "
        >
          ${renderToStaticMarkup(icon)}
        </div>
      `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
    });
}

function FitBounds({ places }: { places: Place[] }) {
    const map = useMap();

    useEffect(() => {
        if (places.length === 0) {
            map.setView([home.latitude, home.longitude], 12);
            return;
        }

        const bounds = L.latLngBounds([
            [home.latitude, home.longitude] as [number, number],

            ...places.map(
                (place): [number, number] => [
                    place.latitude,
                    place.longitude,
                ]
            ),
        ]);

        map.fitBounds(bounds, {
            padding: [50, 50],
        });
    }, [map, places]);

    return null;
}

export default function ExplorerMap({
    places,
}: ExplorerMapProps) {
    return (
        <div
            style={{
                height: "600px",
                borderRadius: "24px",
                overflow: "hidden",
            }}
        >
            <MapContainer
                center={[home.latitude, home.longitude]}
                zoom={12}
                style={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds places={places} />

                <Marker
                    position={[home.latitude, home.longitude]}
                    icon={homeIcon}
                >
                    <Popup
                        maxWidth={320}
                        minWidth={280}
                    >
                        <div className="w-[280px]">
                            <h3 className="text-lg font-semibold">
                                Votre logement
                            </h3>

                            <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                                <MapPin
                                    size={16}
                                    className="mt-0.5 shrink-0"
                                />

                                <div>
                                    32 Rue de la Broche
                                    <br />
                                    85800 Saint-Gilles-Croix-de-Vie
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>

                {places.map((place) => (
                    <Marker
                        key={place.id}
                        position={[
                            place.latitude,
                            place.longitude,
                        ]}
                        icon={createCategoryIcon(place.category)}
                    >
                        <Popup
                            maxWidth={320}
                            minWidth={280}
                        >
                            <PlacePopup place={place} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}