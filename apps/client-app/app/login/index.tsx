import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const KEYCLOAK_URL = "http://192.168.233.174:8080/realms/WorkshopRealm";
const CLIENT_ID = "client-app";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "myapp",
    useProxy: true,
  });

  const discovery = {
    authorizationEndpoint: `${KEYCLOAK_URL}/protocol/openid-connect/auth`,
    tokenEndpoint: `${KEYCLOAK_URL}/protocol/openid-connect/token`,
  };

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri,
      responseType: "token",
      scopes: ["openid", "profile", "email"],
    },
    discovery
  );

  useEffect(() => {
    if (result?.type === "success" && result.params.access_token) {
      login(result.params.access_token);
      router.replace("/"); // redirect to home after login
    }
  }, [result]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 16 }}>Login with Keycloak</Text>
      <Button
        title="Login"
        disabled={!request}
        onPress={() => promptAsync({ useProxy: true })}
      />
    </View>
  );
}
