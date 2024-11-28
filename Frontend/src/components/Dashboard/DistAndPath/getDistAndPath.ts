import axios from "axios";

export const getDistAndPath = async (origin: Array<number>, destination: Array<number>, profile: string) => {
  const response = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/${profile}/${origin[0]+"%2C"+origin[1]}%3B${destination[0]+"%2C"+destination[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
  );
  console.log(response);
  return response;
};
