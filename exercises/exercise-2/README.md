# Exercise 2: Two-Way Communication Bridge

## Goal

Create a two-way communication bridge between a React Native WebView and a Next.js application.

## Scenario

- There should be a native button above the WebView component in the React Native app
- When this button is pressed, it should increment a counter in the Next.js page
- The counter should be managed as React state in the Next.js application
- The Next.js page should send confirmation back to React Native when the counter is updated

## Files Structure

```
exercise-2/
├── mobile-app/
│   ├── webview-initial.tsx    # Starting point with TODOs
│   └── webview-final.tsx      # Complete implementation
├── nextjs-page/
│   ├── page-initial.tsx       # Starting point with TODOs
│   └── page-final.tsx         # Complete implementation
└── README.md                  # This file
```

## Tasks to Complete

### Mobile App (React Native) - `webview-initial.tsx`

1. **Implement `handleMessage`**: Add case for "counter_updated" message type
2. **Implement `handleIncrementCounter`**: Send message to webview to increment counter
3. **Message Format**: Use JSON with `type: "increment_counter"`

### Next.js Page - `page-initial.tsx`

1. **Add counter state**: Initialize with `useState(0)`
2. **Add message listener**: Listen for "message" events from React Native
3. **Handle increment message**: Parse message and increment counter when type is "increment_counter"
4. **Send confirmation**: Use `window.ReactNativeWebView?.postMessage()` to send counter updates back
5. **Message Format**: Send JSON with `type: "counter_updated"` and counter value

## Key Concepts

- **React Native → Next.js**: Use `injectJavaScript()` to send messages
- **Next.js → React Native**: Use `window.ReactNativeWebView.postMessage()`
- **Message Format**: Always use JSON strings for structured communication
- **Event Listeners**: Next.js listens to 'message' events from the parent window

## Expected Behavior

1. User taps "Increment Counter in WebView" button in React Native
2. Counter in Next.js page increments by 1
3. Next.js sends confirmation message back to React Native
4. React Native shows alert with updated counter value
