// ReactMap.tsx
import React, { useContext, useEffect, useRef, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { UserLocationContext } from "@/ContextApi/userLocationContext";
import { getRouteContext } from "@/ContextApi/SrcDstRouteContext";
import Markers from "./markers"; // Ensure correct path and casing
import {
  destinationCoordContext,
  sourceCoordContext,
} from "@/ContextApi/routeCoordContext";
import Route from "./route";

type Props = object;

const ReactMap: React.FC<Props> = () => {
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const { userLocation } = useContext(UserLocationContext);
  const mapRef = useRef<any>();

  const { sourceCoordinates } = useContext(sourceCoordContext);
  const { destinationCoordinates } = useContext(destinationCoordContext);
  const { srcDstRoute } = useContext(getRouteContext);

  // Manage map view state
  const [viewState, setViewState] = useState({
    longitude: userLocation?.lng ?? 80, // Correct longitude
    latitude: userLocation?.lat ?? 20.3, // Correct latitude
    zoom: 3,
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

  // // Handle successful geolocation
  // const handleGeolocate = (event: GeolocationPosition) => {
  //   if (event.coords) {
  //     const { longitude, latitude } = event.coords;
  //     if (typeof longitude === "number" && typeof latitude === "number") {
  //       setUserLocation({ lng: longitude, lat: latitude });
  //     } else {
  //       console.error("Invalid coordinates received:", event.coords);
  //     }
  //   }
  // };

  // // Handle geolocation errors
  // const handleGeolocateError = (error: GeolocationPositionError) => {
  //   console.error("Geolocation error:", error);
  //   // Optionally, set a default location or handle the error as needed
  // };

  // // Trigger geolocation once when the component mounts
  // useEffect(() => {
  //   geoControlRef.current?.trigger();
  // }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (sourceCoordinates && destinationCoordinates) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([sourceCoordinates.lng, sourceCoordinates.lat]);
      bounds.extend([destinationCoordinates.lng, destinationCoordinates.lat]);

      mapRef.current?.fitBounds(bounds, {
        padding: 100,
        duration: 2000,
      });
    }
  }, [sourceCoordinates, destinationCoordinates, mapRef.current]);

  return (
    <div className="h-full w-full">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <GeolocateControl
          ref={geoControlRef}
          position="bottom-right"
          trackUserLocation
          // onGeolocate={handleGeolocate}
          // onError={handleGeolocateError}
        />

        <Markers />

        {srcDstRoute?.data?.routes ? (
          <Route
            coordinates={srcDstRoute?.data?.routes[0]?.geometry?.coordinates}
          />
        ) : null}
      </Map>
    </div>
  );
};

export default ReactMap;
