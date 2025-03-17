import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { SERVER_URL } from "@/components/utils/constants";

interface User {
  avatar?: string;
  username?: string | null;
  // Add other properties as needed
}

interface AuthContextType {
  user: User | null;
  loginUser: (userData: object) => void;
  logoutUser: () => void;
  fetchUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
  fetchUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);
  const navigate = useNavigate();

  const loginUser = async (userData: object) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/user/signin`,
        userData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        console.log(response);
        setUser(response.data.user);
        localStorage.setItem("user",JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/v1/user/getUser`, {
        withCredentials: true,
      });
      if (response.data.success) {
        console.log(response)
        setUser(response.data.user);
        localStorage.setItem("user",JSON.stringify(response.data.user));
      } else {
        console.log("Unable to featch User")
        navigate("/signin");
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      navigate("/signin");
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
