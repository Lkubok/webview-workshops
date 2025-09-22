# Exercise 1: Basic WebView Setup

## Goal
Learn the fundamentals of setting up a React Native WebView component to display a Next.js application.

## Scenario
- Start with an empty screen showing placeholder content
- Implement a complete WebView integration that displays a Next.js page
- Learn the basic components and hooks needed for WebView functionality
- Understand the minimal requirements for WebView display

## Files Structure
```
exercise-1/
├── mobile-app/
│   ├── webview-initial.tsx    # Empty screen with placeholder and TODOs
│   └── webview-final.tsx      # Complete basic WebView implementation
├── nextjs-page/
│   ├── page-initial.tsx       # Basic page with some TODOs
│   └── page-final.tsx         # Complete page with all features
└── README.md                  # This file
```

## Tasks to Complete

### Mobile App (React Native) - `webview-initial.tsx`
1. **Import required components**:
   - `WebView` from 'react-native-webview'
   - `useWebView` hook from '../../hooks/useWebView'
   - `NavigationBar`, `ErrorDisplay`, `LoadingOverlay` from '../../components/WebView'
   - `WEBVIEW_URL`, `injectedJavaScript`, `webViewProps` from '../../utils/webViewConfig'

2. **Set up the useWebView hook**: Initialize all the necessary handlers and state

3. **Add error handling**: Display error screen when WebView fails to load

4. **Add WebView component**: Replace placeholder with actual WebView component

5. **Add navigation and loading components**: Include NavigationBar and LoadingOverlay

### Next.js Page - `page-initial.tsx`
1. **Add useHasRole hook**: Import and implement role-based access control
2. **Add loading state**: Implement proper loading screen with spinner
3. **Add user info section**: Display authenticated user information
4. **Add dashboard role section**: Show role-based content conditionally

## Key Concepts

### React Native WebView Basics
- **WebView Component**: Main component for displaying web content
- **useWebView Hook**: Custom hook that provides WebView functionality
- **Navigation Handlers**: Methods for back/forward navigation and refresh
- **Error Handling**: Proper error display and retry mechanisms
- **Loading States**: Visual feedback during page loading

### Next.js Integration
- **Session Management**: Using next-auth for authentication
- **Role-Based Access**: Checking user permissions
- **Responsive Design**: Mobile-optimized layouts
- **Component Structure**: Using shadcn/ui components

## Expected Behavior

### Initial State (webview-initial.tsx)
- Empty screen with placeholder text
- Instructions on what needs to be implemented

### Final State (webview-final.tsx)
- Fully functional WebView displaying Next.js page
- Navigation controls (back, forward, refresh)
- Loading indicator during page loads
- Error handling with retry functionality
- Proper authentication flow

## Implementation Steps

1. **Start with mobile app**: Begin with `webview-initial.tsx`
2. **Follow TODO comments**: Each comment guides you through the implementation
3. **Test incrementally**: Test each step to ensure it works
4. **Add Next.js features**: Complete the page functionality
5. **Test integration**: Verify the complete WebView experience

## Testing Checklist

- [ ] WebView displays without errors
- [ ] Navigation controls work (back, forward, refresh)
- [ ] Loading indicator appears during page loads
- [ ] Error handling works when network fails
- [ ] Page is responsive on mobile screen sizes
- [ ] Authentication state is preserved
- [ ] User information displays correctly

## Common Issues

- **WebView not displaying**: Check WEBVIEW_URL configuration
- **Navigation not working**: Verify useWebView hook is properly initialized
- **Loading stuck**: Check network connectivity and URL accessibility
- **Authentication issues**: Verify session management is working

## Next Steps

After completing Exercise 1, you'll be ready for:
- Exercise 2: Cookie handling and communication
- Exercise 3: Two-way communication bridge
- Exercise 4: Token exchange via hash parameters