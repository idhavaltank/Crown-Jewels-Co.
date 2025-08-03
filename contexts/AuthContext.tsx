"use client";

// 1. React core libraries
import React, { createContext, useContext, useEffect, useState } from "react";

// 2. Redux
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/Redux/slices/userSlice";

// 3. Types
import { AuthContextType, AuthData, UserInfo } from "./types/authContext.types";

// 4. Create AuthContext with undefined default to enforce usage within AuthProvider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 5. AuthProvider component providing authentication state and actions
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  // 2. Local state to store current auth token
  const [token, setToken] = useState<string | null>(null);

  // 3. useEffect: On mount, load saved auth data (token + user) from localStorage
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
        // Remove corrupt stored data to avoid repeated errors
        localStorage.removeItem("authData");
      }
    }
  }, [dispatch]);

  // 4. Function to handle login, saving token and user info
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

    // Convert permissions from userPermissions to array of codes
    const userInfo: UserInfo = {
      email: tokenData.user.email,
      isStaff: tokenData.user.isStaff,
      permissions: tokenData.user.userPermissions.map((p) => p.code),
    };

    const authData: AuthData = { token: newToken, user: userInfo };

    // Persist full auth data in localStorage
    localStorage.setItem("authData", JSON.stringify(authData));

    // Update Redux store user slice
    dispatch(setUser({ ...userInfo, token: newToken }));
  };

  // 5. Function to logout user and clear auth info from state, localStorage, and Redux
  const logout = () => {
    setToken(null);
    dispatch(clearUser());
    localStorage.removeItem("authData");
  };

  // 6. Boolean indicating if the user is considered logged in
  const isLoggedIn = Boolean(token);

  // 7. Provide auth context value to children components
  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// 8. Custom hook to safely consume the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
