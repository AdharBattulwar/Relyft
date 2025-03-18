import { useState, useEffect, useContext } from "react";
import socketIo, { Socket } from "socket.io-client";
import { throttle } from "lodash";
import { getRouteContext } from "@/ContextApi/SrcDstRouteContext";
import AuthContext from "@/ContextApi/AuthContext";

interface User {
  id: string;
  username: string;
  latitude: number;
  longitude: number;
  avatar: string;  // Add avatar field
}

interface UseLocationReturn {
  currentUser: User | null;
  users: User[];
  rideCoords: Rides;
  error: string | null;
}

interface Rides {
  coordinates: [number, number];
}

export const useLocation = (username: string): UseLocationReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [rideCoords, setRideCoords] = useState<Rides>({ coordinates: [0, 0] });

  const { srcDstRoute } = useContext(getRouteContext);

  // Add AuthContext
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const newSocket = socketIo(import.meta.env.VITE_SOCKET_URL as string);
    setSocket(newSocket);

    setRideCoords(srcDstRoute?.data?.routes[0]?.geometry?.coordinates);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      // Update join event to include avatar
      newSocket.emit("join", {
        id: newSocket.id,
        username,
        latitude: 0,
        longitude: 0,
        rideCoords: rideCoords,
        avatar: user?.avatar, // Include avatar from AuthContext
      });
    });

    // Handle receiving updated users list
    newSocket.on("users", (users: User[]) => {
      setUsers(users);
    });

    // Handle disconnection
    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [username, user?.avatar, rideCoords, user]);

  useEffect(() => {
    if (!socket) return;

    const emitLocation = throttle((latitude: number, longitude: number) => {
      if (socket) {
        socket.emit("locationUpdate", {
          id: socket.id || "",
          latitude,
          longitude,
          avatar: user?.avatar, // Include avatar in location updates
        });
      }
    }, 1000);

    // Watch user's position
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentUser({
            id: socket.id || "",
            username,
            latitude,
            longitude,
            avatar: user?.avatar || "" // Include avatar in currentUser
          });

          // Emit location update
          emitLocation(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Cleanup on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
        emitLocation.cancel();
      };
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, [socket, username, user]);

  return { currentUser, users, rideCoords, error };
};
