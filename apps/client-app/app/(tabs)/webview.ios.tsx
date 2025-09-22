import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useWebView } from "../../hooks/useWebView";
import { NavigationBar, ErrorDisplay, LoadingOverlay } from "../../components/WebView";
import { cookieUtils } from "../../utils/cookieManager";
import { WEBVIEW_URL, injectedJavaScript, webViewProps } from "../../utils/webViewConfig";

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
        default:
          console.log("Unknown message type:", data.type);
      }
    } catch (error) {
      console.log("Received non-JSON message:", event.nativeEvent.data);
    }
  }, []);

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
});
