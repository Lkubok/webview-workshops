import React, { useEffect } from "react";
import { View, Text, Button, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useAuth } from "../../contexts/AuthContext";

// Required for Expo AuthSession to properly handle redirects
WebBrowser.maybeCompleteAuthSession();

// ---------- Keycloak Configuration ----------
const KEYCLOAK_ISSUER = "http://localhost:8080/realms/WorkshopRealm";
// Use your machine IP for mobile testing, not localhost
const CLIENT_ID = "client-app";

// ---------- Login Page ----------
export default function LoginPage() {
  const { login } = useAuth();

  // ---------- Platform-specific redirect URI ----------
  const redirectUri = Platform.select({
    web: `${window.location.origin}/auth/callback`, // Web must use a real URL
    default: AuthSession.makeRedirectUri({
      preferLocalhost: true,
    }), // Mobile (Expo Go)
  });

  console.log("Redirect URI:", redirectUri);

  // ---------- Keycloak OAuth2 discovery ----------
  const discovery = {
    authorizationEndpoint: `${KEYCLOAK_ISSUER}/protocol/openid-connect/auth`,
    tokenEndpoint: `${KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
  };

  // ---------- Create the auth request ----------
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri,
      responseType: "token", // Implicit flow
      scopes: ["openid", "profile", "email"],
    },
    discovery
  );

  // ---------- Handle the login result ----------
  useEffect(() => {
    if (result?.type === "success" && result.params.access_token) {
      // Save the token in your AuthContext
      login(result.params.access_token);
    }
  }, [result]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 16 }}>
        Login with Keycloak
      </Text>
      <Button
        title="Login"
        disabled={!request}
        onPress={() => promptAsync({ promptAsync: false })}
      />
      {Platform.OS === "web" && (
        <Text style={{ marginTop: 12, fontSize: 12, color: "gray" }}>
          On web, redirect URI must match Keycloak client config
        </Text>
      )}
    </View>
  );
}
