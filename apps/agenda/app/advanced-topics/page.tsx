"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Clock,
  Zap,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle,
  Bug,
  Network,
  Eye,
  Layers,
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

export default function AdvancedTopics() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-pink-600">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
              Advanced WebView Topics & Troubleshooting
            </h1>
          </div>
          <div className="mb-4 flex items-center justify-center gap-2 text-slate-600">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Duration: 20 minutes</span>
            <span className="text-slate-400">|</span>
            <span>11:30 AM - 11:50 AM</span>
          </div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
            Master advanced WebView integration patterns, solve common issues,
            and implement production-ready solutions with confidence.
          </p>
        </motion.div>

        {/* Common Issues */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Bug className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Common Issues & Solutions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6">
              <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Network className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-900">
                    Loading Problems
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-red-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-red-900">
                      Network Connectivity
                    </h4>
                    <p className="mb-3 text-sm text-red-800">
                      Handle network timeouts and connection failures
                      gracefully.
                    </p>
                    <div className="rounded-lg bg-red-100 p-3">
                      <pre className="text-xs text-red-800">
                        {`onError={(error) => {
  showOfflineMessage()
  enableRetryButton()
}}`}
                      </pre>
                    </div>
                  </div>
                  <div className="rounded-lg border border-red-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-red-900">
                      Mixed Content
                    </h4>
                    <p className="mb-3 text-sm text-red-800">
                      Resolve HTTPS/HTTP content conflicts in production.
                    </p>
                    <div className="rounded-lg bg-red-100 p-3">
                      <pre className="text-xs text-red-800">
                        {`mixedContentMode='never'
allowsInlineMediaPlayback
mediaPlaybackRequiresUserAction`}
                      </pre>
                    </div>
                  </div>
                  <div className="rounded-lg border border-red-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-red-900">
                      Domain Whitelist
                    </h4>
                    <p className="mb-3 text-sm text-red-800">
                      Configure proper URL validation and security policies.
                    </p>
                    <div className="rounded-lg bg-red-100 p-3">
                      <pre className="text-xs text-red-800">
                        {`originWhitelist={[
  'https://*.yourdomain.com',
  'https://api.example.com'
]}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-xl font-bold text-yellow-900">
                    Performance Issues
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-yellow-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-yellow-900">
                      Memory Leaks
                    </h4>
                    <p className="mb-3 text-sm text-yellow-800">
                      Implement proper cleanup and lifecycle management.
                    </p>
                    <ul className="space-y-1 text-xs text-yellow-700">
                      <li>• Remove event listeners on unmount</li>
                      <li>• Clear timers and intervals</li>
                      <li>• Clean up WebView references</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-yellow-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-yellow-900">
                      Large DOM Handling
                    </h4>
                    <p className="mb-3 text-sm text-yellow-800">
                      Optimize rendering for complex web applications.
                    </p>
                    <ul className="space-y-1 text-xs text-yellow-700">
                      <li>• Implement virtual scrolling</li>
                      <li>• Use progressive loading</li>
                      <li>• Minimize DOM complexity</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-yellow-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-yellow-900">
                      Image Optimization
                    </h4>
                    <p className="mb-3 text-sm text-yellow-800">
                      Reduce memory usage and improve load times.
                    </p>
                    <ul className="space-y-1 text-xs text-yellow-700">
                      <li>• Implement lazy loading</li>
                      <li>• Compress images appropriately</li>
                      <li>• Use responsive images</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Smartphone className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-900">
                    Platform-Specific Challenges
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-purple-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-purple-900">
                      iOS vs Android
                    </h4>
                    <p className="mb-3 text-sm text-purple-800">
                      Handle WebView behavior differences between platforms.
                    </p>
                    <ul className="space-y-1 text-xs text-purple-700">
                      <li>• Different JavaScript engines</li>
                      <li>• Varying cookie behavior</li>
                      <li>• Platform-specific props</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-purple-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-purple-900">
                      Keyboard Handling
                    </h4>
                    <p className="mb-3 text-sm text-purple-800">
                      Manage viewport adjustments and input focus.
                    </p>
                    <ul className="space-y-1 text-xs text-purple-700">
                      <li>• Keyboard avoiding view</li>
                      <li>• Viewport meta tags</li>
                      <li>• Focus management</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-purple-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-purple-900">
                      File Operations
                    </h4>
                    <p className="mb-3 text-sm text-purple-800">
                      Handle upload and download limitations.
                    </p>
                    <ul className="space-y-1 text-xs text-purple-700">
                      <li>• File picker integration</li>
                      <li>• Download management</li>
                      <li>• Permissions handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Debugging Techniques */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Eye className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Debugging Techniques
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Globe className="h-6 w-6 text-blue-600" />
                <h4 className="font-semibold text-blue-900">
                  Remote Debugging
                </h4>
              </div>
              <p className="mb-4 text-sm text-blue-800">
                Use Chrome DevTools for WebView debugging and inspection.
              </p>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="rounded bg-blue-100 p-2">
                  chrome://inspect (Android)
                </div>
                <div className="rounded bg-blue-100 p-2">
                  Safari Web Inspector (iOS)
                </div>
                <div className="rounded bg-blue-100 p-2">
                  React Native Debugger
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Bug className="h-6 w-6 text-green-600" />
                <h4 className="font-semibold text-green-900">
                  Console Logging
                </h4>
              </div>
              <p className="mb-4 text-sm text-green-800">
                Implement comprehensive logging for error tracking.
              </p>
              <div className="rounded-lg bg-green-100 p-3">
                <pre className="text-xs text-green-800">
                  {`console.log('WebView event:', data)
console.error('WebView error:', error)
console.time('WebView load')`}
                </pre>
              </div>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Network className="h-6 w-6 text-purple-600" />
                <h4 className="font-semibold text-purple-900">
                  Network Monitoring
                </h4>
              </div>
              <p className="mb-4 text-sm text-purple-800">
                Track network requests and API communication.
              </p>
              <div className="space-y-2 text-xs text-purple-700">
                <div className="rounded bg-purple-100 p-2">
                  Network tab in DevTools
                </div>
                <div className="rounded bg-purple-100 p-2">
                  Flipper network inspector
                </div>
                <div className="rounded bg-purple-100 p-2">
                  Custom logging middleware
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Integration Patterns */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Layers className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Advanced Integration Patterns
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-indigo-900">
                WebView Lifecycle Management
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-indigo-200 bg-white p-4">
                  <h4 className="mb-2 font-semibold text-indigo-900">
                    Mounting/Unmounting
                  </h4>
                  <p className="mb-3 text-sm text-indigo-800">
                    Proper initialization and cleanup procedures.
                  </p>
                  <div className="rounded bg-indigo-100 p-2 text-xs">
                    <pre className="text-xs text-indigo-800">
                      {`useEffect(() => {
  // Setup WebView
  return cleanup
}, [])`}
                    </pre>
                  </div>
                </div>
                <div className="rounded-lg border border-indigo-200 bg-white p-4">
                  <h4 className="mb-2 font-semibold text-indigo-900">
                    Background/Foreground
                  </h4>
                  <p className="mb-3 text-sm text-indigo-800">
                    Handle app state changes and WebView suspension.
                  </p>
                  <div className="rounded bg-indigo-100 p-2 text-xs">
                    <pre className="text-xs text-indigo-800">
                      {`AppState.addEventListener(
  'change', handleAppState
)`}
                    </pre>
                  </div>
                </div>
                <div className="rounded-lg border border-indigo-200 bg-white p-4">
                  <h4 className="mb-2 font-semibold text-indigo-900">
                    Memory Cleanup
                  </h4>
                  <p className="mb-3 text-sm text-indigo-800">
                    Implement comprehensive cleanup strategies.
                  </p>
                  <ul className="space-y-1 text-xs text-indigo-700">
                    <li>• Clear WebView cache</li>
                    <li>• Remove message listeners</li>
                    <li>• Cancel pending requests</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-green-900">
                Multi-WebView Architecture
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-green-900">
                    When to Use Multiple WebViews
                  </h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span>Independent authentication contexts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span>Separate security domains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span>Different performance requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                      <span>Isolated error boundaries</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-green-900">
                    Shared State Management
                  </h4>
                  <div className="rounded-lg border border-green-200 bg-white p-4">
                    <pre className="text-sm text-green-800">
                      {`// Context provider for WebViews
const WebViewContext = createContext()

// Shared state hooks
const useWebViewState = () => {
  return useContext(WebViewContext)
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-yellow-900">
                Progressive Web App (PWA) Integration
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-yellow-200 bg-white p-4">
                  <h4 className="mb-2 font-semibold text-yellow-900">
                    Service Worker Compatibility
                  </h4>
                  <p className="mb-3 text-sm text-yellow-800">
                    Handle service worker registration and updates in WebView.
                  </p>
                  <div className="rounded bg-yellow-100 p-2 text-xs">
                    <span className="text-yellow-800">
                      Check SW support in WebView
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-yellow-200 bg-white p-4">
                  <h4 className="mb-2 font-semibold text-yellow-900">
                    Offline Functionality
                  </h4>
                  <p className="mb-3 text-sm text-yellow-800">
                    Implement offline support and cache management.
                  </p>
                  <div className="rounded bg-yellow-100 p-2 text-xs">
                    <span className="text-yellow-800">
                      Cache-first strategies
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-yellow-200 bg-white p-4">
                  <h4 className="mb-2 font-semibold text-yellow-900">
                    App-like Behavior
                  </h4>
                  <p className="mb-3 text-sm text-yellow-800">
                    Create seamless native-web hybrid experiences.
                  </p>
                  <div className="rounded bg-yellow-100 p-2 text-xs">
                    <span className="text-yellow-800">
                      Native navigation patterns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold">
                Time to wrap up and discuss!
              </h2>
              <p className="mb-4 text-red-100">
                Let's consolidate your learning and discuss implementation
                strategies for your projects.
              </p>
            </div>
            <ArrowRight className="h-8 w-8 text-red-200" />
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-red-100">
              <strong>Up Next:</strong> Wrap-Up & Discussion (40 minutes)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
