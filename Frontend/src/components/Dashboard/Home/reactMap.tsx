// ReactMap.tsx
import React, { useContext, useEffect, useRef, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserLocationContext } from "@/ContextApi/userLocationContext";
import Markers from "./markers"; // Ensure correct path and casing

type Props = object;

const ReactMap: React.FC<Props> = () => {
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  // Manage map view state
  const [viewState, setViewState] = useState({
    longitude: userLocation?.lng ?? 80,   // Correct longitude
    latitude: userLocation?.lat ?? 20.3,  // Correct latitude
    zoom: 10,
  });

  // Update viewState when userLocation changes
  useEffect(() => {
    if (userLocation && !isNaN(userLocation.lng) && !isNaN(userLocation.lat)) {
      setViewState((prev) => ({
        ...prev,
        longitude: userLocation.lng,
        latitude: userLocation.lat,
      }));
    }
  }, [userLocation]);

  // Handle successful geolocation
  const handleGeolocate = (event: mapboxgl.GeolocateResult) => {
    if (event.coords) {
      const { longitude, latitude } = event.coords;
      if (typeof longitude === "number" && typeof latitude === "number") {
        setUserLocation({ lng: longitude, lat: latitude });
      } else {
        console.error("Invalid coordinates received:", event.coords);
      }
    }
  };

  // Handle geolocation errors
  const handleGeolocateError = (error: any) => {
    console.error("Geolocation error:", error);
    // Optionally, set a default location or handle the error as needed
  };

  // Trigger geolocation once when the component mounts
  useEffect(() => {
    geoControlRef.current?.trigger();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="h-full w-full">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <GeolocateControl
          ref={geoControlRef}
          position="bottom-right"
          trackUserLocation
          onGeolocate={handleGeolocate}
          onError={handleGeolocateError}
        />

        <Markers />
      </Map>
    </div>
  );
};

export default ReactMap;