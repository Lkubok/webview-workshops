import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { Platform } from "react-native";
import StorageUtils from "../contexts/StorageUtils";

export default function AuthCallbackScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleAuthCallback();
  }, []);

  const handleAuthCallback = async () => {
    try {
      if (Platform.OS === "web") {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const error = urlParams.get("error");

        if (error) {
          setError(`Authentication error: ${error}`);
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }

        if (!code) {
          setError("No authorization code received");
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }

        const storedState = await StorageUtils.getItem("auth_state");
        if (storedState && state !== storedState) {
          setError("Invalid state parameter");
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }
        await exchangeCodeForTokens(code);
        await StorageUtils.deleteItem("auth_state");

        // Wait a brief moment for the auth context to pick up the stored tokens
        setTimeout(() => router.replace("/"), 200);
      } else {
        router.replace("/login");
      }
    } catch (error) {
      console.error("Auth callback error:", error);
      setError("Failed to complete authentication");
      setTimeout(() => router.replace("/login"), 3000);
    }
  };

  const exchangeCodeForTokens = async (code: string) => {
    const KEYCLOAK_CONFIG = {
      authServerUrl: "http://localhost:4000",
    };

    const response = await fetch(
      `${KEYCLOAK_CONFIG.authServerUrl}/auth/exchange`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          redirectUri: window.location.origin + "/auth-callback",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to exchange code for tokens");
    }

    const tokens = await response.json();

    // Use the same storage mechanism as the rest of the app
    await StorageUtils.setItem("access_token", tokens.access_token);
    if (tokens.refresh_token) {
      await StorageUtils.setItem("refresh_token", tokens.refresh_token);
    }
    if (tokens.expires_in) {
      const expiryTime = Date.now() + tokens.expires_in * 1000;
      await StorageUtils.setItem("token_expiry", expiryTime.toString());
    }

    // Notify the auth context that tokens have been stored
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('authTokensStored'));
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>
        {error ? error : "Completing authentication..."}
      </Text>
      {error && (
        <Text style={styles.subText}>
          Redirecting to login in a few seconds...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  subText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
});
