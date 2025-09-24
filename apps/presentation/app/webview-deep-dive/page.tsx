import PresentationLayout from '../components/PresentationLayout'
import CodeBlock from '../components/CodeBlock'
import { Settings, MessageCircle, Shield, Zap, Code, ArrowRightLeft } from 'lucide-react'

export default function WebViewDeepDivePage() {
  const basicConfigCode = `import { WebView } from 'react-native-webview';

const WebViewScreen = () => {
  return (
    <WebView
      // Essential props for modern web apps
      javaScriptEnabled={true}              // Enable JavaScript execution
      domStorageEnabled={true}              // Enable localStorage/sessionStorage
      thirdPartyCookiesEnabled={true}       // Enable SSO cookies

      // User experience enhancements
      startInLoadingState={true}            // Show loading indicator
      allowsBackForwardNavigationGestures={true}  // iOS swipe gestures
      userAgent="MyApp/1.0 Mozilla/5.0 (compatible; Mobile)"

      // Source URL
      source={{ uri: 'https://your-web-app.com' }}
    />
  );
};`

  const securityConfigCode = `// Security-focused WebView configuration
<WebView
  // URL whitelisting - first line of defense
  originWhitelist={[
    'https://trusted-domain.com',
    'https://api.company.com',
    'https://auth.company.com'
  ]}

  // Content security
  mixedContentMode="never"                // HTTPS only in production
  allowsInlineMediaPlayback={false}       // Prevent auto-playing media

  // Error handling
  onError={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.description.includes('mixed content')) {
      showMixedContentWarning();
    }
  }}

  // Input validation for injected JavaScript
  onMessage={(event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      // Always validate message structure
      if (isValidMessage(message)) {
        handleMessage(message);
      }
    } catch (error) {
      console.error('Invalid message format:', error);
    }
  }}
/>`

  const performanceCode = `// Performance optimization strategies
const OptimizedWebView = () => {
  const webViewRef = useRef<WebView>(null);

  // Memory management
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      webViewRef.current?.stopLoading();
    };
  }, []);

  // App state handling
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' && webViewRef.current) {
        // Pause expensive operations
        webViewRef.current.injectJavaScript(\`
          if (window.pauseAnimations) window.pauseAnimations();
        \`);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, []);

  return (
    <WebView
      ref={webViewRef}
      // Caching strategy
      cacheEnabled={true}
      cacheMode="LOAD_CACHE_ELSE_NETWORK"

      // Initialization script (runs once on load)
      injectedJavaScript={\`
        window.appConfig = \${JSON.stringify(config)};
        // Large DOM optimization
        if (window.virtualizeList) {
          window.virtualizeList('.large-data-table', {
            itemHeight: 50,
            bufferSize: 10
          });
        }
      \`}
    />
  );
};`

  const nativeToWebCode = `// React Native → WebView Communication
const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [counter, setCounter] = useState(0);

  // Method 1: Dynamic JavaScript injection
  const sendDataToWebView = (data) => {
    const jsCode = \`
      if (window.receiveNativeData) {
        window.receiveNativeData(\${JSON.stringify(data)});
      }
    \`;
    webViewRef.current?.injectJavaScript(jsCode);
  };

  // Method 2: URL with hash parameters (for initial data)
  const navigateWithToken = (token) => {
    const url = \`https://dashboard.app.com#access_token=\${token}&expires_in=3600\`;
    webViewRef.current?.source = { uri: url };
  };

  // Method 3: PostMessage from native context
  const sendMessage = (message) => {
    const jsCode = \`
      window.postMessage(\${JSON.stringify(message)}, '*');
    \`;
    webViewRef.current?.injectJavaScript(jsCode);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Send Data to WebView"
        onPress={() => sendDataToWebView({ counter, timestamp: Date.now() })}
      />
      <WebView ref={webViewRef} /* ... props */ />
    </View>
  );
};`

  const webToNativeCode = `// WebView → React Native Communication
// In your web application (JavaScript):
const sendToNative = (type, data) => {
  const message = {
    type,
    payload: data,
    timestamp: Date.now()
  };

  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  }
};

// Usage examples in web app
sendToNative('user_action', { action: 'logout' });
sendToNative('navigation', { page: 'settings' });
sendToNative('error', { message: 'Failed to load data' });

// In React Native component:
const handleWebViewMessage = (event) => {
  try {
    const message = JSON.parse(event.nativeEvent.data);

    switch (message.type) {
      case 'user_action':
        if (message.payload.action === 'logout') {
          handleLogout();
        }
        break;
      case 'navigation':
        navigation.navigate(message.payload.page);
        break;
      case 'error':
        Alert.alert('Error', message.payload.message);
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  } catch (error) {
    console.error('Failed to parse WebView message:', error);
  }
};`

  const productionPatternsCode = `// Production-ready communication patterns
const ProductionWebView = () => {
  const [messageQueue, setMessageQueue] = useState([]);

  // Structured message format
  const sendStructuredMessage = (type, payload, options = {}) => {
    const message = {
      id: Math.random().toString(36),
      type,
      payload,
      timestamp: Date.now(),
      ...options
    };

    // Queue for reliability
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(\`
        if (window.handleNativeMessage) {
          window.handleNativeMessage(\${JSON.stringify(message)});
        }
      \`);
    } else {
      setMessageQueue(prev => [...prev, message]);
    }
  };

  // Flush queue when WebView is ready
  const onLoadEnd = () => {
    messageQueue.forEach(message => {
      webViewRef.current?.injectJavaScript(\`
        window.handleNativeMessage(\${JSON.stringify(message)});
      \`);
    });
    setMessageQueue([]);
  };

  // Error handling with timeout
  const sendMessageWithTimeout = async (message, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const messageId = message.id;
      const timeoutId = setTimeout(() => {
        reject(new Error('Message timeout'));
      }, timeout);

      // Send message
      sendStructuredMessage(message.type, message.payload, { id: messageId });

      // Wait for response (implement response handler)
      const handleResponse = (response) => {
        if (response.id === messageId) {
          clearTimeout(timeoutId);
          resolve(response);
        }
      };
    });
  };

  return (
    <WebView
      onLoadEnd={onLoadEnd}
      onMessage={handleWebViewMessage}
      // ... other props
    />
  );
};`

  return (
    <PresentationLayout
      title="WebView Deep Dive & Communication Bridges"
      subtitle="Configuration, security, and communication patterns • 20 minutes"
    >
      <div className="space-y-8">
        {/* Essential Configuration */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="mr-3 text-primary-600" size={24} />
            Essential WebView Configuration
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">JavaScript & Storage</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <code>javaScriptEnabled</code> - Modern web apps require JS</li>
                <li>• <code>domStorageEnabled</code> - localStorage/sessionStorage</li>
                <li>• <code>thirdPartyCookiesEnabled</code> - SSO authentication</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-900 mb-2">User Experience</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <code>startInLoadingState</code> - Loading feedback</li>
                <li>• <code>userAgent</code> - API compatibility</li>
                <li>• <code>allowsBackForwardNavigationGestures</code></li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-medium text-purple-900 mb-2">Performance</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• <code>cacheEnabled</code> - Resource caching</li>
                <li>• <code>injectedJavaScript</code> - Initialization</li>
                <li>• <code>onLoadEnd</code> - Timing control</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            code={basicConfigCode}
            title="Basic WebView Configuration"
            language="typescript"
          />
        </section>

        {/* Security Considerations */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="mr-3 text-primary-600" size={24} />
            Security Considerations
          </h2>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="font-medium text-red-900 mb-3">Security in WebView isn&apos;t just about preventing attacks</h3>
            <p className="text-red-700">
              It&apos;s about building trust with your users and protecting your business. Every security measure
              should be implemented with both technical protection and user experience in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-3">URL and Origin Control</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>originWhitelist</strong> - First line of defense against malicious redirects</li>
                <li>• <strong>Data protection</strong> - Ensures tokens only go to trusted endpoints</li>
                <li>• <strong>Compliance</strong> - Many enterprise environments require strict URL control</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-3">Content Security</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>mixedContentMode</strong> - HTTPS-only for production</li>
                <li>• <strong>Input validation</strong> - Never inject user strings directly</li>
                <li>• <strong>CSP headers</strong> - Work with web developers to implement</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            code={securityConfigCode}
            title="Security-Focused Configuration"
            language="typescript"
          />
        </section>

        {/* Performance Optimization */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="mr-3 text-primary-600" size={24} />
            Performance Optimization
          </h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-yellow-900 mb-2">Performance in WebView directly impacts user retention</h3>
            <p className="text-sm text-yellow-700">
              Slow WebViews feel broken to users. Every optimization technique should focus on perceived performance
              and user experience, not just technical metrics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Caching Strategies</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Network efficiency and offline experience</li>
                <li>• Cached resources load instantly</li>
                <li>• Monitor cache size to prevent bloat</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-900 mb-2">JavaScript Injection</h3>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• <code>injectedJavaScript</code> - Once on load</li>
                <li>• <code>injectJavaScript()</code> - On demand</li>
                <li>• Use after <code>onLoadEnd</code> for reliability</li>
              </ul>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-medium text-red-900 mb-2">Memory Management</h3>
              <ul className="text-xs text-red-700 space-y-1">
                <li>• Remove listeners on component unmount</li>
                <li>• Don&apos;t hold strong WebView references</li>
                <li>• Monitor large DOM trees</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            code={performanceCode}
            title="Performance Optimization Patterns"
            language="typescript"
          />
        </section>

        {/* Communication Bridges */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <ArrowRightLeft className="mr-3 text-primary-600" size={24} />
            Communication Bridges
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Two-Way Communication Overview</h3>
            <p className="text-gray-700">
              This is where WebView transforms from a simple browser into a powerful integration platform.
              Proper communication bridges enable seamless user experiences that feel native.
            </p>
          </div>

          {/* Native to WebView */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Code className="mr-2 text-blue-600" size={20} />
              React Native → WebView Communication
            </h3>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">injectJavaScript()</h4>
                <p className="text-xs text-blue-700">Real-time communication, complex operations, state synchronization</p>
              </div>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">URL Hash Params</h4>
                <p className="text-xs text-green-700">Authentication tokens, initial configuration, secure data passing</p>
              </div>
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">PostMessage</h4>
                <p className="text-xs text-purple-700">Standard web messaging, third-party integration compatibility</p>
              </div>
            </div>

            <CodeBlock
              code={nativeToWebCode}
              title="Native to WebView Communication Methods"
              language="typescript"
            />
          </div>

          {/* WebView to Native */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="mr-2 text-green-600" size={20} />
              WebView → React Native Communication
            </h3>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-green-900 mb-2">Primary Method: window.ReactNativeWebView.postMessage()</h4>
              <p className="text-sm text-green-700">
                This is the standard and most reliable approach for sending data from web content to React Native.
                Always use structured JSON messages with proper error handling.
              </p>
            </div>

            <CodeBlock
              code={webToNativeCode}
              title="WebView to Native Communication"
              language="typescript"
            />
          </div>

          {/* Production Patterns */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Production-Ready Patterns</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Message Structure</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>type</strong> - Action identifier</li>
                  <li>• <strong>payload</strong> - Data object</li>
                  <li>• <strong>timestamp</strong> - For debugging</li>
                  <li>• <strong>id</strong> - For request/response patterns</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Error Handling</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• JSON parsing errors - Always wrap in try-catch</li>
                  <li>• Unknown message types - Log and ignore gracefully</li>
                  <li>• Payload validation - Check structure before using</li>
                  <li>• Timeout handling - For critical operations</li>
                </ul>
              </div>
            </div>

            <CodeBlock
              code={productionPatternsCode}
              title="Production Communication Patterns"
              language="typescript"
            />
          </div>
        </section>

        {/* Best Practices Summary */}
        <section className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg border border-primary-200">
          <h2 className="text-xl font-semibold text-primary-900 mb-4">Key Takeaways</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-primary-800 mb-3">Configuration Principles</h3>
              <ul className="space-y-2 text-sm text-primary-700">
                <li>• Always combine security with usability</li>
                <li>• Plan for error scenarios and edge cases</li>
                <li>• Optimize for perceived performance, not just metrics</li>
                <li>• Test on both iOS and Android platforms</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-primary-800 mb-3">Communication Best Practices</h3>
              <ul className="space-y-2 text-sm text-primary-700">
                <li>• Use structured JSON messages with type safety</li>
                <li>• Implement proper error handling and timeouts</li>
                <li>• Design for message queuing and reliability</li>
                <li>• Build debugging tools into development workflow</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PresentationLayout>
  )
}