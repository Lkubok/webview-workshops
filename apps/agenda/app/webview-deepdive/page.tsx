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
  Eye,
  RotateCcw,
  Database,
  Network,
  Cpu,
  FileText
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function WebViewDeepDive() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              WebView Deep Dive & Communication Bridges
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Duration: 20 minutes</span>
            <span className="text-slate-400">|</span>
            <span>9:40 AM - 10:00 AM</span>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Master WebView configuration, security best practices, and bidirectional communication
            patterns that form the backbone of robust web-native integrations.
          </p>
        </motion.div>

        {/* WebView Configuration */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Essential WebView Configuration</h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              10 minutes
            </span>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-blue-900 mb-3">Critical WebView Props</h3>
              <p className="text-blue-800 leading-relaxed mb-4">
                Proper WebView configuration is essential for functionality, security, and user experience.
                These properties control how your WebView behaves and what capabilities it has.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h4 className="font-semibold text-slate-800 mb-4">JavaScript & Storage Configuration</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-green-600" />
                      <code className="font-mono text-sm text-green-800">javaScriptEnabled</code>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      Enables JavaScript execution in the WebView. Essential for modern web apps.
                    </p>
                    <div className="bg-green-100 p-2 rounded text-xs">
                      <code className="text-green-800">javaScriptEnabled={'{true}'}</code>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-blue-600" />
                      <code className="font-mono text-sm text-blue-800">domStorageEnabled</code>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      Enables localStorage and sessionStorage for web app state management.
                    </p>
                    <div className="bg-blue-100 p-2 rounded text-xs">
                      <code className="text-blue-800">domStorageEnabled={'{true}'}</code>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-purple-600" />
                      <code className="font-mono text-sm text-purple-800">thirdPartyCookiesEnabled</code>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      Allows third-party cookies for authentication and analytics services.
                    </p>
                    <div className="bg-purple-100 p-2 rounded text-xs">
                      <code className="text-purple-800">thirdPartyCookiesEnabled={'{true}'}</code>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="w-4 h-4 text-orange-600" />
                      <code className="font-mono text-sm text-orange-800">userAgent</code>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      Custom user agent for API compatibility and mobile optimization.
                    </p>
                    <div className="bg-orange-100 p-2 rounded text-xs">
                      <code className="text-orange-800">userAgent="MyApp/1.0"</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="font-semibold text-yellow-900 mb-4">User Experience Enhancements</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <RotateCcw className="w-4 h-4 text-yellow-600" />
                      <code className="font-mono text-sm text-yellow-800">startInLoadingState</code>
                    </div>
                    <p className="text-sm text-yellow-700 mb-2">
                      Shows loading indicator while WebView content loads, improving perceived performance.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowLeft className="w-4 h-4 text-yellow-600" />
                      <code className="font-mono text-sm text-yellow-800">allowsBackForwardNavigationGestures</code>
                    </div>
                    <p className="text-sm text-yellow-700 mb-2">
                      Enables swipe gestures for navigation, providing native-like UX on iOS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Considerations */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-slate-800">Security Considerations</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-red-900 mb-3">Critical Security Properties</h3>
              <p className="text-red-800 leading-relaxed">
                Security in WebView implementation requires careful attention to URL validation,
                content policies, and JavaScript injection prevention.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-6 text-white">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  URL and Content Security
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">originWhitelist</h5>
                    <p className="text-sm text-red-100 mb-3">
                      Control which domains the WebView can navigate to, preventing malicious redirects.
                    </p>
                    <div className="bg-red-900/30 p-2 rounded text-xs">
                      <code>['https://*.yourdomain.com']</code>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">mixedContentMode</h5>
                    <p className="text-sm text-red-100 mb-3">
                      Control how HTTPS/HTTP mixed content is handled for security compliance.
                    </p>
                    <div className="bg-red-900/30 p-2 rounded text-xs">
                      <code>'never' | 'always' | 'compatibility'</code>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">allowsInlineMediaPlayback</h5>
                    <p className="text-sm text-red-100 mb-3">
                      Control media playback behavior to prevent unwanted auto-play attacks.
                    </p>
                    <div className="bg-red-900/30 p-2 rounded text-xs">
                      <code>allowsInlineMediaPlayback={'{false}'}</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  JavaScript Injection Prevention
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-orange-900 mb-2">❌ Vulnerable Approach</h5>
                    <div className="bg-red-100 p-3 rounded-lg border border-red-200">
                      <pre className="text-sm text-red-800">
{`// NEVER do this with user input
webViewRef.injectJavaScript(
  \`alert('\${userInput}')\`
)`}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-900 mb-2">✅ Secure Approach</h5>
                    <div className="bg-green-100 p-3 rounded-lg border border-green-200">
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
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-slate-800">Performance Optimization</h2>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold text-green-900">Caching Strategy</h4>
                </div>
                <p className="text-green-800 text-sm mb-3">
                  Implement smart caching to reduce load times and improve offline capabilities.
                </p>
                <div className="bg-green-100 p-3 rounded-lg">
                  <pre className="text-xs text-green-800">
{`cacheEnabled={true}
cacheMode='LOAD_CACHE_ELSE_NETWORK'`}
                  </pre>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">JavaScript Timing</h4>
                </div>
                <p className="text-blue-800 text-sm mb-3">
                  Understanding when to use injectedJavaScript vs injectJavaScript() for optimal performance.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-blue-100 p-2 rounded">
                    <span className="text-blue-800">injectedJavaScript: On load</span>
                  </div>
                  <div className="bg-blue-100 p-2 rounded">
                    <span className="text-blue-800">injectJavaScript(): Runtime</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <RotateCcw className="w-6 h-6 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Memory Management</h4>
                </div>
                <p className="text-purple-800 text-sm mb-3">
                  Proper WebView lifecycle management prevents memory leaks and crashes.
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
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">Communication Bridges</h2>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              10 minutes
            </span>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-indigo-900 mb-3">Bidirectional Communication</h3>
              <p className="text-indigo-800 leading-relaxed">
                Effective WebView integration requires robust communication channels between
                React Native and web content. We'll explore both directions of data flow.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  React Native → WebView
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">injectJavaScript()</h5>
                    <p className="text-sm text-indigo-100 mb-3">
                      Execute JavaScript code dynamically in the WebView context.
                    </p>
                    <div className="bg-indigo-900/30 p-2 rounded text-xs">
                      <code>webView.injectJavaScript('alert("Hello")')</code>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">URL Parameters</h5>
                    <p className="text-sm text-indigo-100 mb-3">
                      Pass data through URL query parameters or hash fragments.
                    </p>
                    <div className="bg-indigo-900/30 p-2 rounded text-xs">
                      <code>url + '#token=' + accessToken</code>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">postMessage</h5>
                    <p className="text-sm text-indigo-100 mb-3">
                      Send structured data from native to web context safely.
                    </p>
                    <div className="bg-indigo-900/30 p-2 rounded text-xs">
                      <code>postMessage(JSON.stringify(data))</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  WebView → React Native
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">window.ReactNativeWebView.postMessage()</h5>
                    <p className="text-sm text-purple-100 mb-3">
                      Standard method for sending messages from web to React Native.
                    </p>
                    <div className="bg-purple-900/30 p-3 rounded text-xs">
                      <pre className="text-purple-100">
{`window.ReactNativeWebView
.postMessage(JSON.stringify({
  type: 'navigation',
  data: { page: "home" }
}))`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">onMessage Handler</h5>
                    <p className="text-sm text-purple-100 mb-3">
                      React Native handler that receives and processes messages from WebView.
                    </p>
                    <div className="bg-purple-900/30 p-3 rounded text-xs">
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

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Best Practices for Communication
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-yellow-900 mb-3">Message Structure</h5>
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
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
                  <h5 className="font-medium text-yellow-900 mb-3">Error Handling</h5>
                  <ul className="text-sm text-yellow-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Always try-catch JSON parsing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Implement message queuing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Add timeout handling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Clean up event listeners</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={fadeInUp} className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Time to get hands-on!</h2>
              <p className="text-orange-100 mb-4">
                You've learned the theory - now let's apply it through practical coding exercises.
              </p>
            </div>
            <ArrowRight className="w-8 h-8 text-orange-200" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-sm text-orange-100">
              <strong>Up Next:</strong> Hands-on Coding Session (90 minutes)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}