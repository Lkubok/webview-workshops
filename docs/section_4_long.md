# React Native WebView Integration Workshop - Presentation Script

## Section 4: Hands-on Coding Session (90 min) 10:00–11:30

---

### Opening and Session Structure (5 minutes)

"Now comes the exciting part – putting everything we've learned into practice! Over the next 90 minutes, you'll build a complete WebView integration system from scratch, working through 5 progressive exercises that take you from basic setup to advanced authentication and state management.

**How This Session Works:**

We've designed 5 exercises that build on each other, each teaching specific skills you'll need in production:

1. **Basic WebView Setup** (15 min) - Foundation and core concepts
2. **Two-Way Communication** (20 min) - Building bridges between native and web
3. **Cookie Management** (20 min) - Handling web storage and synchronization
4. **Token Exchange** (20 min) - Implementing secure authentication flows
5. **Navigation & State** (15 min) - Advanced integration patterns

**Exercise Structure:**

Each exercise is located in the `exercises/` folder with this structure:

- `mobile-app/` - React Native WebView components
- `nextjs-page/` - Next.js page components

You have three ways to approach each exercise:

- **Build from scratch**: Start with `*-initial.tsx` files that have TODOs
- **Reference solutions**: Look at `*-final.tsx` files for complete implementations
- **Use git branches**: Switch to `exercise-1`, `exercise-2`, etc. for working examples

**My recommendation**: Try building from the initial files first, then check the final versions if you get stuck. This maximizes your learning.

Let's start with Exercise 1!"

---

## Exercise 1 – Basic WebView Setup (15 minutes)

### Introduction and Goals (2 minutes)

"**Exercise 1 Goal**: Learn the fundamentals of React Native WebView integration by loading a Next.js application inside your mobile app.

This might seem simple, but we're establishing the foundation for everything that follows. You'll understand:

- Minimal WebView configuration requirements
- How to load local development servers
- Basic error handling and loading states
- The relationship between your React Native app and embedded web content

**What you'll build**: A working WebView that displays our device dashboard web app inside the mobile application.

**Files to modify**:

- `apps/client-app/app/(tabs)/webview.tsx` - Replace with exercise files
- `apps/device-dashboard/app/embedded/page.tsx` - Replace with exercise files"

### Exercise 1 Implementation Guidance (10 minutes)

"Let's start coding! Open the exercise files and follow along.

**Step 1: Basic WebView Component Setup**

In your `webview.tsx` file, you'll see TODOs for:

```typescript
// TODO: Import WebView from react-native-webview
import { WebView } from 'react-native-webview';

// TODO: Set up basic WebView with source URL
const WebViewScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
        // TODO: Add essential props
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};
```

**Why these props matter**:

- `javaScriptEnabled={true}` - Modern web apps require JavaScript
- `domStorageEnabled={true}` - Enables localStorage and sessionStorage
- `startInLoadingState={true}` - Shows loading indicator while page loads

**Step 2: Add Loading and Error Handling**

```typescript
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

<WebView
  source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
  onLoadStart={() => setIsLoading(true)}
  onLoadEnd={() => setIsLoading(false)}
  onError={(syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    setError(nativeEvent.description);
    setIsLoading(false);
  }}
  renderLoading={() => <ActivityIndicator size="large" />}
  renderError={() => (
    <View style={styles.errorContainer}>
      <Text>Failed to load: {error}</Text>
      <Button title="Retry" onPress={() => webViewRef.current?.reload()} />
    </View>
  )}
/>
```

**Step 3: Next.js Embedded Page Setup**

In your `page.tsx` file, create a simple embedded page:

```typescript
'use client';

export default function EmbeddedPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect if we're running in WebView
    const isWebView = window.ReactNativeWebView !== undefined;
    console.log('Running in WebView:', isWebView);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Device Dashboard</h1>
      <p>This page is embedded in React Native WebView</p>

      <div style={{
        background: '#f0f0f0',
        padding: '10px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3>Environment Info</h3>
        <p>User Agent: {navigator.userAgent}</p>
        <p>Screen Size: {window.screen.width} x {window.screen.height}</p>
        <p>WebView Detected: {window.ReactNativeWebView ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
```

**Common issues you might encounter**:

1. **URL not loading**: Check that your Next.js dev server is running on port 3010
2. **Blank screen**: Verify `javaScriptEnabled={true}` is set
3. **Loading forever**: Check network connectivity and URL spelling

**Test your implementation**: You should see the Next.js page load inside your React Native app with environment information displayed."

### Exercise 1 Wrap-up (3 minutes)

"Excellent! You've just created your first WebView integration. Let's verify what we accomplished:

✅ **WebView loads external content** - Your React Native app can display web pages
✅ **Basic error handling** - Users see meaningful feedback when things go wrong
✅ **Loading states** - Professional user experience during page loads
✅ **Environment detection** - Web page knows it's running inside WebView

**Key takeaway**: Even 'simple' WebView setup requires thought about error handling, loading states, and user experience. This foundation makes everything else possible.

Ready for Exercise 2? We're going to make these apps talk to each other!"

---

## Exercise 2 – Two-Way Communication Bridge (20 minutes)

### Introduction and Goals (3 minutes)

"**Exercise 2 Goal**: Create bidirectional communication between your React Native app and the embedded web page.

This is where WebView becomes truly powerful – when native and web can communicate seamlessly. You'll learn:

- Sending data from React Native to WebView using `injectJavaScript()`
- Sending messages from WebView to React Native using `postMessage()`
- Structured message formats for reliable communication
- Error handling for communication failures

**What you'll build**: A counter that can be incremented from both the React Native side and the web side, with synchronization between both contexts.

**Communication flow**:
Native Button → Increment Counter in WebView → Confirmation Message Back to Native"

### Exercise 2 Implementation Guidance (14 minutes)

"Let's build robust two-way communication!

**Step 1: Native to WebView Communication**

In your React Native component:

```typescript
const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [counter, setCounter] = useState(0);
  const [lastMessage, setLastMessage] = useState('');

  // Send data to WebView
  const incrementCounterInWebView = () => {
    const newCount = counter + 1;
    setCounter(newCount);

    // Inject JavaScript to update WebView
    const jsCode = `
      if (window.updateCounter) {
        window.updateCounter(${newCount});
      }
    `;
    webViewRef.current?.injectJavaScript(jsCode);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Native controls */}
      <View style={styles.nativeControls}>
        <Text>Native Counter: {counter}</Text>
        <Button
          title="Increment in WebView"
          onPress={incrementCounterInWebView}
        />
        <Text>Last Message: {lastMessage}</Text>
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};
```

**Step 2: WebView to Native Communication**

```typescript
// Handle messages from WebView
const handleWebViewMessage = event => {
  try {
    const message = JSON.parse(event.nativeEvent.data);

    switch (message.type) {
      case "counter_updated":
        setCounter(message.value);
        setLastMessage(`WebView updated counter to ${message.value}`);
        break;

      case "button_clicked":
        setLastMessage(`WebView button clicked: ${message.buttonName}`);
        break;

      default:
        console.log("Unknown message type:", message.type);
    }
  } catch (error) {
    console.error("Failed to parse WebView message:", error);
    setLastMessage("Error parsing message from WebView");
  }
};
```

**Step 3: Enhanced WebView Page with Communication**

In your Next.js page:

```typescript
'use client';

export default function EmbeddedPage() {
  const [counter, setCounter] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);

  // Function that React Native can call
  useEffect(() => {
    window.updateCounter = (newValue) => {
      setCounter(newValue);
      addMessage(`Counter updated by React Native: ${newValue}`);
    };

    // Cleanup
    return () => {
      delete window.updateCounter;
    };
  }, []);

  const addMessage = (message) => {
    setMessages(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Send message to React Native
  const sendToNative = (type, data) => {
    const message = {
      type,
      ...data,
      timestamp: Date.now()
    };

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
      addMessage(`Sent to native: ${type}`);
    } else {
      addMessage('ReactNativeWebView not available');
    }
  };

  const incrementCounter = () => {
    const newValue = counter + 1;
    setCounter(newValue);

    // Notify React Native
    sendToNative('counter_updated', { value: newValue });
  };

  const sendButtonClick = (buttonName) => {
    sendToNative('button_clicked', { buttonName });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Two-Way Communication Demo</h1>

      <div style={{ marginBottom: '20px' }}>
        <h3>Counter: {counter}</h3>
        <button
          onClick={incrementCounter}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            marginRight: '10px'
          }}
        >
          Increment from WebView
        </button>

        <button
          onClick={() => sendButtonClick('test-button')}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Send Test Message
        </button>
      </div>

      <div style={{
        background: '#f0f0f0',
        padding: '15px',
        borderRadius: '8px',
        maxHeight: '200px',
        overflow: 'auto'
      }}>
        <h4>Message Log:</h4>
        {messages.map((msg, index) => (
          <div key={index} style={{ fontSize: '14px', marginBottom: '5px' }}>
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 4: Add TypeScript Declarations**

Create proper type definitions:

```typescript
// In your types file
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    updateCounter?: (value: number) => void;
  }
}

// Message types for better structure
interface WebViewMessage {
  type: "counter_updated" | "button_clicked";
  value?: number;
  buttonName?: string;
  timestamp: number;
}
```

**Testing your implementation**:

1. Increment counter from React Native - should update WebView
2. Increment counter from WebView - should update React Native
3. Check message log shows all communications
4. Verify error handling with malformed messages"

### Exercise 2 Wrap-up (3 minutes)

"Outstanding! You've built a robust two-way communication system. Let's review what you accomplished:

✅ **Native to WebView**: `injectJavaScript()` calls functions in web context
✅ **WebView to Native**: `postMessage()` sends structured data to React Native
✅ **Message structure**: JSON format with type safety and error handling
✅ **Real-time sync**: Both sides stay synchronized automatically

**Key insights**:

- Always use structured JSON messages, never plain strings
- Include error handling for message parsing
- Global window functions enable clean native-to-web communication
- Message logs help debug communication issues

**Production tip**: In real apps, batch multiple updates to avoid performance issues with frequent communication.

Ready for Exercise 3? We'll tackle cookie management and web storage!"

---

## Exercise 3 – Cookie Handling and Communication (20 minutes)

### Introduction and Goals (3 minutes)

"**Exercise 3 Goal**: Implement cookie management and synchronization between React Native and WebView contexts.

Cookie handling is critical for authentication, user preferences, and session management. You'll learn:

- Reading and writing cookies from WebView JavaScript
- Synchronizing cookie data with React Native storage
- Managing cookie expiration and security
- Handling cross-domain cookie scenarios

**What you'll build**: A cookie management interface that works across both React Native and WebView, with manual and automatic synchronization.

**Real-world application**: This pattern is essential for maintaining user sessions, preferences, and authentication state across hybrid applications."

### Exercise 3 Implementation Guidance (14 minutes)

"Let's build comprehensive cookie management!

**Step 1: Cookie Utilities in WebView**

In your Next.js page, add cookie management:

```typescript
'use client';

export default function EmbeddedPage() {
  const [cookies, setCookies] = useState<Record<string, string>>({});
  const [newCookieKey, setNewCookieKey] = useState('');
  const [newCookieValue, setNewCookieValue] = useState('');

  // Cookie utility functions
  const cookieUtils = {
    // Parse document.cookie into object
    getCookies: () => {
      const cookieObj = {};
      document.cookie.split(';').forEach(cookie => {
        const [key, value] = cookie.split('=').map(s => s.trim());
        if (key) cookieObj[key] = value || '';
      });
      return cookieObj;
    },

    // Set a cookie with options
    setCookie: (key, value, options = {}) => {
      const {
        expires = null,
        maxAge = null,
        path = '/',
        secure = false,
        sameSite = 'Strict'
      } = options;

      let cookieString = `${key}=${value}; path=${path}; SameSite=${sameSite}`;

      if (expires) {
        cookieString += `; expires=${expires.toUTCString()}`;
      }
      if (maxAge) {
        cookieString += `; max-age=${maxAge}`;
      }
      if (secure) {
        cookieString += `; secure`;
      }

      document.cookie = cookieString;
    },

    // Delete a cookie
    deleteCookie: (key, path = '/') => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
    }
  };

  // Load cookies on mount and set up auto-refresh
  useEffect(() => {
    const loadCookies = () => {
      const currentCookies = cookieUtils.getCookies();
      setCookies(currentCookies);

      // Send cookie data to React Native
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'cookies_updated',
          cookies: currentCookies,
          timestamp: Date.now()
        }));
      }
    };

    loadCookies();

    // Auto-refresh cookies every 5 seconds to catch external changes
    const interval = setInterval(loadCookies, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function for React Native to call
  useEffect(() => {
    window.syncCookiesFromNative = (nativeCookies) => {
      Object.entries(nativeCookies).forEach(([key, value]) => {
        cookieUtils.setCookie(key, value, { maxAge: 86400 }); // 24 hours
      });

      // Refresh display
      setCookies(cookieUtils.getCookies());
    };

    return () => {
      delete window.syncCookiesFromNative;
    };
  }, []);

  const handleSetCookie = () => {
    if (newCookieKey.trim() && newCookieValue.trim()) {
      cookieUtils.setCookie(newCookieKey.trim(), newCookieValue.trim(), {
        maxAge: 3600 // 1 hour
      });

      // Refresh cookies display
      setCookies(cookieUtils.getCookies());

      // Clear form
      setNewCookieKey('');
      setNewCookieValue('');
    }
  };

  const handleDeleteCookie = (key) => {
    cookieUtils.deleteCookie(key);
    setCookies(cookieUtils.getCookies());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Cookie Management Demo</h1>

      {/* Add new cookie */}
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Add New Cookie</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Cookie key"
            value={newCookieKey}
            onChange={(e) => setNewCookieKey(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Cookie value"
            value={newCookieValue}
            onChange={(e) => setNewCookieValue(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            onClick={handleSetCookie}
            style={{ padding: '8px 16px', borderRadius: '4px', background: '#007AFF', color: 'white', border: 'none' }}
          >
            Set Cookie
          </button>
        </div>
      </div>

      {/* Cookie list */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Cookies ({Object.keys(cookies).length})</h3>
        {Object.keys(cookies).length === 0 ? (
          <p style={{ color: '#666' }}>No cookies found</p>
        ) : (
          <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
            {Object.entries(cookies).map(([key, value]) => (
              <div key={key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
                padding: '8px',
                background: 'white',
                borderRadius: '4px'
              }}>
                <span style={{ fontFamily: 'monospace' }}>
                  <strong>{key}</strong>: {value}
                </span>
                <button
                  onClick={() => handleDeleteCookie(key)}
                  style={{
                    padding: '4px 8px',
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: React Native Cookie Management**

```typescript
const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [nativeCookies, setNativeCookies] = useState<Record<string, string>>({});
  const [webViewCookies, setWebViewCookies] = useState<Record<string, string>>({});

  // Handle messages from WebView
  const handleWebViewMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      if (message.type === 'cookies_updated') {
        setWebViewCookies(message.cookies);

        // Optionally sync to native storage
        saveCookiesToNativeStorage(message.cookies);
      }
    } catch (error) {
      console.error('Failed to parse WebView message:', error);
    }
  };

  // Save cookies to React Native AsyncStorage
  const saveCookiesToNativeStorage = async (cookies) => {
    try {
      await AsyncStorage.setItem('webview_cookies', JSON.stringify(cookies));
    } catch (error) {
      console.error('Failed to save cookies to native storage:', error);
    }
  };

  // Load cookies from native storage
  const loadCookiesFromNativeStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem('webview_cookies');
      if (stored) {
        const cookies = JSON.parse(stored);
        setNativeCookies(cookies);
        return cookies;
      }
    } catch (error) {
      console.error('Failed to load cookies from native storage:', error);
    }
    return {};
  };

  // Sync native cookies to WebView
  const syncCookiesToWebView = () => {
    const jsCode = `
      if (window.syncCookiesFromNative) {
        window.syncCookiesFromNative(${JSON.stringify(nativeCookies)});
      }
    `;
    webViewRef.current?.injectJavaScript(jsCode);
  };

  // Add a cookie from native side
  const addNativeCookie = () => {
    Alert.prompt(
      'Add Cookie',
      'Enter cookie key and value',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: (input) => {
            const [key, value] = (input || '').split(':').map(s => s.trim());
            if (key && value) {
              const updatedCookies = { ...nativeCookies, [key]: value };
              setNativeCookies(updatedCookies);
              saveCookiesToNativeStorage(updatedCookies);
            }
          }
        }
      ],
      'plain-text',
      'key:value'
    );
  };

  // Load cookies on mount
  useEffect(() => {
    loadCookiesFromNativeStorage().then(cookies => {
      setNativeCookies(cookies);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Native cookie controls */}
      <View style={styles.cookieControls}>
        <Text style={styles.sectionTitle}>Native Cookie Management</Text>

        <View style={styles.cookieSection}>
          <Text>Native Cookies: {Object.keys(nativeCookies).length}</Text>
          <Button title="Add Cookie" onPress={addNativeCookie} />
          <Button title="Sync to WebView" onPress={syncCookiesToWebView} />
        </View>

        <View style={styles.cookieSection}>
          <Text>WebView Cookies: {Object.keys(webViewCookies).length}</Text>
          <Text style={styles.cookieList}>
            {Object.entries(webViewCookies).map(([k, v]) => `${k}=${v}`).join(', ')}
          </Text>
        </View>
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    </View>
  );
};
```

**Testing your implementation**:

1. Add cookies from WebView interface
2. Add cookies from React Native prompts
3. Sync cookies between contexts
4. Verify cookies persist across app restarts
5. Test cookie deletion from both sides"

### Exercise 3 Wrap-up (3 minutes)

"Excellent work! You've built a comprehensive cookie management system. Key achievements:

✅ **Cookie CRUD operations** - Create, read, update, delete from both contexts
✅ **Cross-platform sync** - Cookies flow between React Native and WebView
✅ **Persistent storage** - Cookies survive app restarts via AsyncStorage
✅ **Real-time updates** - Changes are immediately reflected in both contexts

**Production insights**:

- Cookie synchronization is crucial for authentication flows
- Always handle cookie expiration and security flags appropriately
- Consider using secure storage for sensitive cookie data
- Monitor cookie size limits (4KB per cookie, ~300 cookies per domain)

Ready for Exercise 4? We'll implement secure token exchange!"

---

## Exercise 4 – Token Exchange and Update in WebView (20 minutes)

### Introduction and Goals (3 minutes)

"**Exercise 4 Goal**: Implement the secure token exchange pattern we discussed earlier, with role-based UI and automatic token refresh.

This is the most complex exercise, combining authentication, security, and user experience. You'll learn:

- Parsing JWT tokens and extracting role information
- Implementing automatic token refresh mechanisms
- Role-based UI rendering based on token contents
- Secure token passing via hash parameters

**What you'll build**: A complete authentication system that exchanges tokens, displays user roles, shows token expiration countdown, and handles automatic renewal.

**Real-world application**: This pattern is used in production apps for secure integration with external services while maintaining role-based access control."

### Exercise 4 Implementation Guidance (14 minutes)

"Let's implement production-grade token management!

**Step 1: Token Utilities and JWT Parsing**

In your Next.js page:

```typescript
'use client';

export default function EmbeddedPage() {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [timeUntilExpiry, setTimeUntilExpiry] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // JWT parsing utilities
  const tokenUtils = {
    parseJWT: (token) => {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = JSON.parse(atob(parts[1]));
        return payload;
      } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
      }
    },

    extractRoles: (tokenPayload) => {
      // Extract roles from resource_access section
      const resourceAccess = tokenPayload.resource_access || {};
      const allRoles = [];

      Object.entries(resourceAccess).forEach(([client, access]) => {
        if (access.roles) {
          allRoles.push(...access.roles.map(role => ({ client, role })));
        }
      });

      return allRoles;
    },

    getExpirationTime: (tokenPayload) => {
      return tokenPayload.exp ? tokenPayload.exp * 1000 : null;
    },

    isTokenExpired: (tokenPayload) => {
      const expTime = tokenUtils.getExpirationTime(tokenPayload);
      return expTime ? Date.now() > expTime : false;
    }
  };

  // Extract token from hash parameters
  useEffect(() => {
    const extractTokenFromHash = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get('access_token');

      if (token) {
        const payload = tokenUtils.parseJWT(token);
        if (payload) {
          setTokenInfo({
            token,
            payload,
            issuedAt: payload.iat * 1000,
            expiresAt: payload.exp * 1000,
            user: {
              username: payload.preferred_username || payload.sub,
              email: payload.email,
              name: payload.name
            }
          });

          const roles = tokenUtils.extractRoles(payload);
          setUserRoles(roles);

          // Notify React Native about token
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'token_parsed',
              user: payload.preferred_username || payload.sub,
              roles: roles,
              expiresAt: payload.exp * 1000
            }));
          }
        }
      }
    };

    extractTokenFromHash();

    // Listen for hash changes (if token gets updated)
    window.addEventListener('hashchange', extractTokenFromHash);
    return () => window.removeEventListener('hashchange', extractTokenFromHash);
  }, []);

  // Countdown timer for token expiration
  useEffect(() => {
    if (!tokenInfo?.expiresAt) return;

    const updateCountdown = () => {
      const now = Date.now();
      const remaining = tokenInfo.expiresAt - now;

      if (remaining <= 0) {
        setTimeUntilExpiry('EXPIRED');
        // Request token refresh
        requestTokenRefresh();
      } else {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setTimeUntilExpiry(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [tokenInfo]);

  // Request token refresh from React Native
  const requestTokenRefresh = () => {
    if (refreshing) return;

    setRefreshing(true);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'token_refresh_requested',
        reason: 'expiring_soon'
      }));
    }
  };

  // Function for React Native to update token
  useEffect(() => {
    window.updateToken = (newToken) => {
      const payload = tokenUtils.parseJWT(newToken);
      if (payload) {
        // Update URL hash with new token
        window.location.hash = `access_token=${newToken}&updated=${Date.now()}`;
        setRefreshing(false);
      }
    };

    return () => {
      delete window.updateToken;
    };
  }, []);

  // Role-based component rendering
  const hasRole = (requiredRole, requiredClient = null) => {
    return userRoles.some(({ role, client }) => {
      const roleMatch = role === requiredRole;
      const clientMatch = !requiredClient || client === requiredClient;
      return roleMatch && clientMatch;
    });
  };

  const RoleProtectedComponent = ({ requiredRole, requiredClient, children, fallback }) => {
    const hasAccess = hasRole(requiredRole, requiredClient);
    return hasAccess ? children : (fallback || <div>Access denied</div>);
  };

  if (!tokenInfo) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Token Authentication</h1>
        <p>No token found in URL hash. Please authenticate first.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Dashboard - Token Authentication</h1>

      {/* User info section */}
      <div style={{
        background: '#e8f5e8',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Welcome, {tokenInfo.user.name || tokenInfo.user.username}!</h3>
        <p>Email: {tokenInfo.user.email}</p>
        <p>Token expires in: <strong>{timeUntilExpiry}</strong></p>
        {refreshing && <p style={{ color: '#ff6600' }}>Refreshing token...</p>}
        <button
          onClick={requestTokenRefresh}
          disabled={refreshing}
          style={{
            padding: '8px 16px',
            background: '#007AFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Token'}
        </button>
      </div>

      {/* Roles section */}
      <div style={{
        background: '#f0f0f0',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Your Roles ({userRoles.length})</h3>
        {userRoles.length === 0 ? (
          <p>No roles assigned</p>
        ) : (
          <div>
            {userRoles.map(({ client, role }, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  background: '#007AFF',
                  color: 'white',
                  padding: '4px 8px',
                  margin: '2px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              >
                {client}: {role}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Role-based content */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Role-Based Features</h3>

        <RoleProtectedComponent
          requiredRole="device:read"
          fallback={<p style={{ color: '#666' }}>You need 'device:read' role to view devices</p>}
        >
          <div style={{ background: '#e8f4fd', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
            <h4>📱 Device Information</h4>
            <p>Device count: 12</p>
            <p>Online devices: 8</p>
          </div>
        </RoleProtectedComponent>

        <RoleProtectedComponent
          requiredRole="device:control"
          fallback={<p style={{ color: '#666' }}>You need 'device:control' role to control devices</p>}
        >
          <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
            <h4>🎛️ Device Controls</h4>
            <button style={{ padding: '8px 16px', margin: '5px' }}>Turn On All</button>
            <button style={{ padding: '8px 16px', margin: '5px' }}>Reset Devices</button>
          </div>
        </RoleProtectedComponent>

        <RoleProtectedComponent
          requiredRole="admin"
          fallback={<p style={{ color: '#666' }}>You need 'admin' role for administrative functions</p>}
        >
          <div style={{ background: '#f8d7da', padding: '15px', borderRadius: '8px' }}>
            <h4>⚠️ Admin Panel</h4>
            <p>User management, system settings, and advanced configurations</p>
            <button style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
              Admin Actions
            </button>
          </div>
        </RoleProtectedComponent>
      </div>

      {/* Token details (for debugging) */}
      <details style={{ marginTop: '20px' }}>
        <summary>Token Details (Debug)</summary>
        <pre style={{
          background: '#f8f8f8',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto'
        }}>
          {JSON.stringify(tokenInfo.payload, null, 2)}
        </pre>
      </details>
    </div>
  );
}
```

**Step 2: React Native Token Management**

````typescript
const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [userInfo, setUserInfo] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);

  // Simulate token exchange with backend
  const exchangeToken = async () => {
    try {
      // In real implementation, call your exchange endpoint
      const response = await fetch('/api/auth/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalToken: await getStoredToken(),
          audience: 'device-dashboard',
          scope: 'device:read device:control'
        })
      });

      const { exchangedToken } = await response.json();
      return exchangedToken;
    } catch (error) {
      console.error('Token exchange failed:', error);
      // For demo, return a mock token
      return generateMockToken();
    }
  };

  // Generate mock JWT for demo
  const generateMockToken = () => {
    const payload = {
      sub: 'user123',
      preferred_username: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 300, // 5 minutes
      resource_access: {
        'device-dashboard': {
          roles: ['device:read', 'device:control']
        },
        'admin-panel': {
          roles: ['admin']
        }
      }
    };

    // Mock JWT (in production, this comes from your backend)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payloadEncoded = btoa(JSON.stringify(payload));
    return `${header}.${payloadEncoded}.mock-signature`;
  };

  // Load WebView with token
  const loadWebViewWithToken = async () => {
    const token = await exchangeToken();
    const url = `http://device-dashboard.localhost:3010/embedded#access_token=${token}`;

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.location.href = '${url}';
      `);
    }
  };

  // Handle token refresh requests
  const handleWebViewMessage = async (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      switch (message.type) {
        case 'token_parsed':
          setUserInfo({
            username: message.user,
            roles: message.roles,
            expiresAt: message.expiresAt
          });
          setTokenExpiry(message.expiresAt);
          break;

        case 'token_refresh_requested':
          await refreshToken();
          break;
      }
    } catch (error) {
      console.error('Failed to handle WebView message:', error);
    }
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      const newToken = await exchangeToken();

      // Update token in WebView
      webViewRef.current?.injectJavaScript(`
        if (window.updateToken) {
          window.updateToken('${newToken}');
        }
      `);

      Alert.alert('Success', 'Token refreshed successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh token');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tokenControls}>
        <Text style={styles.sectionTitle}>Token Management</Text>
        {userInfo && (
          <View>
            <Text>User: {userInfo.username}</Text>
            <Text>Roles: {userInfo.roles.map(r => `${r.client}:${r.role}`).join(', ')}</Text>
            <Text>Expires: {new Date(userInfo.expiresAt).toLocaleTimeString()}</Text>
          </View>
        )}
        <Button title="Load with Fresh Token" onPress={loadWebViewWithToken} />
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};
```"

### Exercise 4 Wrap-up (3 minutes)

"Fantastic! You've implemented a production-grade token exchange system. Key achievements:

✅ **JWT parsing and role extraction** - Understanding token structure
✅ **Role-based UI rendering** - Different features for different permissions
✅ **Automatic token refresh** - Seamless user experience
✅ **Secure token passing** - Via hash parameters, not query strings
✅ **Expiration handling** - Visual countdown and automatic renewal

**Production insights**:
- Always validate tokens on both client and server side
- Implement proper error handling for token refresh failures
- Consider token revocation scenarios
- Monitor token exchange performance and success rates

Ready for the final exercise? We'll tackle navigation and state management!"

---

## Exercise 5 – Navigation and State Management (15 minutes)

### Introduction and Goals (2 minutes)

"**Exercise 5 Goal**: Implement advanced navigation controls and shared state management across multiple WebView pages.

This final exercise brings everything together, creating a sophisticated multi-page application with native navigation controls and synchronized state. You'll learn:
- Programmatic navigation control from React Native
- Multi-page state persistence
- Deep linking and URL management
- Navigation history and back/forward functionality

**What you'll build**: A complete navigation system with native controls and a multi-page Next.js app that maintains state across navigation."

### Exercise 5 Implementation Guidance (10 minutes)

"Let's build advanced navigation and state management!

**Step 1: Multi-Page Next.js Application Structure**

Create multiple pages with shared state:

```typescript
// app/embedded/page.tsx - Main dashboard
'use client';

export default function EmbeddedDashboard() {
  const [sharedState, setSharedState] = useState({
    currentPage: 'dashboard',
    navigationHistory: [],
    appData: {}
  });

  useEffect(() => {
    // Initialize navigation state
    window.navigationState = sharedState;
    window.updateNavigationState = setSharedState;

    // Notify React Native about current page
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'navigation_update',
        currentPage: 'dashboard',
        canGoBack: false,
        canGoForward: false
      }));
    }
  }, []);

  const navigateToPage = (page) => {
    setSharedState(prev => ({
      ...prev,
      currentPage: page,
      navigationHistory: [...prev.navigationHistory, 'dashboard']
    }));

    // Navigate programmatically
    window.location.href = `/embedded/${page}`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Main Dashboard</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigateToPage('devices')}>Devices</button>
        <button onClick={() => navigateToPage('settings')}>Settings</button>
        <button onClick={() => navigateToPage('profile')}>Profile</button>
      </div>

      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
        <h3>Dashboard Content</h3>
        <p>Welcome to the main dashboard. Use the buttons above to navigate.</p>
      </div>
    </div>
  );
}
````

**Step 2: React Native Navigation Controls**

```typescript
const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [navigationState, setNavigationState] = useState({
    canGoBack: false,
    canGoForward: false,
    currentPage: 'dashboard',
    url: ''
  });

  // Navigation handlers
  const handleGoBack = () => {
    webViewRef.current?.goBack();
  };

  const handleGoForward = () => {
    webViewRef.current?.goForward();
  };

  const handleRefresh = () => {
    webViewRef.current?.reload();
  };

  const handleGoHome = () => {
    const homeUrl = 'http://device-dashboard.localhost:3010/embedded';
    webViewRef.current?.injectJavaScript(`
      window.location.href = '${homeUrl}';
    `);
  };

  // Handle navigation state changes
  const handleNavigationStateChange = (navState) => {
    setNavigationState(prev => ({
      ...prev,
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      url: navState.url
    }));
  };

  // Handle messages from WebView
  const handleWebViewMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      if (message.type === 'navigation_update') {
        setNavigationState(prev => ({
          ...prev,
          currentPage: message.currentPage,
          canGoBack: message.canGoBack,
          canGoForward: message.canGoForward
        }));
      }
    } catch (error) {
      console.error('Failed to parse navigation message:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Navigation controls */}
      <View style={styles.navigationControls}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Button
            title="⬅️ Back"
            onPress={handleGoBack}
            disabled={!navigationState.canGoBack}
          />
          <Button
            title="➡️ Forward"
            onPress={handleGoForward}
            disabled={!navigationState.canGoForward}
          />
          <Button title="🔄 Refresh" onPress={handleRefresh} />
          <Button title="🏠 Home" onPress={handleGoHome} />
        </ScrollView>

        <Text style={styles.currentPage}>
          Page: {navigationState.currentPage}
        </Text>
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
        onMessage={handleWebViewMessage}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsBackForwardNavigationGestures={true}
      />
    </View>
  );
};
```

**Step 3: Shared State Management**

Create a global state management system:

```typescript
// In WebView pages
const StateManager = {
  state: {},
  listeners: [],

  setState(key, value) {
    this.state[key] = value;
    this.notifyListeners();

    // Persist to localStorage
    localStorage.setItem("app_state", JSON.stringify(this.state));
  },

  getState(key) {
    return this.state[key];
  },

  loadState() {
    try {
      const saved = localStorage.getItem("app_state");
      if (saved) {
        this.state = JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load state:", error);
    }
  },

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.state));
  },

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  },
};

// Use in components
const useSharedState = (key, defaultValue) => {
  const [value, setValue] = useState(
    StateManager.getState(key) || defaultValue
  );

  useEffect(() => {
    const unsubscribe = StateManager.subscribe(state => {
      setValue(state[key] || defaultValue);
    });

    return unsubscribe;
  }, [key, defaultValue]);

  const updateValue = newValue => {
    StateManager.setState(key, newValue);
  };

  return [value, updateValue];
};
```

### Exercise 5 Wrap-up (3 minutes)

"Excellent! You've completed all 5 exercises and built a sophisticated WebView integration system. Let's review what you've accomplished:

✅ **Exercise 1**: Basic WebView setup with error handling
✅ **Exercise 2**: Bidirectional communication bridges
✅ **Exercise 3**: Cookie management and synchronization
✅ **Exercise 4**: Secure token exchange with role-based UI
✅ **Exercise 5**: Advanced navigation and state management

**Complete system capabilities**:

- Secure authentication with automatic token refresh
- Real-time communication between native and web
- Persistent state management across navigation
- Role-based access control
- Professional error handling and user experience

**You're now ready to build production WebView integrations!** These patterns form the foundation for complex hybrid applications that combine the best of native and web technologies."

### Session Closing (5 minutes)

"Congratulations on completing the hands-on coding session! You've built a complete WebView integration system that demonstrates all the key patterns needed for production applications.

**What you've learned**:

- **Foundation skills**: WebView configuration, loading states, error handling
- **Communication patterns**: Bidirectional messaging with structured data
- **Security practices**: Token exchange, role-based access, secure storage
- **Advanced techniques**: State management, navigation control, persistence

**Next steps for your projects**:

1. Adapt these patterns to your specific use cases
2. Implement proper error monitoring and analytics
3. Add comprehensive testing for communication flows
4. Consider performance optimization for production scale

Any questions about the exercises or implementation details before we move to the advanced topics section?"

---

**Timing Notes:**

- Opening: 5 minutes
- Exercise 1: 15 minutes
- Exercise 2: 20 minutes
- Exercise 3: 20 minutes
- Exercise 4: 20 minutes
- Exercise 5: 15 minutes
- Session closing: 5 minutes
- **Total: 100 minutes (allowing 10 minutes buffer)**

**Key Delivery Tips:**

- Circulate during exercises to help participants
- Be prepared to debug common issues
- Show final implementations if time runs short
- Encourage questions and collaboration
- Take notes on common problems for the advanced topics section
