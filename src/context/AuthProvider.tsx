import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface AuthContextType{
  auth: string |null,
  login: (token: string) => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  login:  () => {},
  logout: () => {}
});

interface AuthProviderProps {
    children?: JSX.Element 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<string | null>(null);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const token = cookie.token;
    if (token) {
      setAuth(token);
    }
  }, [cookie]);

  const login = (token: string) => {
    setAuth(token);
    setCookie("token", token);
  };

  const logout = () => {
    setAuth(null);
    removeCookie("token");
  };
  
  const authContextValue: AuthContextType = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};