# React Native WebView Integration Workshop - Presentation Script

## Section 1: Our Approach to Loyalty App Integration (10 min) 9:20–9:30

---

### Opening and Context Setting (1 minute)

"Now that we've established the fundamentals of WebView technology, let me show you a real-world implementation that we've built here at Vaillant. This isn't just theoretical – this is a production system that serves thousands of users daily.

We're going to walk through our loyalty app integration with the myVaillant Pro service app, and I'll show you exactly how we solved the complex challenges of secure authentication, seamless user experience, and cross-platform data synchronization."

---

### Real-World Case Study: Loyalty App Integration (3 minutes)

"**The Business Challenge:**

We had two separate applications serving different but overlapping user bases:

- **myVaillant Pro**: Our main service app for heating system management, user accounts, device control
- **Loyalty Portal**: A specialized web application for reward programs, point tracking, and exclusive offers

The challenge was: How do we provide seamless access to loyalty features from within the main mobile app, without forcing users to manage separate login credentials or navigate away from their primary workflow?

**Traditional Approaches and Why They Failed:**

**Option 1: Rebuild loyalty features natively**

- ❌ **Time**: 6+ months of development
- ❌ **Maintenance**: Duplicate business logic across platforms
- ❌ **Feature parity**: Web team moves faster than mobile development

**Option 2: Deep linking to external browser**

- ❌ **User experience**: Jarring context switch
- ❌ **Authentication**: Users forced to log in again
- ❌ **Retention**: Many users never return to the main app

**Option 3: Simple WebView embed**

- ❌ **Security**: Passing full tokens exposes excessive permissions
- ❌ **Authentication**: Token mismatch between systems
- ❌ **Integration**: No communication between native and web contexts

**Our Solution: Intelligent WebView Integration**

We implemented a sophisticated WebView integration that:
✅ **Maintains single sign-on** across both applications
✅ **Provides native-feeling experience** with web content
✅ **Implements security-first token exchange** with limited scopes
✅ **Enables real-time communication** between native and web contexts
✅ **Preserves existing web development velocity** while adding mobile access

**The Result**: Users can access their loyalty dashboard, view points, redeem rewards, and participate in campaigns directly from the main mobile app, with zero additional authentication friction and a completely seamless experience."

### Authentication Flow Deep Dive (4 minutes)

"Let me walk you through the authentication flow that makes this integration possible. This is the heart of our solution.

**Step 1: User Authentication in Mobile App**

The user starts in our React Native myVaillant Pro app, where they're already authenticated with Keycloak:

```
User → React Native App → Keycloak Authentication
                     ↓
              Full Access Token
          (All permissions, long-lived)
```

**Step 2: Token Exchange Request**

When the user wants to access loyalty features, instead of passing the full token, we exchange it:

```
React Native App → Exchange Endpoint → Keycloak Token Exchange
     │                    │                      │
     │                    └─ Validate original   │
     │                       token and user      │
     │                                          │
     └─ Request scoped token ←─────────────────┘
        (Limited permissions, shorter-lived)
```

**Step 3: Secure WebView Navigation**

The exchanged token is passed to the WebView via hash parameters:

```
React Native WebView → Load URL with hash params
                    ↓
    loyalty-portal.com#access_token=limited_scope_token&expires_in=3600
                    ↓
              Web App Extracts Token
                    ↓
           Uses Token for API Calls
```

**Why This Flow is Secure:**

**Hash Parameters vs Query Parameters:**

- **Query params**: `?access_token=abc` → Sent to server, logged, cached
- **Hash params**: `#access_token=abc` → Client-side only, never logged

**Token Scoping Benefits:**

- **Original token**: Full device control, user management, billing access
- **Exchanged token**: Loyalty points read/write, profile read-only
- **Time limitation**: 1 hour expiry vs 24 hour original token
- **Audience restriction**: Only valid for loyalty portal APIs

**Real-World Security Example:**

If someone intercepts the exchanged token:

- ❌ Cannot access device controls
- ❌ Cannot modify billing information
- ❌ Cannot access other user accounts
- ✅ Can only view/modify loyalty points for that specific user
- ✅ Token expires automatically within 1 hour

This dramatically reduces the blast radius of any potential security breach."

### Challenges and Solutions (2 minutes)

"Let me share the three biggest challenges we faced and how we solved them:

**Challenge 1: Hash Parameter Security vs Usability**

**Problem**: Hash parameters are secure but can be lost during navigation
**Solution**:

- Implement automatic token refresh via WebView communication
- Store tokens in memory only, never in localStorage
- Use postMessage for secure token updates without page reloads

```javascript
// WebView detects token expiration
if (tokenExpiringSoon) {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: "refresh_token_needed",
    })
  );
}

// React Native refreshes and injects new token
webViewRef.current.injectJavaScript(`
  window.updateToken('${newScopedToken}');
`);
```

**Challenge 2: Two-Way Communication for Native Integration**

**Problem**: Web content feels isolated from native app experience
**Solution**:

- Implement bidirectional messaging for navigation, notifications, and data sync
- Native controls can trigger actions in web content
- Web content can request native device features

```javascript
// Web requests native camera for loyalty receipt scanning
window.ReactNativeWebView.postMessage(
  JSON.stringify({
    type: "scan_receipt",
    context: "loyalty_points",
  })
);

// Native handles scan and returns data to web
webViewRef.current.injectJavaScript(`
  window.receiveScannedReceipt(${JSON.stringify(receiptData)});
`);
```

**Challenge 3: WebView Performance with Token Exchange**

**Problem**: Token exchange adds latency to WebView loading
**Solution**:

- Implement parallel token exchange and WebView initialization
- Use optimistic loading with placeholder content
- Cache exchanged tokens for repeated access (with proper expiration)

```javascript
// Start both operations in parallel
const [tokenPromise, webViewPromise] = await Promise.allSettled([
  exchangeTokenForLoyalty(),
  initializeWebView(),
]);

// Inject token once both are ready
if (tokenPromise.status === "fulfilled") {
  updateWebViewWithToken(tokenPromise.value);
}
```
