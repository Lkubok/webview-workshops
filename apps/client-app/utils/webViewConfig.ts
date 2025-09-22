export const WEBVIEW_URL = "http://device-dashboard.localhost:3010/embedded";

export const injectedJavaScript = `
  (function() {
    console.log('WebView loaded successfully');
    console.log('Current cookies:', document.cookie);

    // Send initial cookies to React Native
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'cookies',
        cookies: document.cookie
      }));
    }
  })();
  true;
`;

export const webViewProps = {
  javaScriptEnabled: true,
  domStorageEnabled: true,
  startInLoadingState: true,
  allowsInlineMediaPlayback: true,
  mediaPlaybackRequiresUserAction: false,
  mixedContentMode: "compatibility" as const,
  allowsBackForwardNavigationGestures: true,
  sharedCookiesEnabled: true,
  thirdPartyCookiesEnabled: true,
  incognito: false,
  cacheEnabled: true,
  originWhitelist: ["*"],
  allowFileAccess: true,
  allowFileAccessFromFileURLs: true,
  allowUniversalAccessFromFileURLs: true,
};