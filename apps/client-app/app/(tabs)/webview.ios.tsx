import React, { useCallback } from "react";
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
        case "counter_updated":
          console.log("Counter updated in webview:", data.counter);
          // Just log the update, no alert needed when triggered from React Native button
          break;
        default:
          console.log("Unknown message type:", data.type);
      }
    } catch (error) {
      console.log("Received non-JSON message:", event.nativeEvent.data);
    }
  }, []);

  const handleIncrementCounter = useCallback(() => {
    // Send message to webview using React Native WebView's built-in postMessage
    const message = JSON.stringify({
      type: "increment_counter",
    });

    // Use WebView's postMessage method for proper React Native → WebView communication
    if (webViewRef.current) {
      webViewRef.current.postMessage(message);
    }
  }, [webViewRef]);

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

      <TouchableOpacity
        style={styles.incrementButton}
        onPress={handleIncrementCounter}
      >
        <Text style={styles.incrementButtonText}>
          Increment Counter in WebView
        </Text>
      </TouchableOpacity>

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
  incrementButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  incrementButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
