import PresentationLayout from '../components/PresentationLayout'
import CodeBlock from '../components/CodeBlock'
import { AlertTriangle, Zap, Bug, Layers, Globe, TrendingUp } from 'lucide-react'

export default function AdvancedPage() {
  const errorHandlingCode = `// Robust Error Handling Pattern
const ProductionWebView = () => {
  const [webViewError, setWebViewError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;

    // Categorize errors for better handling
    if (nativeEvent.description.includes('Internet connection appears to be offline')) {
      setWebViewError('network');
      setIsConnected(false);
    } else if (nativeEvent.description.includes('timeout')) {
      setWebViewError('timeout');
    } else if (nativeEvent.description.includes('mixed content')) {
      setWebViewError('mixed_content');
    } else {
      setWebViewError('unknown');
      // Log detailed error for debugging
      crashlytics().recordError(new Error(\`WebView error: \${nativeEvent.description}\`));
    }
  };

  // Smart retry with exponential backoff
  const retryConnection = () => {
    const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);

    setTimeout(() => {
      setWebViewError(null);
      setRetryCount(prev => prev + 1);
      webViewRef.current?.reload();
    }, delay);
  };

  // Network state monitoring
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected && webViewError === 'network') {
        retryConnection();
      }
    });

    return unsubscribe;
  }, [webViewError, retryCount]);

  return (
    <WebView
      onError={handleWebViewError}
      originWhitelist={[
        'https://trusted-domain.com',
        'https://api.company.com',
        'https://auth.company.com'
      ]}
      mixedContentMode="never"
      // ... other props
    />
  );
};`

  const memoryManagementCode = `// Production Memory Management
const useWebViewMemoryManagement = (webViewRef) => {
  const [isActive, setIsActive] = useState(true);

  // Lifecycle cleanup
  useEffect(() => {
    return () => {
      setIsActive(false);
      if (webViewRef.current) {
        // Stop all ongoing operations
        webViewRef.current.stopLoading();

        // Clear WebView cache and timers
        webViewRef.current.injectJavaScript(\`
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

          // Clear large objects
          if (window.clearAppCache) {
            window.clearAppCache();
          }
        \`);
      }
    };
  }, []);

  // App state management
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (!webViewRef.current) return;

      switch (nextAppState) {
        case 'background':
          // Pause expensive operations
          webViewRef.current.injectJavaScript(\`
            // Pause animations and timers
            if (window.pauseApp) window.pauseApp();

            // Stop location tracking
            if (navigator.geolocation?.clearWatch) {
              navigator.geolocation.clearWatch();
            }

            // Pause media
            document.querySelectorAll('video, audio').forEach(media => {
              if (!media.paused) {
                media.pause();
                media.dataset.wasPlaying = 'true';
              }
            });
          \`);
          break;

        case 'active':
          if (isActive) {
            // Resume operations
            webViewRef.current.injectJavaScript(\`
              // Resume animations
              if (window.resumeApp) window.resumeApp();

              // Resume media that was playing
              document.querySelectorAll('video, audio').forEach(media => {
                if (media.dataset.wasPlaying === 'true') {
                  media.play();
                  delete media.dataset.wasPlaying;
                }
              });
            \`);
          }
          break;
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [isActive]);

  // Periodic memory cleanup
  useEffect(() => {
    const cleanupMemory = () => {
      if (!webViewRef.current || !isActive) return;

      webViewRef.current.injectJavaScript(\`
        // Clear caches
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
          });
        }

        // Force garbage collection if available
        if (window.gc) {
          window.gc();
        }
      \`);
    };

    const interval = setInterval(cleanupMemory, 5 * 60 * 1000); // Every 5 minutes
    return () => clearInterval(interval);
  }, [isActive]);
};`

  const multiWebViewCode = `// Multi-WebView State Management
const WebViewStateManager = {
  state: {},
  listeners: new Set(),

  setState(key, value) {
    this.state[key] = value;
    this.notifyListeners(key, value);

    // Persist to storage
    AsyncStorage.setItem('webview_shared_state', JSON.stringify(this.state));
  },

  getState(key) {
    return this.state[key];
  },

  notifyListeners(key, value) {
    this.listeners.forEach(webViewRef => {
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(\`
          if (window.onStateChange) {
            window.onStateChange('\${key}', \${JSON.stringify(value)});
          }
        \`);
      }
    });
  },

  registerWebView(webViewRef) {
    this.listeners.add(webViewRef);

    // Send current state to new WebView
    Object.entries(this.state).forEach(([key, value]) => {
      webViewRef.current?.injectJavaScript(\`
        if (window.onStateChange) {
          window.onStateChange('\${key}', \${JSON.stringify(value)});
        }
      \`);
    });
  },

  unregisterWebView(webViewRef) {
    this.listeners.delete(webViewRef);
  },

  async loadState() {
    try {
      const saved = await AsyncStorage.getItem('webview_shared_state');
      if (saved) {
        this.state = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load shared state:', error);
    }
  }
};

// Usage in multiple WebView components
const MultiWebViewScreen = () => {
  const webViewRef = useRef();

  useEffect(() => {
    WebViewStateManager.registerWebView(webViewRef);
    return () => WebViewStateManager.unregisterWebView(webViewRef);
  }, []);

  const handleWebViewMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.type === 'state_update') {
      // Update shared state across all WebViews
      WebViewStateManager.setState(message.key, message.value);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      onMessage={handleWebViewMessage}
      injectedJavaScript={\`
        // Listen for state changes from other WebViews
        window.onStateChange = (key, value) => {
          if (window.handleSharedState) {
            window.handleSharedState(key, value);
          }
        };
      \`}
    />
  );
};`

  const pwaIntegrationCode = `// PWA-Optimized WebView
const PWAWebView = ({ url }) => {
  const [isPWAReady, setIsPWAReady] = useState(false);
  const [offlineCapable, setOfflineCapable] = useState(false);

  const pwaInitScript = \`
    // Service Worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);

          // Check for updates
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

    // Offline/online event handling
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

    // PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.deferredPrompt = e;

      window.ReactNativeWebView?.postMessage(JSON.stringify({
        type: 'pwa_installable'
      }));
    });

    // Native app behavior
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('selectstart', (e) => e.preventDefault());

    // Handle safe area insets
    const applyMobileSafeArea = () => {
      const style = document.createElement('style');
      style.textContent = \\\`
        body {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
      \\\`;
      document.head.appendChild(style);
    };

    applyMobileSafeArea();
  \`;

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
};`

  const debuggingCode = `// Production Debugging Tools
const useWebViewDebugging = (webViewRef) => {
  const [debugLogs, setDebugLogs] = useState([]);

  // Comprehensive error tracking
  const errorTrackingScript = \`
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

    // Monitor network requests
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
  \`;

  // Handle debug messages
  const handleDebugMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      if (message.type === 'error') {
        // Log to crash reporting service
        crashlytics().recordError(new Error(message.message));

        // Log to analytics
        analytics().logEvent('webview_error', {
          error_type: message.errorType,
          url: message.url,
          user_agent: message.userAgent,
        });

        setDebugLogs(prev => [...prev, \`[ERROR] \${message.message}\`]);
      }

      if (message.type === 'network') {
        setDebugLogs(prev => [...prev,
          \`[NETWORK] \${message.url} - \${message.status} (\${message.duration}ms)\`
        ]);
      }
    } catch (error) {
      console.error('Invalid debug message:', event.nativeEvent.data);
    }
  };

  // Debug overlay for development
  const enableDebugOverlay = () => {
    if (__DEV__) {
      webViewRef.current?.injectJavaScript(\`
        if (!document.getElementById('debug-overlay')) {
          const debugDiv = document.createElement('div');
          debugDiv.id = 'debug-overlay';
          debugDiv.style.cssText = \\\`
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
          \\\`;
          document.body.appendChild(debugDiv);

          // Override console.log to show in overlay
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
      \`);
    }
  };

  return {
    errorTrackingScript,
    handleDebugMessage,
    enableDebugOverlay,
    debugLogs
  };
};`

  const commonIssues = [
    {
      category: 'Loading Problems',
      icon: AlertTriangle,
      color: 'red',
      issues: [
        {
          problem: 'Network connectivity and timeout handling',
          solutions: ['Implement exponential backoff for retries', 'Show meaningful error messages', 'Cache critical content for offline']
        },
        {
          problem: 'Mixed content (HTTPS/HTTP) issues',
          solutions: ['Use HTTPS-only in production', 'Audit web content for HTTP resources', 'Configure mixedContentMode properly']
        },
        {
          problem: 'Domain whitelist configuration',
          solutions: ['Include all necessary domains and subdomains', 'Account for authentication redirects', 'Monitor navigation failures in analytics']
        }
      ]
    },
    {
      category: 'Performance Issues',
      icon: Zap,
      color: 'yellow',
      issues: [
        {
          problem: 'Memory leaks and proper cleanup',
          solutions: ['Remove event listeners on unmount', 'Clear timers and intervals', 'Monitor memory usage in production']
        },
        {
          problem: 'Large DOM handling',
          solutions: ['Implement virtual scrolling', 'Lazy load images and content', 'Set explicit dimensions to prevent layout shifts']
        },
        {
          problem: 'Platform-specific differences',
          solutions: ['Test on both iOS and Android', 'Handle keyboard differently per platform', 'Account for different WebView capabilities']
        }
      ]
    }
  ]

  return (
    <PresentationLayout
      title="Advanced WebView Topics & Troubleshooting"
      subtitle="Production challenges, debugging, and advanced patterns • 20 minutes"
    >
      <div className="space-y-8">
        {/* Common Issues */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Bug className="mr-3 text-primary-600" size={24} />
            Common Issues & Solutions
          </h2>

          <div className="space-y-6">
            {commonIssues.map((category, index) => {
              const IconComponent = category.icon
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <IconComponent className={`mr-3 text-${category.color}-600`} size={20} />
                    {category.category}
                  </h3>

                  <div className="space-y-4">
                    {category.issues.map((issue, issueIndex) => (
                      <div key={issueIndex} className="border-l-4 border-gray-300 pl-4">
                        <h4 className="font-medium text-gray-800 mb-2">{issue.problem}</h4>
                        <ul className="space-y-1">
                          {issue.solutions.map((solution, solutionIndex) => (
                            <li key={solutionIndex} className="text-sm text-gray-600 flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <CodeBlock
            code={errorHandlingCode}
            title="Production Error Handling Pattern"
            language="typescript"
          />
        </section>

        {/* Advanced Integration Patterns */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Layers className="mr-3 text-primary-600" size={24} />
            Advanced Integration Patterns
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">WebView Lifecycle</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Proper mounting/unmounting</li>
                <li>• Background/foreground handling</li>
                <li>• Memory cleanup best practices</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-900 mb-2">Multi-WebView Architecture</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• When to use multiple WebViews</li>
                <li>• Shared state management</li>
                <li>• Navigation between screens</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-medium text-purple-900 mb-2">PWA Integration</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Service worker compatibility</li>
                <li>• Offline functionality</li>
                <li>• App-like behavior patterns</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Memory Management & Lifecycle</h3>
              <CodeBlock
                code={memoryManagementCode}
                title="Production Memory Management"
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-WebView State Management</h3>
              <CodeBlock
                code={multiWebViewCode}
                title="Shared State Across WebView Instances"
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">PWA Integration</h3>
              <CodeBlock
                code={pwaIntegrationCode}
                title="Progressive Web App WebView Integration"
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Debugging Techniques */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Bug className="mr-3 text-primary-600" size={24} />
            Production Debugging Techniques
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-medium text-blue-900 mb-3">Debugging WebView issues requires a multi-layered approach</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border">
                <h4 className="text-sm font-medium text-blue-800">Remote Debugging</h4>
                <p className="text-xs text-blue-600 mt-1">
                  Chrome DevTools for Android, Safari Developer for iOS
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="text-sm font-medium text-blue-800">Error Tracking</h4>
                <p className="text-xs text-blue-600 mt-1">
                  Comprehensive logging to crash reporting services
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="text-sm font-medium text-blue-800">Network Monitoring</h4>
                <p className="text-xs text-blue-600 mt-1">
                  Track API performance and failure patterns
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={debuggingCode}
            title="Production Debugging Infrastructure"
            language="typescript"
          />
        </section>

        {/* Key Takeaways */}
        <section className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg border border-primary-200">
          <h2 className="text-xl font-semibold text-primary-900 mb-4 flex items-center">
            <TrendingUp className="mr-3" size={24} />
            Production Success Principles
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-primary-800 mb-3">Development Philosophy</h3>
              <ul className="space-y-2 text-sm text-primary-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">▶</span>
                  <span><strong>Always plan for failure:</strong> Network issues, memory problems, platform differences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">▶</span>
                  <span><strong>Monitor performance:</strong> Memory leaks kill long-running apps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">▶</span>
                  <span><strong>Implement proper debugging:</strong> You'll need it when things go wrong</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-primary-800 mb-3">User Experience Focus</h3>
              <ul className="space-y-2 text-sm text-primary-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">▶</span>
                  <span><strong>Think like a native app:</strong> Users expect native behavior even in WebView</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">▶</span>
                  <span><strong>Balance functionality and performance:</strong> WebView is about integration, not replacement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">▶</span>
                  <span><strong>Security without compromise:</strong> Protect users while maintaining seamless experience</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded border border-primary-300">
            <p className="text-primary-800 font-medium mb-2">
              🚀 WebView development is about balancing functionality, performance, and user experience
            </p>
            <p className="text-sm text-primary-700">
              These advanced patterns and troubleshooting techniques will serve you well in production.
              Remember: successful WebView integration combines technical excellence with thoughtful user experience design.
            </p>
          </div>
        </section>
      </div>
    </PresentationLayout>
  )
}