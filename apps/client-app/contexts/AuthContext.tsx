import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Platform } from "react-native";

// Import logout utility (you can create this file or inline the function)
const performCompleteLogout = async (
  authServerUrl: string,
  keycloakConfig: any,
  tokens: any
) => {
  try {
    // Step 1: Call backend logout
    const response = await fetch(`${authServerUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      }),
    });

    const result = await response.json();
    console.log("Backend logout response:", result);

    // Step 2: For web, clear Keycloak session by calling logout in iframe
    if (Platform.OS === "web") {
      await clearKeycloakSession(keycloakConfig);
    }

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error };
  }
};

const clearKeycloakSession = (keycloakConfig: any): Promise<void> => {
  return new Promise((resolve) => {
    // Create hidden iframe to call Keycloak logout
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = `${keycloakConfig.baseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout?client_id=${keycloakConfig.clientId}`;

    iframe.onload = () => {
      document.body.removeChild(iframe);
      resolve();
    };

    iframe.onerror = () => {
      document.body.removeChild(iframe);
      resolve(); // Don't fail logout on iframe error
    };

    document.body.appendChild(iframe);

    // Cleanup after 5 seconds regardless
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
        resolve();
      }
    }, 5000);
  });
};

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
  authServerUrl: "http://192.168.233.174:4000",
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

  // Log configuration on startup
  useEffect(() => {
    console.log("AuthProvider initialized with config:", {
      platform: Platform.OS,
      isDev: __DEV__,
      baseUrl: KEYCLOAK_CONFIG.baseUrl,
      authServerUrl: KEYCLOAK_CONFIG.authServerUrl,
      realm: KEYCLOAK_CONFIG.realm,
    });
  }, []);

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

      // For React Native, first test network connectivity
      console.log("Testing network connectivity...");
      try {
        const healthCheck = await fetch(
          `${KEYCLOAK_CONFIG.authServerUrl}/health`,
          {
            method: "GET",
            timeout: 10000, // 10 second timeout
          }
        );
        console.log("Health check response:", healthCheck.status);
      } catch (healthError) {
        console.error("Health check failed:", healthError);
        throw new Error(
          `Cannot reach auth server at ${KEYCLOAK_CONFIG.authServerUrl}. Please check:\n1. Server is running\n2. Device can access ${KEYCLOAK_CONFIG.authServerUrl}\n3. No firewall blocking the connection`
        );
      }

      // Test Keycloak connectivity
      try {
        const keycloakHealthCheck = await fetch(
          `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}`,
          {
            method: "GET",
            timeout: 10000,
          }
        );
        console.log(
          "Keycloak health check response:",
          keycloakHealthCheck.status
        );
      } catch (keycloakError) {
        console.error("Keycloak health check failed:", keycloakError);
        throw new Error(
          `Cannot reach Keycloak at ${KEYCLOAK_CONFIG.baseUrl}. Please check:\n1. Keycloak is running\n2. Device can access ${KEYCLOAK_CONFIG.baseUrl}\n3. Realm 'WorkshopRealm' exists`
        );
      }

      // For React Native, use expo-auth-session
      const { AuthRequest, AuthRequestConfig, makeRedirectUri } = await import(
        "expo-auth-session"
      );

      const redirectUri = makeRedirectUri({
        scheme: "exp",
        path: "/auth-callback",
      });

      console.log("Using redirect URI:", redirectUri);

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

      console.log("Auth URL:", authUrl);

      const request = new AuthRequest(config);

      const result = await request.promptAsync({
        authorizationEndpoint: authUrl,
        tokenEndpoint: tokenUrl,
      });

      console.log("Auth result:", result);

      if (result.type === "success" && result.params.code) {
        await exchangeCodeForTokens(result.params.code, redirectUri, request);
      } else if (result.type === "error") {
        throw new Error(
          `Authentication failed: ${result.params?.error_description || result.params?.error || "Unknown error"}`
        );
      } else if (result.type === "cancel") {
        throw new Error("Authentication was cancelled");
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
      // Use your Node.js backend server for token exchange
      const exchangePayload: any = {
        code,
        redirectUri,
      };

      // Add code_verifier for PKCE if available (React Native)
      if (request?.codeVerifier) {
        exchangePayload.code_verifier = request.codeVerifier;
      }

      const response = await fetch(
        `${KEYCLOAK_CONFIG.authServerUrl}/auth/exchange`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exchangePayload),
        }
      );

      if (response.ok) {
        const tokens = await response.json();
        await storeTokens(tokens);

        // Get user info
        const userInfo = await getUserInfo(tokens.access_token);
        if (userInfo) {
          setUser(userInfo);
        }
      } else {
        const errorData = await response.json();
        console.error("Token exchange failed:", errorData);
        throw new Error(
          errorData.error || "Failed to exchange code for tokens"
        );
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

      const response = await fetch(
        `${KEYCLOAK_CONFIG.authServerUrl}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: refreshTokenValue,
          }),
        }
      );

      if (response.ok) {
        const tokens = await response.json();
        await storeTokens(tokens);

        // Get updated user info
        const userInfo = await getUserInfo(tokens.access_token);
        if (userInfo) {
          setUser(userInfo);
        }
      } else {
        const errorData = await response.json();
        console.error("Token refresh failed:", errorData);
        throw new Error(errorData.error || "Failed to refresh token");
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
      const refreshTokenValue = await StorageUtils.getItem("refresh_token");

      // Use the complete logout utility
      if (accessToken || refreshTokenValue) {
        await performCompleteLogout(
          KEYCLOAK_CONFIG.authServerUrl,
          KEYCLOAK_CONFIG,
          {
            accessToken,
            refreshToken: refreshTokenValue,
          }
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with local cleanup even if server logout fails
    } finally {
      // Always clear local state
      await clearStoredAuth();
      setUser(null);

      // Navigate to login
      router.replace("/login");

      // For web, force a page reload to ensure clean state
      if (Platform.OS === "web") {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
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
