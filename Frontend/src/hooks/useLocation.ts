import { useState, useEffect, useContext } from "react";
import socketIo, { Socket } from "socket.io-client";
import { throttle } from "lodash";
import { getRouteContext } from "@/ContextApi/SrcDstRouteContext";

interface User {
  id: string;
  username: string;
  latitude: number;
  longitude: number;
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

  useEffect(() => {
    // Initialize Socket.io client
    const newSocket = socketIo(import.meta.env.VITE_SOCKET_URL as string);
    setSocket(newSocket);

    setRideCoords(srcDstRoute?.data?.routes[0]?.geometry?.coordinates);

    // Handle socket connection
    newSocket.on("connect", () => {
      console.log("Connected to server");
      // Emit 'join' event with user details
      newSocket.emit("join", {
        id: newSocket.id, // Using socket ID as user ID for simplicity
        username,
        latitude: 0, // Initial stationary position
        longitude: 0,
        rideCoords: rideCoords,
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
  }, [username, rideCoords]);

  useEffect(() => {
    if (!socket) return;

    // Throttled function to emit location updates
    const emitLocation = throttle((latitude: number, longitude: number) => {
      if (socket) {
        socket.emit("locationUpdate", {
          id: socket.id || "",
          latitude,
          longitude,
        });
      }
    }, 1000); // Adjust the throttle duration as needed

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
  }, [socket, username]);

  return { currentUser, users, rideCoords, error };
};
