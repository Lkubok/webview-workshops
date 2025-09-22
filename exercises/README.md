# WebView Workshop Exercises

This folder contains hands-on exercises for learning React Native WebView communication with Next.js applications.

## Overview

These exercises are designed to teach the fundamentals of bidirectional communication between React Native WebViews and web applications. Each exercise focuses on specific communication patterns and real-world scenarios.

## Exercise Structure

Each exercise contains:
- **Initial files** (`*-initial.tsx`): Starting point with TODO comments and basic structure
- **Final files** (`*-final.tsx`): Complete implementation for reference
- **README.md**: Detailed instructions and explanation of concepts

## Exercises

### Exercise 1: Two-Way Communication Bridge
**Location**: `exercise-1/`
**Goal**: Create a communication bridge where React Native can trigger actions in the Next.js app and receive confirmations back.

**Key Learning Points**:
- Sending messages from React Native to WebView using `injectJavaScript()`
- Receiving messages in Next.js using `window.addEventListener('message')`
- Sending responses back using `window.ReactNativeWebView.postMessage()`
- Managing React state across the communication bridge

### Exercise 2: Token Exchange via Hash Parameters
**Location**: `exercise-2/`
**Goal**: Pass authentication tokens from React Native to Next.js via URL hash parameters, with token refresh functionality.

**Key Learning Points**:
- Using URL hash parameters for data transfer
- Parsing hash parameters in Next.js
- Implementing token refresh workflows
- URL navigation from React Native
- Cleaning up URL history after data extraction

## Getting Started

1. **Choose an exercise** based on your learning goals
2. **Read the README** in the exercise folder for detailed instructions
3. **Start with initial files** (`*-initial.tsx`) which contain TODO comments
4. **Follow the TODO comments** to implement the functionality step by step
5. **Test your implementation** thoroughly
6. **Compare with final files** if you get stuck or want to verify your solution

## Prerequisites

- Basic React and React Native knowledge
- Understanding of React hooks (`useState`, `useEffect`)
- Familiarity with React Native WebView component
- Basic Next.js knowledge

## Workshop Tips

- **Read all TODO comments** before starting to understand the full scope
- **Implement incrementally** - test each step before moving to the next
- **Use console.log()** liberally for debugging message flow
- **Check browser dev tools** for errors and message logging
- **Test on both simulator and device** if possible

## Common Patterns Used

### Message Format
All messages use JSON format for structure:
```javascript
{
  type: "message_type",
  data: { /* payload */ }
}
```

### React Native → Next.js
```javascript
// In React Native
const message = JSON.stringify({ type: "action", data: value });
const jsCode = `window.postMessage(${message}, '*'); true;`;
injectJavaScript(jsCode);
```

### Next.js → React Native
```javascript
// In Next.js
const message = JSON.stringify({ type: "response", data: value });
if (window.ReactNativeWebView) {
  window.ReactNativeWebView.postMessage(message);
}
```

### Event Listening in Next.js
```javascript
useEffect(() => {
  const handleMessage = (event) => {
    const data = JSON.parse(event.data);
    // Handle message based on data.type
  };

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

## Troubleshooting

- **Messages not received**: Check console for JSON parsing errors
- **Function not defined**: Ensure event listeners are set up before messages are sent
- **Race conditions**: Use proper useEffect dependencies and cleanup
- **URL issues**: Verify hash parameter encoding/decoding

## Next Steps

After completing these exercises, consider exploring:
- File upload/download through WebView
- Push notification handling
- Deep linking integration
- Advanced authentication flows
- Performance optimization for large data transfers