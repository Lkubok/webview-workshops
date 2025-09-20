import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

// Keycloak configuration
const KEYCLOAK_CONFIG = {
  baseUrl: "http://192.168.233.174:8080",
  realm: "your-realm-name", // Replace with your realm
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
      const accessToken = await SecureStore.getItemAsync("access_token");
      const refreshTokenValue = await SecureStore.getItemAsync("refresh_token");

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
      // For React Native, we'll use the Authorization Code flow with PKCE
      const { AuthRequest, AuthRequestConfig, makeRedirectUri } = await import(
        "expo-auth-session"
      );
      const { AuthSession } = await import("expo-auth-session");

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
    request: any
  ) => {
    try {
      const tokenUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`;

      const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KEYCLOAK_CONFIG.clientId,
        code,
        redirect_uri: redirectUri,
        code_verifier: request.codeVerifier,
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
      const refreshTokenValue = await SecureStore.getItemAsync("refresh_token");
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
      const accessToken = await SecureStore.getItemAsync("access_token");

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
    await SecureStore.setItemAsync("access_token", tokens.access_token);
    if (tokens.refresh_token) {
      await SecureStore.setItemAsync("refresh_token", tokens.refresh_token);
    }
    if (tokens.expires_in) {
      const expiryTime = Date.now() + tokens.expires_in * 1000;
      await SecureStore.setItemAsync("token_expiry", expiryTime.toString());
    }
  };

  const clearStoredAuth = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("token_expiry");
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
