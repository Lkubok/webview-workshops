//TODO: add web proper auth config
import { Platform } from "react-native";
import Constants from "expo-constants";

// Keycloak configuration - determine URLs based on platform and build type
const getKeycloakConfig = () => {
  // For iOS (both Simulator and Device)
  if (Platform.OS === "ios") {
    const hostIP = Constants.isDevice ? "192.168.233.174" : "192.168.233.174";
    return {
      baseUrl: `http://plague.dev/idm`, // Use your Keycloak server URL
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "com.anonymous.clientapp://auth-callback", // Always use native scheme for expo-prebuild
      authServerUrl: `http://${hostIP}:4000`,
    };
  }

  // For Android Emulator in development, use 10.0.2.2
  if (Platform.OS === "android" && __DEV__) {
    return {
      baseUrl: "http://10.0.2.2:8080",
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "com.anonymous.clientapp://auth-callback", // Always use native scheme for expo-prebuild
      authServerUrl: "http://10.0.2.2:4000",
    };
  }

  // For Android production
  if (Platform.OS === "android") {
    return {
      baseUrl: "http://192.168.233.174:8080",
      realm: "WorkshopRealm",
      clientId: "client-app",
      redirectUri: "com.anonymous.clientapp://auth-callback",
      authServerUrl: "http://192.168.233.174:4000",
    };
  }

  // For web or fallback
  const hostIP = Constants.isDevice ? "192.168.233.174" : "192.168.233.174";

  return {
    baseUrl: `http://plague.dev/idm`, // Use your Keycloak server URL
    realm: "WorkshopRealm",
    clientId: "client-app",
    redirectUri: "exp://192.168.233.174:8081",
    // redirectUri: "exp://localhost:8081/auth-callback", // For web, use localhost or your dev machine IP
    // redirectUri: "http://localhost:8081/auth-callback",
    authServerUrl: `http://${hostIP}:4000`,
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
