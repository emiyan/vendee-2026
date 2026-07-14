import {
    Waves,
    Trees,
    Landmark,
    UtensilsCrossed,
    ShoppingBag,
    House,
  } from "lucide-react";
  
  interface MapMarkerProps {
    category: string;
  }
  
  export default function MapMarker({
    category,
  }: MapMarkerProps) {
    switch (category) {
      case "Plages":
        return <Waves size={18} color="#2563eb" />;
  
      case "Nature":
        return <Trees size={18} color="#16a34a" />;
  
      case "Patrimoine":
        return <Landmark size={18} color="#d97706" />;
  
      case "Restaurants":
        return <UtensilsCrossed size={18} color="#dc2626" />;
  
      case "Marchés":
        return <ShoppingBag size={18} color="#9333ea" />;
  
      default:
        return <House size={18} color="#0f6cbd" />;
    }
  }