import { Platform } from "react-native";

export const clearKeycloakSession = (keycloakConfig: any): Promise<void> =>
  new Promise((resolve) => {
    if (Platform.OS !== "web") return resolve();
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = `${keycloakConfig.baseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout?client_id=${keycloakConfig.clientId}`;
    iframe.onload = () => {
      document.body.removeChild(iframe);
      resolve();
    };
    iframe.onerror = () => {
      document.body.removeChild(iframe);
      resolve();
    };
    document.body.appendChild(iframe);
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
        resolve();
      }
    }, 5000);
  });

export const performCompleteLogout = async (
  authServerUrl: string,
  keycloakConfig: any,
  tokens: { accessToken?: string; refreshToken?: string }
) => {
  try {
    const response = await fetch(`${authServerUrl}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      }),
    });
    const result = await response.json();
    console.log("Backend logout response:", result);
    if (Platform.OS === "web") await clearKeycloakSession(keycloakConfig);
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error };
  }
};
