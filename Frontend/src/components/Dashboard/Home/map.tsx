// import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React from "react";

// const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const HomeMap = () => {
const [myLocation, setMyLocation] = React.useState<{ lat: number; lng: number } | null>(null);

React.useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
        const center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude, 
        };
        setMyLocation(center);
    });
}, []);

  console.log(myLocation)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    // libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  return (
    <>
      {myLocation && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={myLocation}
          zoom={20}
        ></GoogleMap>
      )}
    </>
  );
};

export default HomeMap;
