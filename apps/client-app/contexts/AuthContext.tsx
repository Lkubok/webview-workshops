import React, { createContext, useContext, useEffect, useMemo } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { AuthContextType } from "../types/auth";
import { useAuthState } from "../hooks/useAuthState";
import { useLoginFlow } from "../hooks/useLoginFlow";
import { useTokenManagement } from "../hooks/useTokenManagement";
import { PlatformAuthService } from "../services/platformAuthService";

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize auth state management
  const authState = useAuthState();
  const { actions } = authState;

  // Initialize authentication flows
  const { login, logout } = useLoginFlow(actions);
  const { refreshToken, exchangeTokenForDeviceDashboard, loadStoredAuth } = useTokenManagement(actions, {
    autoRefreshEnabled: false, // Disable auto-refresh to prevent loops
  });

  // Log platform configuration on initialization
  useEffect(() => {
    const config = PlatformAuthService.getPlatformConfig();
    console.log("AuthProvider initialized with config:", {
      ...config,
      isDevice: Constants.isDevice,
      isIOSSimulator: Platform.OS === "ios" && !Constants.isDevice,
    });
  }, []);

  // Load stored authentication state on mount
  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  // Provide authentication context (memoized to prevent unnecessary re-renders)
  const contextValue = useMemo<AuthContextType>(() => ({
    user: authState.user,
    isLoading: authState.isLoading,
    accessToken: authState.accessToken,
    refreshTokenValue: authState.refreshTokenValue,
    login,
    logout,
    refreshToken,
    exchangeTokenForDeviceDashboard,
  }), [
    authState.user,
    authState.isLoading,
    authState.accessToken,
    authState.refreshTokenValue,
    login,
    logout,
    refreshToken,
    exchangeTokenForDeviceDashboard,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
