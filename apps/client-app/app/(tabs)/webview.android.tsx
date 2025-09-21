import React, { useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import CookieManager from "@react-native-cookies/cookies";

const WEBVIEW_URL = "http://device-dashboard.localhost:3010/embedded";

export default function WebViewScreen() {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setLoading(navState.loading);
  };

  const handleLoadStart = () => {
    setLoading(true);
    setError(null);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (errorEvent: any) => {
    setLoading(false);
    setError(`Failed to load: ${errorEvent.nativeEvent.description}`);
  };

  const handleRefresh = () => {
    webViewRef.current?.reload();
  };

  const handleGoBack = () => {
    if (canGoBack) {
      webViewRef.current?.goBack();
    }
  };

  const handleGoForward = () => {
    if (canGoForward) {
      webViewRef.current?.goForward();
    }
  };

  const getCookies = useCallback(async () => {
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
    } catch (error) {
      console.error("Error getting cookies:", error);
      Alert.alert("Error", "Failed to retrieve cookies");
    }
  }, []);

  const setCookie = useCallback(async () => {
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
              const [name, value] = cookieString.split("=");

              await CookieManager.set(WEBVIEW_URL, {
                name: name.trim(),
                value: value.trim(),
                domain: "localhost",
                path: "/",
              });

              Alert.alert("Success", "Cookie set successfully");
              webViewRef.current?.reload();
            } catch (error) {
              console.error("Error setting cookie:", error);
              Alert.alert("Error", "Failed to set cookie");
            }
          },
        },
      ],
      "plain-text"
    );
  }, []);

  // Clear all cookies for the domain
  const clearCookies = useCallback(async () => {
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
              // @ts-ignore
              await CookieManager.clearByName(WEBVIEW_URL);
              Alert.alert("Success", "Cookies cleared successfully");
              webViewRef.current?.reload();
            } catch (error) {
              console.error("Error clearing cookies:", error);
              Alert.alert("Error", "Failed to clear cookies");
            }
          },
        },
      ]
    );
  }, []);

  // Show cookie management options
  const showCookieMenu = () => {
    Alert.alert("Cookie Management", "Choose an action:", [
      { text: "View Cookies", onPress: getCookies },
      { text: "Set Cookie", onPress: setCookie },
      { text: "Clear Cookies", onPress: clearCookies, style: "destructive" },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // Inject JavaScript to handle additional functionality
  const injectedJavaScript = `
    (function() {
      // Add any custom JavaScript you want to run in the webview
      console.log('WebView loaded successfully');
      
      // You can access cookies via document.cookie
      // window.ReactNativeWebView.postMessage(JSON.stringify({
      //   type: 'cookies',
      //   cookies: document.cookie
      // }));
    })();
    true; // Required for iOS
  `;

  // Handle messages from webview
  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("Message from webview:", data);

      // Handle different message types
      switch (data.type) {
        case "cookies":
          console.log("Cookies from webview:", data.cookies);
          break;
        default:
          console.log("Unknown message type:", data.type);
      }
    } catch (error) {
      console.log("Received non-JSON message:", event.nativeEvent.data);
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning-outline" size={64} color="#ff6b6b" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={[styles.navButton, !canGoBack && styles.navButtonDisabled]}
          onPress={handleGoBack}
          disabled={!canGoBack}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={canGoBack ? "#007AFF" : "#ccc"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, !canGoForward && styles.navButtonDisabled]}
          onPress={handleGoForward}
          disabled={!canGoForward}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={canGoForward ? "#007AFF" : "#ccc"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleRefresh}>
          <Ionicons name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cookieButton} onPress={showCookieMenu}>
          <Ionicons name="settings-outline" size={24} color="#007AFF" />
          <Text style={styles.cookieButtonText}>Cookies</Text>
        </TouchableOpacity>
      </View>

      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: WEBVIEW_URL }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="compatibility"
        allowsBackForwardNavigationGestures={true}
        // Allow cookies
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        // Additional props for better compatibility
        originWhitelist={["*"]}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    ...Platform.select({
      ios: {
        paddingTop: 16,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  navButton: {
    padding: 8,
    marginRight: 12,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  cookieButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: "auto",
  },
  cookieButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 1,
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  errorText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginVertical: 20,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
