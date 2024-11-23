import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [myLocation, setMyLocation] = React.useState<number[] | null>(null);

  React.useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      const center = [position.coords.longitude, position.coords.latitude];
      setMyLocation(center);
    });
  }, []);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWRoYXJiYXR0dWx3YXIiLCJhIjoiY20zbzVqcTJ2MDAwcTJrcXVtNnZ5Y3cwOCJ9.TgqFqGcmxuiRIzShx4DPRA";

    if (mapContainerRef.current && myLocation) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        // center: myLocation as [number, number],
        center: [77.5946, 12.9716],
        zoom: 12,
      });

      mapRef.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
          
        })
      );
    }
  });

  return (
    <div ref={mapContainerRef} className="map-container h-full w-full"></div>
  );
};

export default MapboxExample;
