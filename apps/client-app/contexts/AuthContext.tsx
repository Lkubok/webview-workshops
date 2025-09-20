import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { router } from "expo-router";
import { Platform } from "react-native";
import StorageUtils from "./StorageUtils";
import { performCompleteLogout } from "./keycloakUtils";
import { KEYCLOAK_CONFIG } from "./authConfig";

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
  accessToken: string | null; // 👈 added
  refreshTokenValue: string | null; // 👈 optional
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(
    null
  );

  const getUserInfo = useCallback(
    async (token: string): Promise<User | null> => {
      try {
        const res = await fetch(
          `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/userinfo`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        console.error("Error getting user info:", e);
        return null;
      }
    },
    []
  );

  const storeTokens = useCallback(async (tokens: any) => {
    await StorageUtils.setItem("access_token", tokens.access_token);
    if (tokens.refresh_token)
      await StorageUtils.setItem("refresh_token", tokens.refresh_token);
    console.log("tokens", tokens);
    if (tokens.expires_in) {
      const expiry = Date.now() + tokens.expires_in * 1000;
      await StorageUtils.setItem("token_expiry", expiry.toString());
    }

    // 👇 update state
    setAccessToken(tokens.access_token);
    setRefreshTokenValue(tokens.refresh_token ?? null);
  }, []);

  const clearStoredAuth = useCallback(async () => {
    await StorageUtils.deleteItem("access_token");
    await StorageUtils.deleteItem("refresh_token");
    await StorageUtils.deleteItem("token_expiry");
    if (Platform.OS === "web") await StorageUtils.deleteItem("auth_state");
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const refreshTokenValue = await StorageUtils.getItem("refresh_token");
      if (!refreshTokenValue) throw new Error("No refresh token available");

      const res = await fetch(`${KEYCLOAK_CONFIG.authServerUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshTokenValue }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Token refresh failed");
      }

      const tokens = await res.json();
      await storeTokens(tokens);
      const userInfo = await getUserInfo(tokens.access_token);
      if (userInfo) setUser(userInfo);
    } catch (e) {
      console.error("Token refresh error:", e);
      await logout();
      throw e;
    }
  }, [getUserInfo, storeTokens]);

  const exchangeCodeForTokens = useCallback(
    async (code: string, redirectUri: string, request?: any) => {
      try {
        const payload: any = { code, redirectUri };
        if (request?.codeVerifier) payload.code_verifier = request.codeVerifier;
        const res = await fetch(
          `${KEYCLOAK_CONFIG.authServerUrl}/auth/exchange`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Token exchange failed");
        }
        const tokens = await res.json();
        await storeTokens(tokens);
        const userInfo = await getUserInfo(tokens.access_token);
        if (userInfo) setUser(userInfo);
      } catch (e) {
        console.error("Token exchange error:", e);
        throw e;
      }
    },
    [getUserInfo, storeTokens]
  );

  const login = useCallback(async () => {
    try {
      if (Platform.OS === "web") {
        const state = Math.random().toString(36).substring(7);
        const authUrl =
          `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/auth?` +
          `client_id=${KEYCLOAK_CONFIG.clientId}&redirect_uri=${encodeURIComponent(window.location.origin + "/auth-callback")}` +
          `&response_type=code&scope=openid profile email&state=${state}`;
        localStorage.setItem("auth_state", state);
        window.location.href = authUrl;
        return;
      }

      const { AuthRequest, makeRedirectUri } = await import(
        "expo-auth-session"
      );
      // Import type for AuthRequestConfig
      type AuthRequestConfig = import("expo-auth-session").AuthRequestConfig;

      const redirectUri = makeRedirectUri({
        scheme: "exp",
        path: "/auth-callback",
      });

      const config: AuthRequestConfig = {
        clientId: KEYCLOAK_CONFIG.clientId,
        scopes: ["openid", "profile", "email"],
        redirectUri,
        responseType: "code",
      };

      const request = new AuthRequest(config);

      const authUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/auth`;
      // const tokenUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`;

      const result = await request.promptAsync({
        authorizationEndpoint: authUrl,
      });

      if (result.type === "success" && result.params.code) {
        await exchangeCodeForTokens(result.params.code, redirectUri, request);
      } else {
        throw new Error(
          result.type === "error"
            ? (result.params?.error_description ?? "Authentication failed")
            : "Authentication cancelled"
        );
      }
    } catch (e) {
      console.error("Login error:", e);
      throw e;
    }
  }, [exchangeCodeForTokens]);

  const logout = useCallback(async () => {
    try {
      const accessToken = await StorageUtils.getItem("access_token");
      const refreshTokenValue = await StorageUtils.getItem("refresh_token");

      if (accessToken || refreshTokenValue) {
        await performCompleteLogout(
          KEYCLOAK_CONFIG.authServerUrl,
          KEYCLOAK_CONFIG,
          {
            accessToken: accessToken ?? undefined,
            refreshToken: refreshTokenValue ?? undefined,
          }
        );
      }
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      await clearStoredAuth();
      setUser(null);
      router.replace("/login");
      if (Platform.OS === "web")
        setTimeout(() => window.location.reload(), 100);
    }
  }, [clearStoredAuth]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const access = await StorageUtils.getItem("access_token");
        const refresh = await StorageUtils.getItem("refresh_token");
        setAccessToken(access);
        setRefreshTokenValue(refresh);

        if (access && refresh) {
          const userInfo = await getUserInfo(access);
          if (userInfo) {
            setUser(userInfo);
          } else {
            await refreshToken();
          }
        }
      } catch (e) {
        console.error("Load stored auth error:", e);
        await clearStoredAuth();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getUserInfo, refreshToken, clearStoredAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        refreshToken,
        accessToken,
        refreshTokenValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
