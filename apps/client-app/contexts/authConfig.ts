import { Platform } from "react-native";

// Keycloak configuration - determine URLs based on platform and build type
const getKeycloakConfig = () => {
  // For iOS Simulator in development, use localhost
  if (Platform.OS === "ios" && __DEV__) {
    return {
      baseUrl: "http://localhost:8080",
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "exp://localhost:8081", // Development uses exp:// scheme
      authServerUrl: "http://localhost:4000",
    };
  }

  // For Android Emulator in development, use 10.0.2.2
  if (Platform.OS === "android" && __DEV__) {
    return {
      baseUrl: "http://10.0.2.2:8080",
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "exp://10.0.2.2:8081", // Development uses exp:// scheme
      authServerUrl: "http://10.0.2.2:4000",
    };
  }

  // For production builds (both iOS and Android)
  if (!__DEV__ && Platform.OS !== "web") {
    return {
      baseUrl: "http://192.168.233.174:8080", // Your production Keycloak URL
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "com.anonymous.clientapp://", // Production uses native app scheme
      authServerUrl: "http://192.168.233.174:4000", // Your production auth server URL
    };
  }

  // For web or fallback, use the actual IP
  return {
    baseUrl: "http://192.168.233.174:8080",
    realm: "WorkshopRealm",
    clientId: "client-app",
    redirectUri: "exp://192.168.233.174:8081",
    authServerUrl: "http://192.168.233.174:4000",
  };
};

export const KEYCLOAK_CONFIG = getKeycloakConfig();

// Export individual values for convenience
export const {
  baseUrl: KEYCLOAK_BASE_URL,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID,
  redirectUri: KEYCLOAK_REDIRECT_URI,
  authServerUrl: AUTH_SERVER_URL,
} = KEYCLOAK_CONFIG;
