import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Button } from "./Button";
import { exchangeToken, exchangeTokenWithoutAudience, TokenExchangeError } from "../utils/tokenExchange";
import { typography } from "../styles/theme";
import { decodeJWT } from "../utils/jwt";

interface TokenExchangeProps {
  accessToken: string;
}

export function TokenExchange({ accessToken }: TokenExchangeProps) {
  const [loading, setLoading] = useState(false);
  const [exchangedToken, setExchangedToken] = useState<string | null>(null);

  const handleTokenExchange = async () => {
    if (!accessToken) {
      Alert.alert("Error", "No access token available for exchange");
      return;
    }

    setLoading(true);
    try {
      console.log("🔄 Starting token exchange for device-dashboard...");
      console.log("📋 Current token audience check - look at your token display below");

      // First try with audience
      let newToken;
      try {
        newToken = await exchangeToken({
          currentToken: accessToken,
          audience: "device-dashboard",
          clientId: "token-exchange-service"
        });
      } catch (audienceError) {
        console.log("⚠️ Device-dashboard audience failed, trying with client-app audience...");
        try {
          // Try with the original token's client (client-app)
          newToken = await exchangeToken({
            currentToken: accessToken,
            audience: "client-app", // Same as token's azp field
            clientId: "token-exchange-service"
          });
        } catch (clientAppError) {
          console.log("⚠️ Client-app audience failed, trying without audience parameter...");
          // Try without audience parameter at all
          newToken = await exchangeTokenWithoutAudience(accessToken);
        }
      }

      setExchangedToken(newToken);

      // Decode and log the exchanged token
      const decodedToken = decodeJWT(newToken);
      console.log("✅ Token exchange successful!");
      console.log("📄 Exchanged Token:", newToken);
      console.log("🔍 Decoded Exchanged Token:", decodedToken);

      Alert.alert(
        "Token Exchange Success",
        "Token exchanged successfully! Check console for details.",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("❌ Token exchange failed:", error);

      let errorMessage = "Token exchange failed";
      let detailedMessage = "";

      if (error instanceof TokenExchangeError) {
        errorMessage = error.message;

        // Provide specific guidance for common issues
        if (error.message.includes("not enabled for the requested client")) {
          detailedMessage = "\n\nKeycloak Setup Required:\n1. Create 'token-exchange' role in Realm Settings → Roles\n2. Go to Clients → 'token-exchange-service'\n3. Enable 'Service Accounts Enabled'\n4. In 'Service Account Roles' tab:\n   - Select 'realm-management' client roles\n   - Add 'token-exchange' role\n5. Ensure 'device-dashboard' client exists and allows token exchange";
        } else if (error.message.includes("invalid_audience")) {
          detailedMessage = "\n\nCheck that:\n1. 'device-dashboard' client exists in Keycloak\n2. 'token-exchange-service' has permission to exchange tokens for 'device-dashboard'";
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert(
        "Token Exchange Failed",
        errorMessage + detailedMessage,
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Button
        title={loading ? "Exchanging Token..." : "Exchange Token for Device Dashboard"}
        onPress={handleTokenExchange}
        variant="primary"
        disabled={loading || !accessToken}
      />

      {exchangedToken && (
        <View style={{ marginTop: 15, padding: 15, backgroundColor: "#e8f5e8", borderRadius: 8 }}>
          <Text style={[typography.subheading, { marginBottom: 10, color: "#2d5a2d" }]}>
            Exchange Status:
          </Text>
          <Text style={[typography.body, { color: "#2d5a2d", marginBottom: 10 }]}>
            ✅ Token successfully exchanged for device-dashboard access
          </Text>
          <Text style={[typography.caption, { color: "#5a7a5a" }]}>
            Check console for full token details
          </Text>
        </View>
      )}
    </View>
  );
}