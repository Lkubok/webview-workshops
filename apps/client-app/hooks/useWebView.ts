import { useRef, useState, useCallback } from "react";
import { WebView } from "react-native-webview";

export function useWebView() {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleNavigationStateChange = useCallback((navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setLoading(navState.loading);
  }, []);

  const handleLoadStart = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback((errorEvent: any) => {
    setLoading(false);
    setError(`Failed to load: ${errorEvent.nativeEvent.description}`);
  }, []);

  const handleRefresh = useCallback(() => {
    webViewRef.current?.reload();
  }, []);

  const handleGoBack = useCallback(() => {
    if (canGoBack) {
      webViewRef.current?.goBack();
    }
  }, [canGoBack]);

  const handleGoForward = useCallback(() => {
    if (canGoForward) {
      webViewRef.current?.goForward();
    }
  }, [canGoForward]);

  const injectJavaScript = useCallback((script: string) => {
    webViewRef.current?.injectJavaScript(script);
  }, []);

  return {
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
  };
}