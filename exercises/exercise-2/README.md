# Exercise 2: Cookie Handling and Communication

## Goal
Implement cookie handling and communication between React Native WebView and Next.js application.

## Scenario
- Start with a basic WebView (similar to Exercise 1 final state)
- Add cookie management functionality
- Enable cookie synchronization between React Native and WebView
- Display cookie information in both React Native alerts and Next.js page

## Files Structure
```
exercise-2/
├── mobile-app/
│   ├── webview-initial.tsx    # Basic WebView without cookie handling
│   └── webview-final.tsx      # Complete implementation with cookies
├── nextjs-page/
│   ├── page-initial.tsx       # Basic page without cookie display
│   └── page-final.tsx         # Complete page with cookie functionality
└── README.md                  # This file
```

## Tasks to Complete

### Mobile App (React Native) - `webview-initial.tsx`

1. **Import cookie utilities**:
   ```typescript
   import { cookieUtils } from "../../utils/cookieManager";
   import { Alert } from "react-native";
   ```

2. **Add handleCookieMenu function**:
   ```typescript
   const handleCookieMenu = useCallback(() => {
     cookieUtils.showCookieMenu(injectJavaScript, handleRefresh);
   }, [injectJavaScript, handleRefresh]);
   ```

3. **Add handleMessage function**:
   ```typescript
   const handleMessage = useCallback((event: any) => {
     try {
       const data = JSON.parse(event.nativeEvent.data);
       console.log("Message from webview:", data);

       switch (data.type) {
         case "cookies":
           console.log("Cookies from webview:", data.cookies);
           break;
         case "sync_cookies":
           console.log("Syncing cookies:", data.cookies);
           Alert.alert("WebView Cookies", data.cookies || "No cookies found");
           break;
         default:
           console.log("Unknown message type:", data.type);
       }
     } catch (error) {
       console.log("Received non-JSON message:", event.nativeEvent.data);
     }
   }, []);
   ```

4. **Add cookie menu to NavigationBar**:
   ```typescript
   <NavigationBar
     // ... other props
     onCookieMenu={handleCookieMenu}
   />
   ```

5. **Add message handler to WebView**:
   ```typescript
   <WebView
     // ... other props
     onMessage={handleMessage}
   />
   ```

### Next.js Page - `page-initial.tsx`

1. **Add cookie state**:
   ```typescript
   const [cookies, setCookies] = useState<string>("");
   ```

2. **Add cookie detection on load**:
   ```typescript
   useEffect(() => {
     // Send current cookies to React Native on page load
     const currentCookies = document.cookie;
     if (currentCookies && window.ReactNativeWebView) {
       const message = JSON.stringify({
         type: "cookies",
         cookies: currentCookies
       });
       window.ReactNativeWebView.postMessage(message);
     }
     setCookies(currentCookies);
   }, []);
   ```

3. **Add cookie sync function**:
   ```typescript
   const syncCookies = () => {
     const currentCookies = document.cookie;
     setCookies(currentCookies);

     if (window.ReactNativeWebView) {
       const message = JSON.stringify({
         type: "sync_cookies",
         cookies: currentCookies || "No cookies found"
       });
       window.ReactNativeWebView.postMessage(message);
     } else {
       alert(`Current cookies: ${currentCookies || "No cookies found"}`);
     }
   };
   ```

4. **Add cookie display section**: Replace the TODO section with cookie information display

5. **Add sync button**: Button to manually trigger cookie synchronization

## Key Concepts

### Cookie Management
- **Document.cookie**: Browser API for accessing cookies
- **Cookie Utilities**: Custom utilities for cookie operations
- **Cookie Menu**: Native UI for cookie management
- **Cookie Synchronization**: Bidirectional cookie sharing

### Message Communication
- **React Native → Next.js**: Via injected JavaScript and message events
- **Next.js → React Native**: Via `window.ReactNativeWebView.postMessage()`
- **Message Types**: Structured communication with type field
- **JSON Serialization**: All messages must be JSON strings

### Cookie Flow
1. **Page Load**: Next.js detects cookies and sends to React Native
2. **Cookie Menu**: React Native provides cookie management interface
3. **Manual Sync**: User can trigger cookie synchronization
4. **Display**: Cookies are displayed in both React Native alerts and Next.js page

## Expected Behavior

### Initial State
- Basic WebView functionality without cookie features
- Placeholder section indicating cookie features are coming

### Final State
- Cookie menu button in navigation bar
- Automatic cookie detection on page load
- Manual cookie sync button in Next.js page
- Cookie display in both React Native alerts and Next.js interface
- Real-time cookie updates

## Implementation Steps

1. **Start with React Native**: Add cookie imports and handlers
2. **Add message handling**: Implement bidirectional communication
3. **Update NavigationBar**: Add cookie menu functionality
4. **Implement Next.js side**: Add cookie detection and display
5. **Add sync functionality**: Enable manual cookie synchronization
6. **Test cookie flow**: Verify complete cookie management

## Testing Checklist

- [ ] Cookie menu appears in navigation bar
- [ ] Cookies are detected automatically on page load
- [ ] Manual sync button works in Next.js page
- [ ] Cookie information displays correctly
- [ ] React Native shows cookie alerts
- [ ] Bidirectional communication works
- [ ] Cookie updates are reflected in real-time

## Cookie Message Types

### From Next.js to React Native
```typescript
// Automatic cookie detection
{ type: "cookies", cookies: "sessionId=abc123; theme=dark" }

// Manual sync request
{ type: "sync_cookies", cookies: "sessionId=abc123; theme=dark" }
```

### Response Handling in React Native
- **"cookies"**: Log to console for debugging
- **"sync_cookies"**: Show alert with cookie information

## Common Issues

- **No cookies detected**: Check if the website sets cookies
- **Message not received**: Verify `onMessage` prop is added to WebView
- **Alert not showing**: Check Alert import and message parsing
- **Cookie menu not working**: Verify cookieUtils import and function call

## Security Notes

- Cookies may contain sensitive information
- Always validate and sanitize cookie data
- Consider cookie scope and security flags
- Test with real authentication cookies

## Next Steps

After completing Exercise 2, you'll be ready for:
- Exercise 3: Two-way communication bridge with state management
- Exercise 4: Token exchange via hash parameters
- Advanced: File upload/download through WebView