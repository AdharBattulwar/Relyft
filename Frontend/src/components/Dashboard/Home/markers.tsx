// Markers.tsx
import React, { useContext } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Marker } from "react-map-gl";
import {
  destinationCoordContext,
  sourceCoordContext,
} from "@/ContextApi/routeCoordContext";
import { UserLocationContext } from "@/ContextApi/userLocationContext";

type Props = object;

const Markers: React.FC<Props> = () => {
  const { sourceCoordinates } = useContext(sourceCoordContext);
  const { destinationCoordinates } = useContext(destinationCoordContext);
  const { userLocation } = useContext(UserLocationContext);

  // Debugging: Log the coordinates
  // console.log("User Location:", userLocation);
  // console.log("Source Coordinates:", sourceCoordinates);
  // console.log("Destination Coordinates:", destinationCoordinates);

  return (
    <>
      {/* User Location Marker */}
      {userLocation && !isNaN(userLocation.lng) && !isNaN(userLocation.lat) && (
        <Marker
          longitude={userLocation.lng}
          latitude={userLocation.lat}
          anchor="bottom"
        >
          <FaLocationDot className="text-blue-500 text-2xl" />
        </Marker>
      )}

      {/* Source Marker */}
      {sourceCoordinates && typeof sourceCoordinates.lng === "number" && typeof sourceCoordinates.lat === "number" && (
        <>
        (console.log(sourceCoordinates))
        <Marker
          longitude={sourceCoordinates.lng}
          latitude={sourceCoordinates.lat}
          anchor="bottom"
        >
          <FaLocationDot className="text-green-500 text-2xl" />
        </Marker>
        </>
      )}

      {/* Destination Marker */}
      {destinationCoordinates && typeof destinationCoordinates.lng === "number" && typeof destinationCoordinates.lat === "number" && (
        <Marker
          longitude={destinationCoordinates.lng}
          latitude={destinationCoordinates.lat}
          anchor="bottom"
        >
          <FaLocationDot className="text-red-500 text-2xl" />
        </Marker>
      )}
    </>
  );
};

export default Markers;