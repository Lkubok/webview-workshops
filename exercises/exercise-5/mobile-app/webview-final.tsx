import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

interface NavigationState {
  canGoBack: boolean;
  canGoForward: boolean;
  url: string;
  title: string;
}

interface SharedState {
  theme: string;
  language: string;
  userPreferences: any;
  userProfile?: any;
}

const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<WebView>(null);

  const [navigationState, setNavigationState] = useState<NavigationState>({
    canGoBack: false,
    canGoForward: false,
    url: '',
    title: '',
  });

  const [sharedState, setSharedState] = useState<SharedState>({
    theme: 'light',
    language: 'en',
    userPreferences: {},
  });

  const handleGoBack = () => {
    if (webViewRef.current && navigationState.canGoBack) {
      webViewRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (webViewRef.current && navigationState.canGoForward) {
      webViewRef.current.goForward();
    }
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleGoHome = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.location.href = '/home';
        true;
      `);
    }
  };

  const navigateToProfile = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.postMessage(JSON.stringify({
          type: 'navigate_to_page',
          page: 'profile',
          params: { userId: '123' }
        }), '*');
        true;
      `);
    }
  };

  const navigateToSettings = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.postMessage(JSON.stringify({
          type: 'navigate_to_page',
          page: 'settings',
          params: {}
        }), '*');
        true;
      `);
    }
  };

  const handleNavigationStateChange = (navState: any) => {
    setNavigationState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      url: navState.url,
      title: navState.title,
    });
  };

  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log('Received message from WebView:', message);

      switch (message.type) {
        case 'navigation_changed':
          setNavigationState(prev => ({
            ...prev,
            url: message.url,
            title: message.title,
            canGoBack: message.canGoBack,
          }));
          break;

        case 'state_updated':
          setSharedState(prev => ({
            ...prev,
            ...message.state
          }));

          Alert.alert(
            'State Updated',
            `Received state update from WebView: ${JSON.stringify(message.state, null, 2)}`,
            [{ text: 'OK' }]
          );
          break;

        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const updateSharedState = (updates: Partial<SharedState>) => {
    const newState = { ...sharedState, ...updates };
    setSharedState(newState);

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.postMessage(JSON.stringify({
          type: 'update_shared_state',
          state: ${JSON.stringify(updates)}
        }), '*');
        true;
      `);
    }
  };

  const toggleTheme = () => {
    const newTheme = sharedState.theme === 'light' ? 'dark' : 'light';
    updateSharedState({ theme: newTheme });
  };

  const changeLanguage = () => {
    const languages = ['en', 'es', 'fr', 'de'];
    const currentIndex = languages.indexOf(sharedState.language);
    const nextLanguage = languages[(currentIndex + 1) % languages.length];
    updateSharedState({ language: nextLanguage });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <Text style={styles.title}>WebView Navigation</Text>

        <View style={styles.navigationControls}>
          <TouchableOpacity
            style={[
              styles.navButton,
              !navigationState.canGoBack && styles.disabledButton
            ]}
            onPress={handleGoBack}
            disabled={!navigationState.canGoBack}
          >
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              !navigationState.canGoForward && styles.disabledButton
            ]}
            onPress={handleGoForward}
            disabled={!navigationState.canGoForward}
          >
            <Text style={styles.navButtonText}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleRefresh}>
            <Text style={styles.navButtonText}>⟳</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleGoHome}>
            <Text style={styles.navButtonText}>⌂</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pageControls}>
        <TouchableOpacity style={styles.pageButton} onPress={navigateToProfile}>
          <Text style={styles.pageButtonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pageButton} onPress={navigateToSettings}>
          <Text style={styles.pageButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stateControls}>
        <TouchableOpacity style={styles.stateButton} onPress={toggleTheme}>
          <Text style={styles.stateButtonText}>
            Theme: {sharedState.theme}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.stateButton} onPress={changeLanguage}>
          <Text style={styles.stateButtonText}>
            Lang: {sharedState.language}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pageInfo}>
        <Text style={styles.pageInfoText}>
          Page: {navigationState.title || 'Loading...'}
        </Text>
        <Text style={styles.pageInfoText} numberOfLines={1}>
          URL: {navigationState.url || 'device-dashboard.localhost:3010/embedded'}
        </Text>
        <Text style={styles.pageInfoText}>
          Navigation: Back({navigationState.canGoBack ? '✓' : '✗'}) |
          Forward({navigationState.canGoForward ? '✓' : '✗'})
        </Text>
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        injectedJavaScript={`
          // Send initial state to WebView
          setTimeout(() => {
            window.postMessage(JSON.stringify({
              type: 'update_shared_state',
              state: ${JSON.stringify(sharedState)}
            }), '*');
          }, 1000);
          true;
        `}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navigationBar: {
    backgroundColor: '#007AFF',
    padding: 15,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationControls: {
    flexDirection: 'row',
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    marginLeft: 5,
    borderRadius: 5,
    minWidth: 35,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.5,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pageControls: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  pageButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  pageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stateControls: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f8f9fa',
    justifyContent: 'space-around',
  },
  stateButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  stateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  pageInfo: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pageInfoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;