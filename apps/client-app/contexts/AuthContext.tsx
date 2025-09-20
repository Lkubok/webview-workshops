import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Platform } from "react-native";

// Storage utility functions that work across platforms
const StorageUtils = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    } else {
      try {
        return await SecureStore.getItemAsync(key);
      } catch {
        return null;
      }
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn("Failed to store item in localStorage:", error);
      }
    } else {
      try {
        await SecureStore.setItemAsync(key, value);
      } catch (error) {
        console.warn("Failed to store item in SecureStore:", error);
      }
    }
  },

  async deleteItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn("Failed to remove item from localStorage:", error);
      }
    } else {
      try {
        await SecureStore.deleteItemAsync(key);
      } catch (error) {
        console.warn("Failed to remove item from SecureStore:", error);
      }
    }
  },
};
const KEYCLOAK_CONFIG = {
  baseUrl: "http://192.168.233.174:8080",
  realm: "WorkshopRealm", // Replace with your realm
  clientId: "client-app", // Your client ID
  redirectUri: "exp://192.168.233.174:8081", // Expo development server
};

interface User {
  sub: string;
  preferred_username?: string;
  email?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const accessToken = await StorageUtils.getItem("access_token");
      const refreshTokenValue = await StorageUtils.getItem("refresh_token");

      if (accessToken && refreshTokenValue) {
        // Validate token and get user info
        const userInfo = await getUserInfo(accessToken);
        if (userInfo) {
          setUser(userInfo);
        } else {
          // Token might be expired, try refresh
          await refreshToken();
        }
      }
    } catch (error) {
      console.error("Error loading stored auth:", error);
      await clearStoredAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInfo = async (accessToken: string): Promise<User | null> => {
    try {
      const response = await fetch(
        `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error("Error getting user info:", error);
      return null;
    }
  };

  const login = async () => {
    try {
      // Check if we're on web platform
      if (Platform.OS === "web") {
        // For web, redirect to Keycloak login page
        const state = Math.random().toString(36).substring(7);
        const authUrl =
          `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/auth?` +
          `client_id=${KEYCLOAK_CONFIG.clientId}&` +
          `redirect_uri=${encodeURIComponent(window.location.origin + "/auth-callback")}&` +
          `response_type=code&` +
          `scope=openid profile email&` +
          `state=${state}`;

        // Store state for validation
        localStorage.setItem("auth_state", state);
        window.location.href = authUrl;
        return;
      }

      // For React Native, use expo-auth-session
      const { AuthRequest, AuthRequestConfig, makeRedirectUri } = await import(
        "expo-auth-session"
      );

      const redirectUri = makeRedirectUri({
        scheme: "exp",
        path: "/auth-callback",
      });

      const config: AuthRequestConfig = {
        clientId: KEYCLOAK_CONFIG.clientId,
        scopes: ["openid", "profile", "email"],
        redirectUri,
        responseType: "code",
        additionalParameters: {},
        extraParams: {},
      };

      const authUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/auth`;
      const tokenUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`;

      const request = new AuthRequest(config);

      const result = await request.promptAsync({
        authorizationEndpoint: authUrl,
        tokenEndpoint: tokenUrl,
      });

      if (result.type === "success" && result.params.code) {
        await exchangeCodeForTokens(result.params.code, redirectUri, request);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const exchangeCodeForTokens = async (
    code: string,
    redirectUri: string,
    request?: any
  ) => {
    try {
      const tokenUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`;

      const bodyParams: any = {
        grant_type: "authorization_code",
        client_id: KEYCLOAK_CONFIG.clientId,
        code,
        redirect_uri: redirectUri,
      };

      // Add code_verifier for PKCE if available (React Native)
      if (request?.codeVerifier) {
        bodyParams.code_verifier = request.codeVerifier;
      }

      const body = new URLSearchParams(bodyParams);

      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (response.ok) {
        const tokens = await response.json();
        await storeTokens(tokens);

        // Get user info
        const userInfo = await getUserInfo(tokens.access_token);
        if (userInfo) {
          setUser(userInfo);
        }
      } else {
        throw new Error("Failed to exchange code for tokens");
      }
    } catch (error) {
      console.error("Token exchange error:", error);
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = await StorageUtils.getItem("refresh_token");
      if (!refreshTokenValue) {
        throw new Error("No refresh token available");
      }

      const tokenUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`;

      const body = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: KEYCLOAK_CONFIG.clientId,
        refresh_token: refreshTokenValue,
      });

      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (response.ok) {
        const tokens = await response.json();
        await storeTokens(tokens);

        // Get updated user info
        const userInfo = await getUserInfo(tokens.access_token);
        if (userInfo) {
          setUser(userInfo);
        }
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      await logout();
      throw error;
    }
  };

  const logout = async () => {
    try {
      const accessToken = await StorageUtils.getItem("access_token");

      if (accessToken) {
        // Call Keycloak logout endpoint
        const logoutUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/logout`;

        await fetch(logoutUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
          },
          body: new URLSearchParams({
            client_id: KEYCLOAK_CONFIG.clientId,
          }),
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      await clearStoredAuth();
      setUser(null);
      router.replace("/login");
    }
  };

  const storeTokens = async (tokens: any) => {
    await StorageUtils.setItem("access_token", tokens.access_token);
    if (tokens.refresh_token) {
      await StorageUtils.setItem("refresh_token", tokens.refresh_token);
    }
    if (tokens.expires_in) {
      const expiryTime = Date.now() + tokens.expires_in * 1000;
      await StorageUtils.setItem("token_expiry", expiryTime.toString());
    }
  };

  const clearStoredAuth = async () => {
    await StorageUtils.deleteItem("access_token");
    await StorageUtils.deleteItem("refresh_token");
    await StorageUtils.deleteItem("token_expiry");
    if (Platform.OS === "web") {
      await StorageUtils.deleteItem("auth_state");
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
