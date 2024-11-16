import { createContext, useState, useEffect } from "react";
import { ReactNode } from "react";

const AuthContext = createContext<{
  user: object | null;
  loginUser: (userData: object) => void;
  logoutUser: () => void;
}>({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);

  const loginUser = (userData: object) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
