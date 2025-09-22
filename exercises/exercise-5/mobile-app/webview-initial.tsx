import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<WebView>(null);

  // TODO: Add navigation state management
  // const [navigationState, setNavigationState] = useState({
  //   canGoBack: false,
  //   canGoForward: false,
  //   url: '',
  //   title: '',
  // });

  // TODO: Add shared state management
  // const [sharedState, setSharedState] = useState({
  //   theme: 'light',
  //   language: 'en',
  //   userPreferences: {},
  // });

  // TODO: Implement navigation handlers
  const handleGoBack = () => {
    // TODO: Implement go back functionality
    console.log('Go back pressed');
  };

  const handleGoForward = () => {
    // TODO: Implement go forward functionality
    console.log('Go forward pressed');
  };

  const handleRefresh = () => {
    // TODO: Implement refresh functionality
    console.log('Refresh pressed');
  };

  const handleGoHome = () => {
    // TODO: Navigate to home page
    console.log('Home pressed');
  };

  // TODO: Implement deep navigation methods
  const navigateToProfile = () => {
    // TODO: Navigate to profile page programmatically
    console.log('Navigate to profile');
  };

  const navigateToSettings = () => {
    // TODO: Navigate to settings page programmatically
    console.log('Navigate to settings');
  };

  // TODO: Implement navigation state change handler
  const handleNavigationStateChange = (navState: any) => {
    // TODO: Update navigation state
    // TODO: Send navigation updates if needed
    console.log('Navigation state changed:', navState);
  };

  // TODO: Implement message handler
  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log('Received message from WebView:', message);

      switch (message.type) {
        // TODO: Handle navigation_changed messages
        case 'navigation_changed':
          // TODO: Update navigation state from WebView
          break;

        // TODO: Handle state_updated messages
        case 'state_updated':
          // TODO: Update shared state
          break;

        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO: Create Navigation Bar Component */}
      <View style={styles.navigationBar}>
        <Text style={styles.title}>WebView Navigation</Text>

        {/* TODO: Add navigation controls with proper state */}
        <View style={styles.navigationControls}>
          <TouchableOpacity
            style={[styles.navButton, styles.disabledButton]} // TODO: Remove disabled style when implementing
            onPress={handleGoBack}
            // TODO: Add disabled prop based on canGoBack state
          >
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.disabledButton]} // TODO: Remove disabled style when implementing
            onPress={handleGoForward}
            // TODO: Add disabled prop based on canGoForward state
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

      {/* TODO: Add page navigation buttons */}
      <View style={styles.pageControls}>
        <TouchableOpacity style={styles.pageButton} onPress={navigateToProfile}>
          <Text style={styles.pageButtonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pageButton} onPress={navigateToSettings}>
          <Text style={styles.pageButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* TODO: Display current page info */}
      <View style={styles.pageInfo}>
        <Text style={styles.pageInfoText}>
          Page: {/* TODO: Display current page title */}Home
        </Text>
        <Text style={styles.pageInfoText}>
          URL: {/* TODO: Display current URL */}device-dashboard.localhost:3010/embedded
        </Text>
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
        style={styles.webview}
        // TODO: Add onNavigationStateChange prop
        // TODO: Add onMessage prop
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </SafeAreaView>
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