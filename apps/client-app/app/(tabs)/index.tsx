import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { WelcomeHeader, UserInfo, Button, TokenDisplay } from "../../components";
import { useTokenRefresh } from "../../hooks";
import { commonStyles, typography } from "../../styles/theme";

export default function HomeScreen() {
  const { user, accessToken } = useAuth();
  const { handleRefreshToken } = useTokenRefresh();

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

        {accessToken && <TokenDisplay accessToken={accessToken} />}

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
