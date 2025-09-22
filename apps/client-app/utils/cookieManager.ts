import { Alert } from "react-native";
import CookieManager from "@react-native-cookies/cookies";

const WEBVIEW_URL = "http://device-dashboard.localhost:3010/embedded";

export const cookieUtils = {
  async getCookies() {
    try {
      const cookies = await CookieManager.get(WEBVIEW_URL);

      if (Object.keys(cookies).length === 0) {
        Alert.alert("Cookies", "No cookies found for this domain");
        return;
      }

      const cookieList = Object.entries(cookies)
        .map(([name, cookie]) => `${name}: ${cookie.value}`)
        .join("\n");

      Alert.alert("Current Cookies", cookieList);
      console.log("Cookies:", cookies);
    } catch (error) {
      console.error("Error getting cookies:", error);
      Alert.alert("Error", "Failed to retrieve cookies");
    }
  },

  async setCookie(injectJavaScript: (script: string) => void, onReload: () => void) {
    Alert.prompt(
      "Set Cookie",
      "Enter cookie in format: name=value",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Set",
          onPress: async (cookieString: any) => {
            if (!cookieString || !cookieString.includes("=")) {
              Alert.alert("Error", "Invalid cookie format. Use: name=value");
              return;
            }

            try {
              const [name, ...valueParts] = cookieString.split("=");
              const value = valueParts.join("=");

              // Method 1: Set cookie via CookieManager
              await CookieManager.set(WEBVIEW_URL, {
                name: name.trim(),
                value: value.trim(),
                domain: "localhost",
                path: "/",
                httpOnly: false,
                secure: false,
              });

              // Method 2: Also inject the cookie via JavaScript
              const jsCode = `
                try {
                  document.cookie = "${name.trim()}=${value.trim()}; path=/; domain=localhost";
                  console.log('Cookie set via JS:', document.cookie);
                } catch(e) {
                  console.error('Error setting cookie via JS:', e);
                }
                true;
              `;

              injectJavaScript(jsCode);
              Alert.alert("Success", "Cookie set successfully. Refreshing...");

              setTimeout(() => {
                onReload();
              }, 500);
            } catch (error) {
              console.error("Error setting cookie:", error);
              Alert.alert("Error", "Failed to set cookie");
            }
          },
        },
      ],
      "plain-text"
    );
  },

  async clearCookies(injectJavaScript: (script: string) => void, onReload: () => void) {
    Alert.alert(
      "Clear Cookies",
      "Are you sure you want to clear all cookies for this domain?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await CookieManager.clearAll();

              const jsCode = `
                document.cookie.split(";").forEach(function(c) {
                  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                true;
              `;

              injectJavaScript(jsCode);

              setTimeout(() => {
                onReload();
              }, 100);

              Alert.alert("Success", "Cookies cleared successfully");
            } catch (error) {
              console.error("Error clearing cookies:", error);
              Alert.alert("Error", "Failed to clear cookies");
            }
          },
        },
      ]
    );
  },

  syncCookies(injectJavaScript: (script: string) => void) {
    const jsCode = `
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'sync_cookies',
        cookies: document.cookie
      }));
      true;
    `;

    injectJavaScript(jsCode);
  },

  showCookieMenu(
    injectJavaScript: (script: string) => void,
    onReload: () => void
  ) {
    Alert.alert("Cookie Management", "Choose an action:", [
      { text: "View Cookies", onPress: () => this.getCookies() },
      { text: "Set Cookie", onPress: () => this.setCookie(injectJavaScript, onReload) },
      { text: "Clear Cookies", onPress: () => this.clearCookies(injectJavaScript, onReload), style: "destructive" },
      { text: "Sync Cookies", onPress: () => this.syncCookies(injectJavaScript) },
      { text: "Cancel", style: "cancel" },
    ]);
  },
};