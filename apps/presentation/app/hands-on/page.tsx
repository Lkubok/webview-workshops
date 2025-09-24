import PresentationLayout from '../components/PresentationLayout'
import CodeBlock from '../components/CodeBlock'
import { Play, CheckCircle, Clock, Code, MessageSquare, Cookie, Shield, Navigation } from 'lucide-react'

export default function HandsOnPage() {
  const exerciseStructureCode = `// Exercise folder structure
exercises/
├── exercise-1/
│   ├── mobile-app/
│   │   ├── webview-initial.tsx    # Starting point with TODOs
│   │   └── webview-final.tsx      # Complete implementation
│   └── nextjs-page/
│       ├── embedded-initial.tsx   # Web page starting point
│       └── embedded-final.tsx     # Complete web page
├── exercise-2/
│   └── ... (same structure)
└── exercise-5/
    └── ... (same structure)

// Git branches for working examples
git checkout exercise-1    # Complete Exercise 1 implementation
git checkout exercise-2    # Complete Exercise 2 implementation
// ... etc`

  const basicWebViewCode = `// Exercise 1: Basic WebView Setup
import React, { useState, useRef } from 'react';
import { View, ActivityIndicator, Button, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}

        // Essential props
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}

        // Loading and error handling
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
    </View>
  );
};`

  const communicationCode = `// Exercise 2: Two-Way Communication
const CommunicationDemo = () => {
  const webViewRef = useRef<WebView>(null);
  const [counter, setCounter] = useState(0);
  const [lastMessage, setLastMessage] = useState('');

  // Native to WebView: Increment counter
  const incrementCounterInWebView = () => {
    const newCount = counter + 1;
    setCounter(newCount);

    const jsCode = \`
      if (window.updateCounter) {
        window.updateCounter(\${newCount});
      }
    \`;
    webViewRef.current?.injectJavaScript(jsCode);
  };

  // WebView to Native: Handle messages
  const handleWebViewMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      switch (message.type) {
        case 'counter_updated':
          setCounter(message.value);
          setLastMessage(\`WebView updated counter to \${message.value}\`);
          break;
        case 'button_clicked':
          setLastMessage(\`WebView button: \${message.buttonName}\`);
          break;
      }
    } catch (error) {
      console.error('Failed to parse WebView message:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.controls}>
        <Text>Native Counter: {counter}</Text>
        <Button
          title="Increment in WebView"
          onPress={incrementCounterInWebView}
        />
        <Text>Last Message: {lastMessage}</Text>
      </View>

      <WebView
        ref={webViewRef}
        onMessage={handleWebViewMessage}
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
      />
    </View>
  );
};`

  const tokenExchangeCode = `// Exercise 4: Token Exchange and Management
const TokenExchangeDemo = () => {
  const webViewRef = useRef<WebView>(null);
  const [userInfo, setUserInfo] = useState(null);

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

    // Mock JWT encoding
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payloadEncoded = btoa(JSON.stringify(payload));
    return \`\${header}.\${payloadEncoded}.mock-signature\`;
  };

  // Load WebView with token in hash params
  const loadWebViewWithToken = async () => {
    const token = generateMockToken();
    const url = \`http://device-dashboard.localhost:3010/embedded#access_token=\${token}\`;

    webViewRef.current?.injectJavaScript(\`
      window.location.href = '\${url}';
    \`);
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
          break;
        case 'token_refresh_requested':
          await refreshToken();
          break;
      }
    } catch (error) {
      console.error('Failed to handle WebView message:', error);
    }
  };

  const refreshToken = async () => {
    const newToken = generateMockToken();
    webViewRef.current?.injectJavaScript(\`
      if (window.updateToken) {
        window.updateToken('\${newToken}');
      }
    \`);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tokenControls}>
        <Text>Token Management</Text>
        {userInfo && (
          <View>
            <Text>User: {userInfo.username}</Text>
            <Text>Roles: {userInfo.roles.map(r => \`\${r.client}:\${r.role}\`).join(', ')}</Text>
          </View>
        )}
        <Button title="Load with Fresh Token" onPress={loadWebViewWithToken} />
      </View>

      <WebView
        ref={webViewRef}
        onMessage={handleWebViewMessage}
        source={{ uri: 'http://device-dashboard.localhost:3010/embedded' }}
      />
    </View>
  );
};`

  const exercises = [
    {
      id: 1,
      title: 'Basic WebView Setup',
      duration: '15 min',
      icon: Play,
      color: 'blue',
      goals: [
        'Learn fundamentals of React Native WebView integration',
        'Load a Next.js app in WebView',
        'Understand minimal requirements for WebView display',
        'Implement basic error handling and loading states'
      ],
      tasks: [
        'Replace apps/client-app/app/(tabs)/webview.tsx with exercise files',
        'Replace apps/device-dashboard/app/embedded/page.tsx with exercise files',
        'Configure essential WebView props',
        'Add loading indicators and error handling'
      ]
    },
    {
      id: 2,
      title: 'Two-Way Communication Bridge',
      duration: '20 min',
      icon: MessageSquare,
      color: 'green',
      goals: [
        'Create bidirectional communication between React Native and Next.js',
        'Implement native button that increments counter in WebView',
        'Send confirmation messages back from WebView to React Native',
        'Use JSON message format for structured communication'
      ],
      tasks: [
        'Handle onMessage events and injectJavaScript calls',
        'Create counter synchronization between native and web',
        'Implement message logging and debugging',
        'Add error handling for communication failures'
      ]
    },
    {
      id: 3,
      title: 'Cookie Handling and Communication',
      duration: '20 min',
      icon: Cookie,
      color: 'orange',
      goals: [
        'Implement cookie management and synchronization',
        'Add cookie detection and display in Next.js page',
        'Create cookie management interface in React Native',
        'Enable manual cookie synchronization between platforms'
      ],
      tasks: [
        'Build cookie CRUD operations in WebView',
        'Sync cookies with React Native AsyncStorage',
        'Handle cookie expiration and security flags',
        'Test cross-platform cookie persistence'
      ]
    },
    {
      id: 4,
      title: 'Token Exchange and Update in WebView',
      duration: '20 min',
      icon: Shield,
      color: 'purple',
      goals: [
        'Implement authentication token management',
        'Parse token resource_access section for role-based UI',
        'Add refresh token functionality with automatic renewal',
        'Display token expiration countdown'
      ],
      tasks: [
        'Implement JWT parsing and role extraction',
        'Create role-based UI components',
        'Add automatic token refresh mechanism',
        'Handle token expiration and renewal'
      ]
    },
    {
      id: 5,
      title: 'Navigation and State Management',
      duration: '15 min',
      icon: Navigation,
      color: 'indigo',
      goals: [
        'Handle navigation and shared state across multiple pages',
        'Implement navigation controls (back, forward, refresh, home)',
        'Create multi-page Next.js application with shared state',
        'Synchronize navigation state between React Native and WebView'
      ],
      tasks: [
        'Build native navigation controls',
        'Implement shared state management',
        'Handle deep linking and programmatic navigation',
        'Test multi-page navigation flows'
      ]
    }
  ]

  return (
    <PresentationLayout
      title="Hands-on Coding Session"
      subtitle="5 progressive exercises building a complete WebView integration • 90 minutes"
    >
      <div className="space-y-8">
        {/* Session Overview */}
        <section className="animate-fade-in">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
              <Play className="mr-3" size={24} />
              Session Structure
            </h2>
            <p className="text-blue-700 mb-4">
              Over the next 90 minutes, you&apos;ll build a complete WebView integration system from scratch,
              working through 5 progressive exercises that take you from basic setup to advanced authentication and state management.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border">
                <h3 className="font-medium text-gray-900 mb-2">Build from Scratch</h3>
                <p className="text-sm text-gray-600">Start with *-initial.tsx files that have TODOs</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <h3 className="font-medium text-gray-900 mb-2">Reference Solutions</h3>
                <p className="text-sm text-gray-600">Look at *-final.tsx files for complete implementations</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <h3 className="font-medium text-gray-900 mb-2">Use Git Branches</h3>
                <p className="text-sm text-gray-600">Switch to exercise-1, exercise-2, etc. for working examples</p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={exerciseStructureCode}
            title="Exercise Structure and Git Branches"
            language="bash"
          />
        </section>

        {/* Exercise List */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Exercise Overview</h2>

          <div className="space-y-6">
            {exercises.map((exercise) => {
              const IconComponent = exercise.icon
              const colorClasses: Record<string, string> = {
                blue: 'from-blue-50 to-blue-100 border-blue-200',
                green: 'from-green-50 to-green-100 border-green-200',
                orange: 'from-orange-50 to-orange-100 border-orange-200',
                purple: 'from-purple-50 to-purple-100 border-purple-200',
                indigo: 'from-indigo-50 to-indigo-100 border-indigo-200',
              }

              return (
                <div
                  key={exercise.id}
                  className={`bg-gradient-to-r ${colorClasses[exercise.color]} border rounded-lg p-6`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-${exercise.color}-500 text-white rounded-full flex items-center justify-center mr-4`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          Exercise {exercise.id}: {exercise.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock size={16} className="mr-1" />
                          {exercise.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Goals</h4>
                      <ul className="space-y-1">
                        {exercise.goals.map((goal, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Tasks</h4>
                      <ul className="space-y-1">
                        {exercise.tasks.map((task, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <Code size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Code Examples */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Implementation Examples</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 1: Basic WebView Setup</h3>
              <CodeBlock
                code={basicWebViewCode}
                title="Foundation WebView Implementation"
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 2: Two-Way Communication</h3>
              <CodeBlock
                code={communicationCode}
                title="Bidirectional Communication Pattern"
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise 4: Token Exchange</h3>
              <CodeBlock
                code={tokenExchangeCode}
                title="Secure Token Management"
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-900 mb-4">Complete System Capabilities</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-green-800 mb-3">After Completing All Exercises</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>Secure authentication with automatic token refresh</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>Real-time communication between native and web</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>Persistent state management across navigation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>Role-based access control</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-green-800 mb-3">Production-Ready Patterns</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>Professional error handling and user experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>Security best practices and token management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>Advanced navigation and state synchronization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
                  <span>Cross-platform cookie and storage management</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded border border-green-300">
            <p className="text-green-800 font-medium">
              🎉 You&apos;re now ready to build production WebView integrations!
            </p>
            <p className="text-sm text-green-700 mt-1">
              These patterns form the foundation for complex hybrid applications that combine the best of native and web technologies.
            </p>
          </div>
        </section>
      </div>
    </PresentationLayout>
  )
}