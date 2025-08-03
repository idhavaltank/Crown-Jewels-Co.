"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/Redux/slices/userSlice";

interface UserInfo {
  email: string | null;
  isStaff: boolean;
  permissions: string[];
}

interface AuthData {
  token: string;
  user: UserInfo;
}

interface AuthContextType {
  token: string | null;
  login: (tokenData: {
    token: string;
    user: {
      email: string | null;
      isStaff: boolean;
      userPermissions: { code: string }[];
    };
  }) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);

  // Load full auth data (token + user) from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("authData");
    if (savedAuth) {
      try {
        const tokenData: AuthData = JSON.parse(savedAuth);

        const newToken = tokenData.token;
        setToken(newToken);
        const userInfo: UserInfo = {
          email: tokenData.user.email,
          isStaff: tokenData.user.isStaff,
          permissions: tokenData.user.permissions || [],
        };
        dispatch(setUser({ ...userInfo, token: newToken }));
      } catch (err) {
        console.error("Failed to parse auth data from localStorage", err);
        localStorage.removeItem("authData"); // Clean up corrupt data
      }
    }
  }, [dispatch]);

  // Save full auth data to localStorage when token or user changes
  // We only save on login/logout so this logic is inside login/logout functions.

  const login = (tokenData: {
    token: string;
    user: {
      email: string | null;
      isStaff: boolean;
      userPermissions: { code: string }[];
    };
  }) => {
    const newToken = tokenData.token;
    setToken(newToken);

    const userInfo: UserInfo = {
      email: tokenData.user.email,
      isStaff: tokenData.user.isStaff,
      permissions: tokenData.user.userPermissions.map((p) => p.code),
    };

    const authData: AuthData = { token: newToken, user: userInfo };
    // Persist full auth data in localStorage
    localStorage.setItem("authData", JSON.stringify(authData));
    // Update Redux store
    dispatch(setUser({ ...userInfo, token: newToken }));
  };

  const logout = () => {
    setToken(null);
    dispatch(clearUser());
    localStorage.removeItem("authData");
  };

  const isLoggedIn = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenience
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
