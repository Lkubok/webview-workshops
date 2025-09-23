import { Platform } from "react-native";

const getKeycloakConfig = () => {
  if (Platform.OS === "ios") {
    return {
      baseUrl: `http://plague.dev/idm`,
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "com.anonymous.clientapp://auth-callback", // Always use native scheme for expo-prebuild
      authServerUrl: `http://localhost:4000`,
      tokenExchangeClientSecret: "yZpLi8GqtwwXYQebJuulZSC0Kb8IcDJJ", // Replace with actual secret
    };
  }

  // For Android Emulator in development, use 10.0.2.2
  if (Platform.OS === "android" && __DEV__) {
    return {
      baseUrl: `http://plague.dev/idm`,
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "com.anonymous.clientapp://auth-callback", // Always use native scheme for expo-prebuild
      authServerUrl: "http://10.0.2.2:4000",
      tokenExchangeClientSecret: "yZpLi8GqtwwXYQebJuulZSC0Kb8IcDJJ", // Replace with actual secret
    };
  }

  if (Platform.OS === "android") {
    return {
      baseUrl: `http://plague.dev/idm`,
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "com.anonymous.clientapp://auth-callback",
      authServerUrl: "http://localhost:4000",
      tokenExchangeClientSecret: "yZpLi8GqtwwXYQebJuulZSC0Kb8IcDJJ", // Replace with actual secret
    };
  }

  // Web platform configuration
  if (Platform.OS === "web") {
    return {
      baseUrl: `http://plague.dev/idm`,
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "http://localhost:8081/auth-callback", // Expo web runs on port 8081
      authServerUrl: "http://localhost:4000",
      tokenExchangeClientSecret: "yZpLi8GqtwwXYQebJuulZSC0Kb8IcDJJ", // Replace with actual secret
    };
  }

  return {
    baseUrl: `http://plague.dev/idm`,
    realm: "WorkshopRealm",
    clientId: "client-app",
    redirectUri: "exp://192.168.233.174:8081",
    authServerUrl: `http://localhost:4000`,
    tokenExchangeClientSecret: "yZpLi8GqtwwXYQebJuulZSC0Kb8IcDJJ", // Replace with actual secret
  };
};

export const KEYCLOAK_CONFIG = getKeycloakConfig();

export const {
  baseUrl: KEYCLOAK_BASE_URL,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID,
  redirectUri: KEYCLOAK_REDIRECT_URI,
  authServerUrl: AUTH_SERVER_URL,
} = KEYCLOAK_CONFIG;
