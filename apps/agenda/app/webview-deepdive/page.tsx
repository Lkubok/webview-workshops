"use client";

import { motion } from "framer-motion";
import {
  Code,
  MessageSquare,
  Settings,
  Shield,
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lock,
  RotateCcw,
  Database,
  Cpu,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function WebViewDeepDive() {
  return (
    <div className="mx-auto max-w-6xl p-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-red-600">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-4xl font-bold text-transparent">
              WebView Deep Dive & Communication Bridges
            </h1>
          </div>
          <div className="mb-4 flex items-center justify-center gap-2 text-slate-600">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Duration: 20 minutes</span>
            <span className="text-slate-400">|</span>
            <span>9:40 AM - 10:00 AM</span>
          </div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
            Master WebView configuration, security best practices, and
            bidirectional communication patterns that form the backbone of
            robust web-native integrations.
          </p>
        </motion.div>

        {/* WebView Configuration */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Settings className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Essential WebView Configuration
            </h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              10 minutes
            </span>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-900">
                Critical WebView Props
              </h3>
              <p className="mb-4 leading-relaxed text-blue-800">
                Proper WebView configuration is essential for functionality,
                security, and user experience. These properties control how your
                WebView behaves and what capabilities it has.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h4 className="mb-4 font-semibold text-slate-800">
                  JavaScript & Storage Configuration
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4 text-green-600" />
                      <code className="font-mono text-sm text-green-800">
                        javaScriptEnabled
                      </code>
                    </div>
                    <p className="mb-2 text-sm text-slate-600">
                      Enables JavaScript execution in the WebView. Essential for
                      modern web apps.
                    </p>
                    <div className="rounded bg-green-100 p-2 text-xs">
                      <code className="text-green-800">
                        javaScriptEnabled={"{true}"}
                      </code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Database className="h-4 w-4 text-blue-600" />
                      <code className="font-mono text-sm text-blue-800">
                        domStorageEnabled
                      </code>
                    </div>
                    <p className="mb-2 text-sm text-slate-600">
                      Enables localStorage and sessionStorage for web app state
                      management.
                    </p>
                    <div className="rounded bg-blue-100 p-2 text-xs">
                      <code className="text-blue-800">
                        domStorageEnabled={"{true}"}
                      </code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-purple-600" />
                      <code className="font-mono text-sm text-purple-800">
                        thirdPartyCookiesEnabled
                      </code>
                    </div>
                    <p className="mb-2 text-sm text-slate-600">
                      Allows third-party cookies for authentication and
                      analytics services.
                    </p>
                    <div className="rounded bg-purple-100 p-2 text-xs">
                      <code className="text-purple-800">
                        thirdPartyCookiesEnabled={"{true}"}
                      </code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-orange-600" />
                      <code className="font-mono text-sm text-orange-800">
                        userAgent
                      </code>
                    </div>
                    <p className="mb-2 text-sm text-slate-600">
                      Custom user agent for API compatibility and mobile
                      optimization.
                    </p>
                    <div className="rounded bg-orange-100 p-2 text-xs">
                      <code className="text-orange-800">
                        userAgent="MyApp/1.0"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
                <h4 className="mb-4 font-semibold text-yellow-900">
                  User Experience Enhancements
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-yellow-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <RotateCcw className="h-4 w-4 text-yellow-600" />
                      <code className="font-mono text-sm text-yellow-800">
                        startInLoadingState
                      </code>
                    </div>
                    <p className="mb-2 text-sm text-yellow-700">
                      Shows loading indicator while WebView content loads,
                      improving perceived performance.
                    </p>
                  </div>

                  <div className="rounded-lg border border-yellow-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4 text-yellow-600" />
                      <code className="font-mono text-sm text-yellow-800">
                        allowsBackForwardNavigationGestures
                      </code>
                    </div>
                    <p className="mb-2 text-sm text-yellow-700">
                      Enables swipe gestures for navigation, providing
                      native-like UX on iOS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Considerations */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Security Considerations
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-red-900">
                Critical Security Properties
              </h3>
              <p className="leading-relaxed text-red-800">
                Security in WebView implementation requires careful attention to
                URL validation, content policies, and JavaScript injection
                prevention.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-xl bg-gradient-to-r from-red-600 to-pink-600 p-6 text-white">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Lock className="h-5 w-5" />
                  URL and Content Security
                </h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">originWhitelist</h5>
                    <p className="mb-3 text-sm text-red-100">
                      Control which domains the WebView can navigate to,
                      preventing malicious redirects.
                    </p>
                    <div className="rounded bg-red-900/30 p-2 text-xs">
                      <code>['https://*.yourdomain.com']</code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">mixedContentMode</h5>
                    <p className="mb-3 text-sm text-red-100">
                      Control how HTTPS/HTTP mixed content is handled for
                      security compliance.
                    </p>
                    <div className="rounded bg-red-900/30 p-2 text-xs">
                      <code>'never' | 'always' | 'compatibility'</code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">
                      allowsInlineMediaPlayback
                    </h5>
                    <p className="mb-3 text-sm text-red-100">
                      Control media playback behavior to prevent unwanted
                      auto-play attacks.
                    </p>
                    <div className="rounded bg-red-900/30 p-2 text-xs">
                      <code>allowsInlineMediaPlayback={"{false}"}</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-orange-900">
                  <AlertTriangle className="h-5 w-5" />
                  JavaScript Injection Prevention
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="mb-2 font-medium text-orange-900">
                      ❌ Vulnerable Approach
                    </h5>
                    <div className="rounded-lg border border-red-200 bg-red-100 p-3">
                      <pre className="text-sm text-red-800">
                        {`// NEVER do this with user input
webViewRef.injectJavaScript(
  \`alert('\${userInput}')\`
)`}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h5 className="mb-2 font-medium text-orange-900">
                      ✅ Secure Approach
                    </h5>
                    <div className="rounded-lg border border-green-200 bg-green-100 p-3">
                      <pre className="text-sm text-green-800">
                        {`// Use postMessage for data transfer
webViewRef.postMessage(
  JSON.stringify({data: userInput})
)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Optimization */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Zap className="h-6 w-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Performance Optimization
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Database className="h-6 w-6 text-green-600" />
                  <h4 className="font-semibold text-green-900">
                    Caching Strategy
                  </h4>
                </div>
                <p className="mb-3 text-sm text-green-800">
                  Implement smart caching to reduce load times and improve
                  offline capabilities.
                </p>
                <div className="rounded-lg bg-green-100 p-3">
                  <pre className="text-xs text-green-800">
                    {`cacheEnabled={true}
cacheMode='LOAD_CACHE_ELSE_NETWORK'`}
                  </pre>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Cpu className="h-6 w-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">
                    JavaScript Timing
                  </h4>
                </div>
                <p className="mb-3 text-sm text-blue-800">
                  Understanding when to use injectedJavaScript vs
                  injectJavaScript() for optimal performance.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="rounded bg-blue-100 p-2">
                    <span className="text-blue-800">
                      injectedJavaScript: On load
                    </span>
                  </div>
                  <div className="rounded bg-blue-100 p-2">
                    <span className="text-blue-800">
                      injectJavaScript(): Runtime
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <RotateCcw className="h-6 w-6 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">
                    Memory Management
                  </h4>
                </div>
                <p className="mb-3 text-sm text-purple-800">
                  Proper WebView lifecycle management prevents memory leaks and
                  crashes.
                </p>
                <div className="space-y-1 text-xs text-purple-700">
                  <div>• Clean up listeners</div>
                  <div>• Remove event handlers</div>
                  <div>• Clear timers/intervals</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Communication Bridges */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Communication Bridges
            </h2>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
              10 minutes
            </span>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-indigo-900">
                Bidirectional Communication
              </h3>
              <p className="leading-relaxed text-indigo-800">
                Effective WebView integration requires robust communication
                channels between React Native and web content. We'll explore
                both directions of data flow.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <ArrowRight className="h-5 w-5" />
                  React Native → WebView
                </h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">injectJavaScript()</h5>
                    <p className="mb-3 text-sm text-indigo-100">
                      Execute JavaScript code dynamically in the WebView
                      context.
                    </p>
                    <div className="rounded bg-indigo-900/30 p-2 text-xs">
                      <code>webView.injectJavaScript('alert("Hello")')</code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">URL Parameters</h5>
                    <p className="mb-3 text-sm text-indigo-100">
                      Pass data through URL query parameters or hash fragments.
                    </p>
                    <div className="rounded bg-indigo-900/30 p-2 text-xs">
                      <code>url + '#token=' + accessToken</code>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">postMessage</h5>
                    <p className="mb-3 text-sm text-indigo-100">
                      Send structured data from native to web context safely.
                    </p>
                    <div className="rounded bg-indigo-900/30 p-2 text-xs">
                      <code>postMessage(JSON.stringify(data))</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <ArrowLeft className="h-5 w-5" />
                  WebView → React Native
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">
                      window.ReactNativeWebView.postMessage()
                    </h5>
                    <p className="mb-3 text-sm text-purple-100">
                      Standard method for sending messages from web to React
                      Native.
                    </p>
                    <div className="rounded bg-purple-900/30 p-3 text-xs">
                      <pre className="text-purple-100">
                        {`window.ReactNativeWebView
.postMessage(JSON.stringify({
  type: 'navigation',
  data: { page: "home" }
}))`}
                      </pre>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">onMessage Handler</h5>
                    <p className="mb-3 text-sm text-purple-100">
                      React Native handler that receives and processes messages
                      from WebView.
                    </p>
                    <div className="rounded bg-purple-900/30 p-3 text-xs">
                      <pre className="text-purple-100">
                        {`onMessage={(event) => {
  const message = JSON.parse(
    event.nativeEvent.data
  )
  handleMessage(message)
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-yellow-900">
                <CheckCircle className="h-5 w-5" />
                Best Practices for Communication
              </h4>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h5 className="mb-3 font-medium text-yellow-900">
                    Message Structure
                  </h5>
                  <div className="rounded-lg border border-yellow-200 bg-white p-4">
                    <pre className="text-sm text-yellow-800">
                      {`{
  "type": "ACTION_TYPE",
  "payload": { /* data */ },
  "timestamp": Date.now(),
  "id": "unique-id"
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h5 className="mb-3 font-medium text-yellow-900">
                    Error Handling
                  </h5>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span>Always try-catch JSON parsing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span>Implement message queuing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span>Add timeout handling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span>Clean up event listeners</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold">Time to get hands-on!</h2>
              <p className="mb-4 text-orange-100">
                You've learned the theory - now let's apply it through practical
                coding exercises.
              </p>
            </div>
            <ArrowRight className="h-8 w-8 text-orange-200" />
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-orange-100">
              <strong>Up Next:</strong> Hands-on Coding Session (90 minutes)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
