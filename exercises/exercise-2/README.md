# Exercise 2: Token Exchange via Hash Parameters

## Goal
Implement token exchange between React Native and Next.js using URL hash parameters, with the ability to refresh tokens on demand.

## Scenario
- React Native should send a token to the Next.js page via hash parameters in the URL
- Next.js page should extract and display the token from the hash parameters
- Next.js should have a "Refresh Token" button that requests a new token from React Native
- React Native should generate a new token and send it to the webview when requested

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
1. **Add token state**: Manage current token with `useState`
2. **Implement `handleMessage`**: Add case for "refresh_token_request"
3. **Implement `refreshToken`**: Generate new token and navigate webview with new hash
4. **Implement `sendInitialToken`**: Navigate webview to URL with token in hash parameters
5. **URL Format**: `${WEBVIEW_URL}#token=${encodeURIComponent(token)}`

### Next.js Page - `page-initial.tsx`
1. **Add token state**: Store received token with `useState`
2. **Extract token from hash**: Parse `window.location.hash` to get token parameter
3. **Listen for hash changes**: Handle URL updates when new tokens are sent
4. **Implement token refresh**: Send "refresh_token_request" message to React Native
5. **Clean up hash**: Remove hash from URL after extracting token

## Key Concepts
- **Hash Parameters**: Use URL hash (#) to pass data: `#token=abc123`
- **URL Navigation**: Use `webViewRef.current.injectJavaScript()` to navigate
- **Hash Parsing**: Use `URLSearchParams` to parse hash parameters
- **Token Generation**: Simulate API calls with timestamp + random string
- **Message Communication**: Bidirectional messages for token refresh requests

## Expected Behavior
1. User taps "Send Initial Token" in React Native
2. WebView navigates to URL with token in hash: `http://example.com#token=abc123`
3. Next.js extracts token from hash and displays it
4. User taps "Refresh Token" in Next.js
5. Next.js sends refresh request to React Native
6. React Native generates new token and updates WebView URL
7. Next.js receives and displays the new token

## URL Examples
```
Initial: https://yourapp.com/embedded
With token: https://yourapp.com/embedded#token=initial-token-12345
After refresh: https://yourapp.com/embedded#token=token-1634567890123-xyz789
```

## Testing
1. Start with `webview-initial.tsx` and `page-initial.tsx`
2. Implement token sending from React Native first
3. Implement token extraction in Next.js
4. Add token refresh functionality
5. Test the complete flow
6. Compare with final versions if needed

## Security Notes
- In production, use secure token generation
- Consider token expiration and validation
- Hash parameters are visible in browser history - use with caution for sensitive data