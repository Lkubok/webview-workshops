import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components";
import { useConnectionTest } from "../../hooks";
import { commonStyles, typography, spacing } from "../../styles/theme";

export default function LoginScreen() {
  const { login } = useAuth();
  const [isLogging, setIsLogging] = useState(false);
  const { testConnection } = useConnectionTest();

  const handleLogin = async () => {
    try {
      setIsLogging(true);
      await login();
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert(
        "Login Failed",
        "Unable to log in. Please check your connection and try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <View style={[commonStyles.container, commonStyles.center]}>
      <View style={commonStyles.content}>
        <View style={{ alignItems: 'center', marginBottom: 60 }}>
          <Text style={[typography.title, { marginBottom: spacing.sm }]}>
            Welcome
          </Text>
          <Text style={[typography.bodySecondary, commonStyles.textCenter]}>
            Sign in to continue
          </Text>
        </View>

        <Button
          title="Sign in with Keycloak"
          onPress={handleLogin}
          loading={isLogging}
          style={{ marginBottom: spacing.xl }}
        />

        <Text style={[typography.caption, commonStyles.textCenter, { lineHeight: 20, marginBottom: spacing.lg }]}>
          You will be redirected to Keycloak to sign in securely.
        </Text>

        <Button
          title="Test Connection"
          onPress={testConnection}
          variant="ghost"
          size="small"
        />
      </View>
    </View>
  );
}
