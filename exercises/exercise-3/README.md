# Exercise 3: Cookie Handling and Communication

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

## Key Concepts

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

## Implementation Steps

1. **Start with React Native**: Add cookie imports and handlers
2. **Add message handling**: Implement bidirectional communication
3. **Update NavigationBar**: Add cookie menu functionality
4. **Implement Next.js side**: Add cookie detection and display
5. **Add sync functionality**: Enable manual cookie synchronization
6. **Test cookie flow**: Verify complete cookie management

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
