# React Native WebView Integration Workshop - Presentation Script

## Section 5: Advanced WebView Topics & Troubleshooting (20 min) 11:30–11:50

---

### Opening and Context Setting (1 minute)

"Now that you've had hands-on experience building WebView integrations, let's tackle the advanced topics and real-world challenges that you'll inevitably face in production. This section is about transforming you from someone who can implement WebView features into someone who can troubleshoot, optimize, and architect robust WebView solutions.

We'll cover the issues that keep developers up at night, the performance problems that cause user complaints, and the advanced patterns that separate professional implementations from hobby projects."

---

## Common Issues & Solutions (10 minutes)

### Loading Problems (2.5 minutes)

"Let's start with the most frustrating category of issues – when things simply don't load or load incorrectly.

**Network Connectivity and Timeout Handling:**

This is the #1 support ticket generator for WebView apps:

```javascript
const [webViewError, setWebViewError] = useState(null);
const [isConnected, setIsConnected] = useState(true);

// Robust error handling
const handleWebViewError = syntheticEvent => {
  const { nativeEvent } = syntheticEvent;

  // Common error scenarios
  if (
    nativeEvent.description.includes(
      "Internet connection appears to be offline"
    )
  ) {
    setWebViewError("network");
    setIsConnected(false);
  } else if (nativeEvent.description.includes("timeout")) {
    setWebViewError("timeout");
  } else {
    setWebViewError("unknown");
    // Log detailed error for debugging
    console.error("WebView error:", nativeEvent);
  }
};

// Smart retry mechanism
const retryConnection = () => {
  setWebViewError(null);
  webViewRef.current?.reload();
};
```

**Production strategies:**

- **Implement exponential backoff** for automatic retries
- **Show meaningful error messages** instead of generic failures
- **Provide manual retry buttons** for user control
- **Cache critical content** for offline scenarios
- **Monitor network state** and adapt accordingly

**Mixed Content (HTTPS/HTTP) Issues:**

This kills many WebView implementations silently:

```javascript
// ❌ This will fail silently in production
const webViewUrl = "https://secure-site.com/page-with-http-images";

// ✅ Proper mixed content handling
<WebView
  source={{ uri: webViewUrl }}
  mixedContentMode="never" // Production default
  // Or "compatibility" for development only
  onError={error => {
    if (error.nativeEvent.description.includes("mixed content")) {
      // Guide user to resolve mixed content
      showMixedContentWarning();
    }
  }}
/>;
```

**Real-world impact**: Mixed content issues cause blank screens, broken images, and failed API calls. Always audit your web content for HTTP resources when serving over HTTPS.

**Domain Whitelist Configuration Pitfalls:**

This is a common source of production bugs:

```javascript
// ❌ Too restrictive - breaks legitimate redirects
originWhitelist={['https://myapp.com']}

// ❌ Too permissive - security risk
originWhitelist={['*']}

// ✅ Properly configured
originWhitelist={[
  'https://myapp.com',
  'https://cdn.myapp.com',
  'https://auth.myapp.com',
  'https://api.myapp.com',
  // Don't forget about redirects!
  'https://login.microsoftonline.com', // For Azure AD
  'https://accounts.google.com', // For Google Auth
]}
```

**Pro tip**: Monitor your app analytics for WebView navigation failures – they often indicate whitelist issues."

### Performance Issues (2.5 minutes)

"Performance problems in WebView compound quickly because they affect both native and web performance.

**Memory Leaks and Proper Cleanup:**

This is the silent killer of long-running apps:

```javascript
// ❌ Memory leak pattern
const WebViewScreen = () => {
  const webViewRef = useRef();

  useEffect(() => {
    // Event listeners accumulate
    const handleMessage = event => {
      /* ... */
    };
    // Missing cleanup!
  }, []);

  // Component unmounts but WebView keeps running
};

// ✅ Proper lifecycle management
const WebViewScreen = () => {
  const webViewRef = useRef();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    return () => {
      // Critical cleanup
      setIsActive(false);
      if (webViewRef.current) {
        // Stop loading and clear cache if needed
        webViewRef.current.stopLoading();
      }
    };
  }, []);

  // Monitor app state changes
  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === "background" && webViewRef.current) {
        // Pause heavy operations
        webViewRef.current.injectJavaScript(`
          if (window.pauseAnimations) window.pauseAnimations();
        `);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, []);
};
```

**Large DOM Handling and Virtualization:**

WebViews struggle with large datasets:

```javascript
// Inject virtualization helpers
const optimizeForLargeData = `
  // Implement virtual scrolling for large lists
  if (window.virtualizeList) {
    window.virtualizeList('.large-data-table', {
      itemHeight: 50,
      viewportHeight: window.innerHeight,
      bufferSize: 10
    });
  }

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
`;

<WebView
  injectedJavaScript={optimizeForLargeData}
  // Limit memory usage
  cacheEnabled={false} // For dynamic content
  // Or selective caching
  cacheMode="LOAD_CACHE_ELSE_NETWORK"
/>;
```

**Image Optimization and Lazy Loading:**

Images are the biggest performance killer:

- **Implement responsive images** in your web content
- **Use WebP format** where supported
- **Lazy load below-the-fold images**
- **Set explicit dimensions** to prevent layout shifts
- **Monitor memory usage** with large image galleries"

### Platform-Specific Challenges (2.5 minutes)

"Platform differences can make or break your user experience.

**iOS vs Android WebView Differences:**

These differences cause most cross-platform bugs:

```javascript
// Platform-specific configurations
const webViewProps = Platform.select({
  ios: {
    allowsBackForwardNavigationGestures: true,
    contentInsetAdjustmentBehavior: "automatic",
    // iOS-specific security
    fraudulentWebsiteWarningEnabled: true,
    allowsLinkPreview: false, // Prevents 3D Touch issues
  },
  android: {
    // Android-specific optimizations
    androidHardwareAccelerationDisabled: false,
    androidLayerType: "hardware",
    // Handle Android back button
    onAndroidBackPressed: () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true; // Prevent default back action
      }
      return false;
    },
  },
});

<WebView
  {...webViewProps}
  // Common props for both platforms
/>;
```

**Critical iOS/Android differences:**

- **Cookie handling**: Different security models
- **JavaScript performance**: iOS generally faster
- **File upload**: Completely different implementations
- **Video playback**: Different supported formats
- **Network security**: Different certificate validation

**Keyboard Handling and Viewport Adjustments:**

This affects every app with forms:

```javascript
// Inject keyboard handling
const keyboardOptimization = `
  // Prevent zoom on input focus (iOS)
  document.addEventListener('focusin', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      // Disable viewport zoom
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content',
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );
      }
    }
  });

  // Restore zoom after blur
  document.addEventListener('focusout', (e) => {
    setTimeout(() => {
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content',
          'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
        );
      }
    }, 100);
  });

  // Handle keyboard appearance
  if (window.ReactNativeWebView) {
    window.addEventListener('resize', () => {
      // Notify native about keyboard state
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'viewport_change',
        height: window.innerHeight,
        keyboardVisible: window.innerHeight < window.screen.height * 0.75
      }));
    });
  }
`;
```

**File Upload and Download Limitations:**

This is a major pain point:

````javascript
// Handle file uploads properly
const handleFileUpload = Platform.select({
  ios: () => {
    // iOS has better file picker support
    return {
      allowsInlineMediaPlayback: true,
      mediaPlaybackRequiresUserAction: false,
    };
  },
  android: () => {
    // Android requires special permission handling
    return {
      // Request file access permissions
      onPermissionRequest: (request) => {
        request.grant();
      },
      allowFileAccess: true,
      allowFileAccessFromFileURLs: true,
    };
  },
});
```"

### Debugging Techniques (2.5 minutes)

"Debugging WebView issues requires a multi-layered approach.

**Remote Debugging with Chrome DevTools:**

This is your most powerful debugging tool:

```javascript
// Enable debugging in development
const debugProps = __DEV__ ? {
  // Enable remote debugging
  webContentsDebuggingEnabled: true,
  // Add debug overlay
  injectedJavaScript: `
    // Add debug console overlay
    if (window.location.hash.includes('debug')) {
      const debugDiv = document.createElement('div');
      debugDiv.id = 'debug-overlay';
      debugDiv.style.cssText = \`
        position: fixed;
        top: 0;
        right: 0;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        font-size: 12px;
        z-index: 9999;
        max-width: 300px;
        max-height: 200px;
        overflow: auto;
      \`;
      document.body.appendChild(debugDiv);

      // Capture console logs
      const originalConsole = window.console;
      window.console = {
        ...originalConsole,
        log: (...args) => {
          originalConsole.log(...args);
          debugDiv.innerHTML += args.join(' ') + '<br>';
          debugDiv.scrollTop = debugDiv.scrollHeight;
        }
      };
    }
  `,
} : {};

<WebView {...debugProps} />
````

**Access Chrome DevTools:**

- **Android**: chrome://inspect in Chrome browser
- **iOS**: Safari → Develop → [Device] → [WebView]

**Console Logging and Error Tracking:**

Implement comprehensive logging:

```javascript
// Production-ready error tracking
const handleWebViewMessage = event => {
  try {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.type === "error") {
      // Log to crash reporting service
      crashlytics().recordError(new Error(message.error));

      // Log to analytics
      analytics().logEvent("webview_error", {
        error_type: message.errorType,
        url: message.url,
        user_agent: message.userAgent,
      });
    }
  } catch (error) {
    // Handle JSON parse errors
    console.error("Invalid WebView message:", event.nativeEvent.data);
  }
};

// Inject comprehensive error tracking
const errorTrackingScript = `
  // Catch all JavaScript errors
  window.addEventListener('error', (event) => {
    window.ReactNativeWebView?.postMessage(JSON.stringify({
      type: 'error',
      errorType: 'javascript',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    }));
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    window.ReactNativeWebView?.postMessage(JSON.stringify({
      type: 'error',
      errorType: 'promise_rejection',
      reason: event.reason?.toString(),
      url: window.location.href,
      timestamp: Date.now()
    }));
  });
`;
```

**Network Request Monitoring:**

Track performance and failures:

````javascript
// Monitor network requests
const networkMonitoringScript = `
  // Monkey patch fetch to monitor requests
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const startTime = Date.now();
    const url = args[0];

    try {
      const response = await originalFetch(...args);
      const duration = Date.now() - startTime;

      // Log successful requests
      window.ReactNativeWebView?.postMessage(JSON.stringify({
        type: 'network',
        url,
        status: response.status,
        duration,
        success: true
      }));

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Log failed requests
      window.ReactNativeWebView?.postMessage(JSON.stringify({
        type: 'network',
        url,
        duration,
        success: false,
        error: error.message
      }));

      throw error;
    }
  };
`;
```"

---

## Advanced Integration Patterns (9 minutes)

### WebView Lifecycle Management (3 minutes)

"Proper lifecycle management is what separates amateur implementations from production-ready solutions.

**Proper Mounting/Unmounting:**

This requires careful coordination between React lifecycle and WebView lifecycle:

```javascript
const WebViewContainer = ({ url, isVisible }) => {
  const webViewRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Staggered mounting to prevent memory spikes
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, 100); // Small delay to prevent race conditions

      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
      setIsLoaded(false);
    }
  }, [isVisible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (webViewRef.current) {
        // Stop any ongoing operations
        webViewRef.current.stopLoading();

        // Clear any timers or intervals in WebView
        webViewRef.current.injectJavaScript(`
          // Clear all timeouts and intervals
          const highestTimeoutId = setTimeout(() => {}, 0);
          for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
          }

          const highestIntervalId = setInterval(() => {}, 0);
          for (let i = 0; i < highestIntervalId; i++) {
            clearInterval(i);
          }

          // Remove event listeners
          window.removeEventListener('beforeunload', window.onbeforeunload);
        `);
      }
    };
  }, []);

  if (!shouldRender) {
    return <LoadingPlaceholder />;
  }

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: url }}
      onLoadEnd={() => setIsLoaded(true)}
      // Critical: prevent memory leaks
      cacheEnabled={false}
      // Clean up resources when hidden
      style={{ opacity: isVisible ? 1 : 0 }}
    />
  );
};
````

**Background/Foreground State Handling:**

Apps must respond intelligently to state changes:

```javascript
const useAppStateWebView = webViewRef => {
  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (!webViewRef.current) return;

      switch (nextAppState) {
        case "background":
          // Pause expensive operations
          webViewRef.current.injectJavaScript(`
            // Pause animations and timers
            if (window.pauseApp) window.pauseApp();

            // Stop location tracking
            if (navigator.geolocation?.clearWatch) {
              navigator.geolocation.clearWatch();
            }

            // Pause video/audio
            document.querySelectorAll('video, audio').forEach(media => {
              if (!media.paused) {
                media.pause();
                media.dataset.wasPlaying = 'true';
              }
            });
          `);
          break;

        case "active":
          // Resume operations
          webViewRef.current.injectJavaScript(`
            // Resume animations
            if (window.resumeApp) window.resumeApp();

            // Resume media that was playing
            document.querySelectorAll('video, audio').forEach(media => {
              if (media.dataset.wasPlaying === 'true') {
                media.play();
                delete media.dataset.wasPlaying;
              }
            });
          `);
          break;
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, [webViewRef]);
};
```

**Memory Cleanup Best Practices:**

Implement proactive memory management:

````javascript
// Memory monitoring and cleanup
const useWebViewMemoryManagement = (webViewRef) => {
  const cleanupMemory = useCallback(() => {
    if (!webViewRef.current) return;

    webViewRef.current.injectJavaScript(`
      // Clear caches
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }

      // Clear large objects
      if (window.clearAppCache) {
        window.clearAppCache();
      }

      // Force garbage collection if available
      if (window.gc) {
        window.gc();
      }
    `);
  }, [webViewRef]);

  // Clean up memory periodically
  useEffect(() => {
    const interval = setInterval(cleanupMemory, 5 * 60 * 1000); // Every 5 minutes
    return () => clearInterval(interval);
  }, [cleanupMemory]);

  // Clean up on memory warnings
  useEffect(() => {
    const memoryWarningListener = () => {
      cleanupMemory();
    };

    // iOS memory warnings
    if (Platform.OS === 'ios') {
      const subscription = NativeModules?.RNDeviceMemory?.addMemoryWarningListener?.(
        memoryWarningListener
      );
      return () => subscription?.remove?.();
    }
  }, [cleanupMemory]);
};
```"

### Multi-WebView Architecture (3 minutes)

"Managing multiple WebViews requires careful architecture decisions.

**When to Use Multiple WebViews:**

The decision tree for multiple WebViews:

```javascript
// ✅ Good use cases for multiple WebViews:
// 1. Completely different domains/applications
// 2. Different security contexts
// 3. Independent user sessions
// 4. Different performance requirements

// ❌ Don't use multiple WebViews for:
// 1. Simple navigation within the same app
// 2. Modal overlays (use native modals)
// 3. Different pages of the same website

const WebViewNavigator = () => {
  const [activeWebViewId, setActiveWebViewId] = useState('dashboard');
  const webViewRefs = useRef({});

  const webViewConfigs = {
    dashboard: {
      url: 'https://dashboard.app.com',
      securityLevel: 'high',
      cacheStrategy: 'aggressive',
    },
    reports: {
      url: 'https://reports.app.com',
      securityLevel: 'medium',
      cacheStrategy: 'minimal',
    },
    settings: {
      url: 'https://settings.app.com',
      securityLevel: 'high',
      cacheStrategy: 'none',
    },
  };

  return (
    <View style={{ flex: 1 }}>
      {Object.entries(webViewConfigs).map(([id, config]) => (
        <WebView
          key={id}
          ref={ref => webViewRefs.current[id] = ref}
          source={{ uri: config.url }}
          style={{
            flex: 1,
            display: activeWebViewId === id ? 'flex' : 'none'
          }}
          // Different configurations per WebView
          cacheEnabled={config.cacheStrategy !== 'none'}
          originWhitelist={getWhitelistForSecurityLevel(config.securityLevel)}
        />
      ))}
    </View>
  );
};
````

**Shared State Across WebView Instances:**

Implement a centralized state management system:

```javascript
// State synchronization between WebViews
const WebViewStateManager = {
  state: {},
  listeners: new Set(),

  setState(key, value) {
    this.state[key] = value;
    this.notifyListeners(key, value);
  },

  getState(key) {
    return this.state[key];
  },

  notifyListeners(key, value) {
    this.listeners.forEach(webViewRef => {
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          if (window.onStateChange) {
            window.onStateChange('${key}', ${JSON.stringify(value)});
          }
        `);
      }
    });
  },

  registerWebView(webViewRef) {
    this.listeners.add(webViewRef);

    // Send current state to new WebView
    Object.entries(this.state).forEach(([key, value]) => {
      webViewRef.current?.injectJavaScript(`
        if (window.onStateChange) {
          window.onStateChange('${key}', ${JSON.stringify(value)});
        }
      `);
    });
  },

  unregisterWebView(webViewRef) {
    this.listeners.delete(webViewRef);
  },
};

// Usage in component
const MultiWebViewScreen = () => {
  const webViewRef = useRef();

  useEffect(() => {
    WebViewStateManager.registerWebView(webViewRef);
    return () => WebViewStateManager.unregisterWebView(webViewRef);
  }, []);

  const handleWebViewMessage = event => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.type === "state_update") {
      // Update shared state
      WebViewStateManager.setState(message.key, message.value);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      onMessage={handleWebViewMessage}
      injectedJavaScript={`
        // Listen for state changes from other WebViews
        window.onStateChange = (key, value) => {
          if (window.handleSharedState) {
            window.handleSharedState(key, value);
          }
        };
      `}
    />
  );
};
```

**Navigation Between WebView Screens:**

Implement smart navigation with state preservation:

````javascript
// Advanced WebView navigation
const WebViewStack = () => {
  const [webViewStack, setWebViewStack] = useState([
    { id: 'home', url: 'https://app.com/home', state: null }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateToWebView = (url, preserveState = true) => {
    const newWebView = {
      id: `webview_${Date.now()}`,
      url,
      state: null
    };

    if (preserveState) {
      // Save current WebView state
      const currentWebView = webViewStack[currentIndex];
      currentWebView.state = captureWebViewState(currentWebView.id);
    }

    setWebViewStack(prev => [...prev.slice(0, currentIndex + 1), newWebView]);
    setCurrentIndex(prev => prev + 1);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);

      // Restore previous WebView state
      const previousWebView = webViewStack[currentIndex - 1];
      if (previousWebView.state) {
        restoreWebViewState(previousWebView.id, previousWebView.state);
      }
    }
  };

  return (
    <WebViewNavigationContainer
      webViews={webViewStack}
      currentIndex={currentIndex}
      onNavigate={navigateToWebView}
      onGoBack={goBack}
    />
  );
};
```"

### Progressive Web App (PWA) Integration (3 minutes)

"PWAs in WebView require special consideration to work effectively.

**Service Worker Compatibility:**

Service workers need careful handling in WebView:

```javascript
// PWA-optimized WebView configuration
const PWAWebView = ({ url }) => {
  const [isPWAReady, setIsPWAReady] = useState(false);
  const [offlineCapable, setOfflineCapable] = useState(false);

  const pwaInitScript = `
    // Check PWA capabilities
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);

          // Check if app is offline-capable
          registration.addEventListener('updatefound', () => {
            window.ReactNativeWebView?.postMessage(JSON.stringify({
              type: 'pwa_update_available'
            }));
          });

          // Notify native about PWA readiness
          window.ReactNativeWebView?.postMessage(JSON.stringify({
            type: 'pwa_ready',
            offline_capable: true
          }));
        })
        .catch(error => {
          console.error('SW registration failed:', error);
          window.ReactNativeWebView?.postMessage(JSON.stringify({
            type: 'pwa_ready',
            offline_capable: false
          }));
        });
    }

    // Handle offline/online events
    window.addEventListener('online', () => {
      window.ReactNativeWebView?.postMessage(JSON.stringify({
        type: 'connectivity_change',
        online: true
      }));
    });

    window.addEventListener('offline', () => {
      window.ReactNativeWebView?.postMessage(JSON.stringify({
        type: 'connectivity_change',
        online: false
      }));
    });

    // PWA install prompt handling
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.deferredPrompt = e;

      window.ReactNativeWebView?.postMessage(JSON.stringify({
        type: 'pwa_installable'
      }));
    });
  `;

  return (
    <WebView
      source={{ uri: url }}
      injectedJavaScript={pwaInitScript}
      onMessage={(event) => {
        const message = JSON.parse(event.nativeEvent.data);

        switch (message.type) {
          case 'pwa_ready':
            setIsPWAReady(true);
            setOfflineCapable(message.offline_capable);
            break;
          case 'connectivity_change':
            handleConnectivityChange(message.online);
            break;
          case 'pwa_installable':
            showPWAInstallPrompt();
            break;
        }
      }}
      // PWA-specific configuration
      cacheEnabled={true}
      cacheMode="LOAD_CACHE_ELSE_NETWORK"
      domStorageEnabled={true}
      thirdPartyCookiesEnabled={true}
    />
  );
};
````

**Offline Functionality in WebView:**

Implement robust offline support:

```javascript
// Offline-first WebView approach
const OfflineCapableWebView = ({ url }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [cachedContent, setCachedContent] = useState(null);

  const offlineScript = `
    // Implement offline detection and fallbacks
    const checkConnectivity = async () => {
      try {
        const response = await fetch('/api/ping', {
          method: 'HEAD',
          cache: 'no-cache'
        });
        return response.ok;
      } catch {
        return false;
      }
    };

    // Offline content strategy
    const handleOfflineContent = () => {
      if (!navigator.onLine) {
        // Show cached content
        const cachedData = localStorage.getItem('app_cache');
        if (cachedData) {
          document.body.innerHTML = cachedData;
        } else {
          // Show offline message
          document.body.innerHTML = \`
            <div style="padding: 20px; text-align: center;">
              <h2>You're offline</h2>
              <p>Some features may not be available.</p>
              <button onclick="location.reload()">Try Again</button>
            </div>
          \`;
        }
      }
    };

    // Cache important content
    const cacheContent = () => {
      const contentToCache = document.querySelector('.main-content')?.innerHTML;
      if (contentToCache) {
        localStorage.setItem('app_cache', contentToCache);
        localStorage.setItem('cache_timestamp', Date.now().toString());
      }
    };

    // Check cache freshness
    const isCacheValid = () => {
      const timestamp = localStorage.getItem('cache_timestamp');
      if (!timestamp) return false;

      const cacheAge = Date.now() - parseInt(timestamp);
      return cacheAge < 24 * 60 * 60 * 1000; // 24 hours
    };

    // Initialize offline handling
    window.addEventListener('load', () => {
      cacheContent();

      if (!navigator.onLine || !isCacheValid()) {
        handleOfflineContent();
      }
    });
  `;

  return (
    <WebView
      source={{ uri: url }}
      injectedJavaScript={offlineScript}
      onError={() => {
        // Fallback to cached content on network error
        setIsOffline(true);
      }}
    />
  );
};
```

**App-like Behavior Patterns:**

Make WebView feel native:

```javascript
// Native app behavior in WebView
const NativeAppBehaviorScript = `
  // Disable context menus (long press)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Disable text selection
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
  });

  // Handle pull-to-refresh
  let startY = 0;
  document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  document.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 100 && window.scrollY === 0) {
      // Trigger refresh
      window.ReactNativeWebView?.postMessage(JSON.stringify({
        type: 'pull_to_refresh'
      }));
    }
  });

  // Implement swipe gestures
  let startX = 0;
  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 100) {
      if (deltaX > 0) {
        // Swipe right - go back
        window.ReactNativeWebView?.postMessage(JSON.stringify({
          type: 'swipe_back'
        }));
      } else {
        // Swipe left - go forward
        window.ReactNativeWebView?.postMessage(JSON.stringify({
          type: 'swipe_forward'
        }));
      }
    }
  });

  // Handle safe area insets
  const applyMobileSafeArea = () => {
    const style = document.createElement('style');
    style.textContent = \`
      body {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
      }
    \`;
    document.head.appendChild(style);
  };

  applyMobileSafeArea();
`;
```

### Closing and Transition (1 minute)

"These advanced patterns and troubleshooting techniques will serve you well in production. Remember: WebView development is about balancing functionality, performance, and user experience.

The key takeaways:

- **Always plan for failure** – network issues, memory problems, platform differences
- **Monitor performance** – memory leaks kill long-running apps
- **Implement proper debugging** – you'll need it when things go wrong
- **Think like a native app** – users expect native behavior even in WebView
