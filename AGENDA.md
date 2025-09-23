# React Native WebView Integration Workshop Agenda

**Duration:** 4 hours

---

## 0. Introduction & Topic Overview (20 min) 9:00–9:20

- Welcome and introduction of the workshop topic
- Quick discussion: "Who has worked with React Native WebView before?"
- **WebView Fundamentals:**
  - What is a WebView and how does it work?
  - Native WebView vs React Native WebView component
  - When to use WebView vs native components vs web browser
- **Common Use Cases:**
  - Embedding web content in mobile apps
  - Hybrid authentication flows
  - Legacy web app integration
  - Dynamic content that changes frequently
  - Third-party widgets and services

---

## 1. Our Approach to Loyalty App Integration (10 min) 9:20–9:30

- Present the integration of our loyalty app with myVaillant Pro service app
- Show exchange token solution on the IDM (Keycloak) side
- Explain authentication flow: mobile app → WebView → Keycloak
- Discuss challenges and how we solved them
- **Hash Params for Token Passing:**
  - Why passing tokens through hash params (e.g., `#access_token=...`) is more secure than query params
  - Hash params are not sent to the server, reducing risk of token leakage via logs or referrer headers

---

## 2. Tools & Architecture Overview (10 min) 9:30–9:40

- Monorepo setup with pnpm and Turborepo
- Custom Keycloak instance on private server
- Keycloak clients, roles, realms
- How we isolate users per client
- Public vs. confidential clients for mobile apps
- Why PKCE is important for secure mobile authentication

---

## 3. Token Management & PKCE (10 min) 9:40–9:50

- Overview of PKCE authentication flow in mobile apps
- How to exchange code for token in a mobile context
- How to refresh tokens inside WebView
- Demo of token lifecycle handling and best practices

---

## 4. WebView Deep Dive & Communication Bridges (20 min) 9:50–10:10

### WebView Configuration & Best Practices (10 min)
- **Essential WebView Props:**
  - `javaScriptEnabled`, `domStorageEnabled`, `thirdPartyCookiesEnabled`
  - `userAgent` customization for API compatibility
  - `startInLoadingState` and loading indicators
  - `allowsBackForwardNavigationGestures` for better UX
- **Security Considerations:**
  - `originWhitelist` and URL validation
  - `mixedContentMode` for HTTPS/HTTP content
  - `allowsInlineMediaPlayback` and media handling
  - Preventing malicious JavaScript injection
- **Performance Optimization:**
  - `cacheEnabled` and caching strategies
  - `injectedJavaScript` vs `injectJavaScript()` timing
  - Memory management and WebView lifecycle

### Communication Bridges (10 min)
- **React Native → WebView:**
  - Using `injectJavaScript()` for dynamic code execution
  - Passing data through URL parameters and hash
  - `postMessage` from native to web context
- **WebView → React Native:**
  - `window.ReactNativeWebView.postMessage()` method
  - `onMessage` handler and event structure
  - Message queuing and error handling
- **Best Practices:**
  - JSON message format for structured communication
  - Error handling and fallback mechanisms
  - Avoiding memory leaks in message listeners
  - Debugging communication issues

---

## 5. Hands-on Coding Session (80 min) 10:10–11:30

### Exercise Structure

The workshop includes 5 progressive exercises located in the `exercises/` folder. Each exercise contains:
- `mobile-app/`: React Native WebView components (initial + final versions)
- `nextjs-page/`: Next.js page components (initial + final versions)

Participants can either:
- Start from `*-initial.tsx` files (with TODOs) and build solutions step-by-step
- Reference `*-final.tsx` files for complete implementations
- Switch to exercise-specific git branches (`exercise-1`, `exercise-2`, etc.) for working examples

### Exercise 1 – Basic WebView Setup (15 min)

- **Goal**: Learn fundamentals of React Native WebView integration
- Load a Next.js app (`device-dashboard.localhost:3010/embedded`) in WebView
- Understand minimal requirements for WebView display
- Replace `apps/client-app/app/(tabs)/webview.tsx` with exercise files
- Replace `apps/device-dashboard/app/embedded/page.tsx` with exercise files

### Exercise 2 – Two-Way Communication Bridge (20 min)

- **Goal**: Create bidirectional communication between React Native and Next.js
- Implement native button that increments counter in WebView
- Send confirmation messages back from WebView to React Native
- Use JSON message format for structured communication
- Handle `onMessage` events and `injectJavaScript` calls

### Exercise 3 – Cookie Handling and Communication (20 min)

- **Goal**: Implement cookie management and synchronization
- Add cookie detection and display in Next.js page
- Create cookie management interface in React Native
- Enable manual cookie synchronization between platforms
- Display cookie information in both React Native alerts and WebView

### Exercise 4 – Token Exchange and Update in WebView (20 min)

- **Goal**: Implement authentication token management
- Parse token `resource_access` section for role-based UI
- Add refresh token functionality with automatic renewal
- Display token expiration countdown
- Handle role-based access control for dashboard features

### Exercise 5 – Navigation and State Management (15 min)

- **Goal**: Handle navigation and shared state across multiple pages
- Implement navigation controls (back, forward, refresh, home)
- Create multi-page Next.js application with shared state
- Synchronize navigation state between React Native and WebView
- Handle deep linking and programmatic navigation

---

## 6. Advanced WebView Topics & Troubleshooting (20 min) 11:30–11:50

### Common Issues & Solutions
- **Loading Problems:**
  - Network connectivity and timeout handling
  - Mixed content (HTTPS/HTTP) issues
  - Domain whitelist configuration
- **Performance Issues:**
  - Memory leaks and proper cleanup
  - Large DOM handling and virtualization
  - Image optimization and lazy loading
- **Platform-Specific Challenges:**
  - iOS vs Android WebView differences
  - Keyboard handling and viewport adjustments
  - File upload and download limitations
- **Debugging Techniques:**
  - Remote debugging with Chrome DevTools
  - Console logging and error tracking
  - Network request monitoring

### Advanced Integration Patterns
- **WebView Lifecycle Management:**
  - Proper mounting/unmounting
  - Background/foreground state handling
  - Memory cleanup best practices
- **Multi-WebView Architecture:**
  - When to use multiple WebViews
  - Shared state across WebView instances
  - Navigation between WebView screens
- **Progressive Web App (PWA) Integration:**
  - Service worker compatibility
  - Offline functionality in WebView
  - App-like behavior patterns

---

## 7. Wrap-Up & Discussion (40 min) 11:50–12:30

- Discuss remaining challenges or questions
- Collect feedback about the workshop
- Suggest next steps for implementing WebView integrations in Vaillant :D

---

**Notes:**

- Include short breaks as needed (e.g., 5–10 min after the introduction or halfway through coding)
- Keep demos concise but interactive to engage participants
- Prepare a small “starter repo” for hands-on coding to save time
