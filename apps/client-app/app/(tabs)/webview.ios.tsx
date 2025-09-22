import React, { useCallback, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useWebView } from "../../hooks/useWebView";
import {
  NavigationBar,
  ErrorDisplay,
  LoadingOverlay,
} from "../../components/WebView";
import { cookieUtils } from "../../utils/cookieManager";
import {
  WEBVIEW_URL,
  injectedJavaScript,
  webViewProps,
} from "../../utils/webViewConfig";

export default function WebViewScreen() {
  const {
    webViewRef,
    loading,
    error,
    canGoBack,
    canGoForward,
    handleNavigationStateChange,
    handleLoadStart,
    handleLoadEnd,
    handleError,
    handleRefresh,
    handleGoBack,
    handleGoForward,
    injectJavaScript,
  } = useWebView();

  // TODO: Add state to manage current token
  const [currentToken, setCurrentToken] = useState("initial-token-12345");

  const handleCookieMenu = useCallback(() => {
    cookieUtils.showCookieMenu(injectJavaScript, handleRefresh);
  }, [injectJavaScript, handleRefresh]);

  const handleMessage = useCallback((event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("Message from webview:", data);

      switch (data.type) {
        case "cookies":
          console.log("Cookies from webview:", data.cookies);
          break;
        case "sync_cookies":
          console.log("Syncing cookies:", data.cookies);
          Alert.alert("WebView Cookies", data.cookies || "No cookies found");
          break;
        // TODO: Add case for "refresh_token_request" to handle token refresh requests from webview
        default:
          console.log("Unknown message type:", data.type);
      }
    } catch (error) {
      console.log("Received non-JSON message:", event.nativeEvent.data);
    }
  }, []);

  // TODO: Implement function to generate new token and send it to webview
  const refreshToken = useCallback(() => {
    // TODO: Generate new token (simulate API call)
    // TODO: Update currentToken state
    // TODO: Navigate webview to URL with new token in hash params
  }, []);

  // TODO: Implement function to send initial token to webview on load
  const sendInitialToken = useCallback(() => {
    // TODO: Construct URL with token in hash params
    // TODO: Navigate webview to the URL with token
  }, [currentToken]);

  if (error) {
    return <ErrorDisplay error={error} onRetry={handleRefresh} />;
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onRefresh={handleRefresh}
        onCookieMenu={handleCookieMenu}
      />

      {/* TODO: Add button to send initial token */}
      <TouchableOpacity style={styles.tokenButton} onPress={sendInitialToken}>
        <Text style={styles.tokenButtonText}>Send Initial Token</Text>
      </TouchableOpacity>

      {/* Current token display */}
      <View style={styles.tokenDisplay}>
        <Text style={styles.tokenLabel}>Current Token:</Text>
        <Text style={styles.tokenValue}>{currentToken}</Text>
      </View>

      <LoadingOverlay visible={loading} />

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
        {...webViewProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
  tokenButton: {
    backgroundColor: "#34C759",
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  tokenButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  tokenDisplay: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 10,
  },
  tokenLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  tokenValue: {
    fontSize: 14,
    fontFamily: "monospace",
    color: "#333",
  },
});
