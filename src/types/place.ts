export interface Place {
  id: string;

  title: string;
  category: string;

  description: string;

  image: string;
  website: string;

  city: string;

  latitude: number;
  longitude: number;

  distance?: number;
  duration?: number;

}