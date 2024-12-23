import axios from "axios";

interface Coordinates {
  lng: number;
  lat: number;
}

export const getDistAndPath = async (origin: Coordinates, destination: Coordinates, profile: string) => {
  const response = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/${profile}/${origin.lng+"%2C"+origin.lat}%3B${destination.lng+"%2C"+destination.lat}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
  );

  return response;
};
