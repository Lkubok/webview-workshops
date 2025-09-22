import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { WelcomeHeader, UserInfo, Button } from "../../components";
import { useTokenRefresh } from "../../hooks";
import { commonStyles, typography } from "../../styles/theme";

function decodeJWT(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function HomeScreen() {
  const { user, accessToken } = useAuth();
  const { handleRefreshToken } = useTokenRefresh();

  const decodedToken = accessToken ? decodeJWT(accessToken) : null;

  console.log("Access Token in HomeScreen: ", accessToken);

  return (
    <ScrollView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <WelcomeHeader user={user} />

        <UserInfo user={user} />

        <Button
          title="Refresh Token"
          onPress={handleRefreshToken}
          variant="secondary"
        />

        {accessToken && (
          <View
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
            }}
          >
            {decodedToken && (
              <>
                <Text style={[typography.subheading, { marginBottom: 10 }]}>
                  Token Timestamps:
                </Text>
                {decodedToken.iat && (
                  <Text style={[typography.body, { marginBottom: 5 }]}>
                    Issued At: {formatTimestamp(decodedToken.iat)}
                  </Text>
                )}
                {decodedToken.auth_time && (
                  <Text style={[typography.body, { marginBottom: 5 }]}>
                    Auth Time: {formatTimestamp(decodedToken.auth_time)}
                  </Text>
                )}
                {decodedToken.exp && (
                  <Text style={[typography.body, { marginBottom: 15 }]}>
                    Expires: {formatTimestamp(decodedToken.exp)}
                  </Text>
                )}

                <Text style={[typography.subheading, { marginBottom: 10 }]}>
                  Decoded JWT Values:
                </Text>
                <Text style={[typography.body, { fontSize: 12 }]} selectable>
                  {JSON.stringify(decodedToken, null, 2)}
                </Text>
              </>
            )}
            <Text style={[typography.subheading, { marginBottom: 10 }]}>
              Current Token:
            </Text>
            <Text
              style={[typography.body, { fontSize: 12, marginBottom: 15 }]}
              selectable
            >
              {accessToken}
            </Text>
          </View>
        )}

        <Text
          style={[
            typography.bodySecondary,
            commonStyles.textCenter,
            { lineHeight: 24 },
          ]}
        >
          You are successfully authenticated with Keycloak! This is a protected
          route that requires authentication.
        </Text>
      </View>
    </ScrollView>
  );
}
