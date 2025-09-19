import React, { useEffect } from "react";
import { View, Text } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthCallback() {
  const { login } = useAuth();

  useEffect(() => {
    const handleResult = async () => {
      const result = await AuthSession.getRedirectResult(); // reads code/token from URL
      if (result?.type === "success" && result.params.access_token) {
        login(result.params.access_token);
      }
    };
    handleResult();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Logging in...</Text>
    </View>
  );
}
