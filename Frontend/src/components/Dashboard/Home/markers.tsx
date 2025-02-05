// Markers.tsx
import React, { useContext, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Marker } from "react-map-gl";
import {
  destinationCoordContext,
  sourceCoordContext,
} from "@/ContextApi/routeCoordContext";
import { UserLocationContext } from "@/ContextApi/userLocationContext";
import { useLocation } from "../../../hooks/useLocation";
import * as turf from "@turf/turf";
import { getOverlapRouteContext } from "@/ContextApi/OverlapPathContext";

interface MapComponentProps {
  username: string;
}

const Markers: React.FC<MapComponentProps> = ({ username }) => {
  const { sourceCoordinates } = useContext(sourceCoordContext);
  const { destinationCoordinates } = useContext(destinationCoordContext);
  const { userLocation } = useContext(UserLocationContext);
  const { currentUser, users } = useLocation(username);
  const { setOverlapSrcDstRoute } = useContext(getOverlapRouteContext);

  // Debugging: Log the coordinates
  // console.log("User Location:", userLocation);
  // console.log("Source Coordinates:", sourceCoordinates);
  // console.log("Destination Coordinates:", destinationCoordinates);

  const checkOverlap = (users: Array<any>) => {
    const path1 = users[0] ? users[0].rideCoords : null;
    const path2 = users[1] ? users[1].rideCoords : null;

    if (path1 && path2) {
      const line1 = turf.lineString(path1);
      const line2 = turf.lineString(path2);

      const overlapPath = turf.lineOverlap(line1, line2);
      setOverlapSrcDstRoute(overlapPath);

      console.log("Overlap Path:", overlapPath);
    }
  };

  useEffect(() => {
    if (users && users.length > 0) {
      checkOverlap(users);
    }
  }, [users]);

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

      {/* Other User Location */}
      {users
        .filter((user) => user.id !== (currentUser?.id || ""))
        .map((user) => {
          return (
            <Marker
              key={user.id}
              longitude={user.longitude}
              latitude={user.latitude}
            >
              <div style={{ color: "red" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="red"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
              </div>
            </Marker>
          );
        })}

      {/* Source Marker */}
      {sourceCoordinates &&
        typeof sourceCoordinates.lng === "number" &&
        typeof sourceCoordinates.lat === "number" && (
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
      {destinationCoordinates &&
        typeof destinationCoordinates.lng === "number" &&
        typeof destinationCoordinates.lat === "number" && (
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
