import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useWebView } from "../../hooks/useWebView";
import { LoadingOverlay } from "../../components/WebView";
import {
  WEBVIEW_URL,
  injectedJavaScript,
  webViewProps,
} from "../../utils/webViewConfig";

export default function WebViewScreen() {
  const {
    webViewRef,
    loading,
    handleNavigationStateChange,
    handleLoadStart,
    handleLoadEnd,
    handleError,
  } = useWebView();

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} />

      <WebView
        ref={webViewRef}
        source={{ uri: WEBVIEW_URL }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
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
