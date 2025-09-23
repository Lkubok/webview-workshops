"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Clock,
  AlertTriangle,
  Zap,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle,
  Bug,
  Network,
  Eye,
  FileImage,
  Download,
  Layers,
  RotateCcw,
  Settings,
  Shield,
  Cpu
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

export default function AdvancedTopics() {
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
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Advanced WebView Topics & Troubleshooting
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Duration: 20 minutes</span>
            <span className="text-slate-400">|</span>
            <span>11:30 AM - 11:50 AM</span>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Master advanced WebView integration patterns, solve common issues, and implement
            production-ready solutions with confidence.
          </p>
        </motion.div>

        {/* Common Issues */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Bug className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-slate-800">Common Issues & Solutions</h2>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Network className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-900">Loading Problems</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Network Connectivity</h4>
                    <p className="text-red-800 text-sm mb-3">
                      Handle network timeouts and connection failures gracefully.
                    </p>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <pre className="text-xs text-red-800">
{`onError={(error) => {
  showOfflineMessage()
  enableRetryButton()
}}`}
                      </pre>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Mixed Content</h4>
                    <p className="text-red-800 text-sm mb-3">
                      Resolve HTTPS/HTTP content conflicts in production.
                    </p>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <pre className="text-xs text-red-800">
{`mixedContentMode='never'
allowsInlineMediaPlayback
mediaPlaybackRequiresUserAction`}
                      </pre>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">Domain Whitelist</h4>
                    <p className="text-red-800 text-sm mb-3">
                      Configure proper URL validation and security policies.
                    </p>
                    <div className="bg-red-100 p-3 rounded-lg">
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

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-bold text-yellow-900">Performance Issues</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2">Memory Leaks</h4>
                    <p className="text-yellow-800 text-sm mb-3">
                      Implement proper cleanup and lifecycle management.
                    </p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• Remove event listeners on unmount</li>
                      <li>• Clear timers and intervals</li>
                      <li>• Clean up WebView references</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2">Large DOM Handling</h4>
                    <p className="text-yellow-800 text-sm mb-3">
                      Optimize rendering for complex web applications.
                    </p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• Implement virtual scrolling</li>
                      <li>• Use progressive loading</li>
                      <li>• Minimize DOM complexity</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2">Image Optimization</h4>
                    <p className="text-yellow-800 text-sm mb-3">
                      Reduce memory usage and improve load times.
                    </p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• Implement lazy loading</li>
                      <li>• Compress images appropriately</li>
                      <li>• Use responsive images</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-900">Platform-Specific Challenges</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">iOS vs Android</h4>
                    <p className="text-purple-800 text-sm mb-3">
                      Handle WebView behavior differences between platforms.
                    </p>
                    <ul className="text-xs text-purple-700 space-y-1">
                      <li>• Different JavaScript engines</li>
                      <li>• Varying cookie behavior</li>
                      <li>• Platform-specific props</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Keyboard Handling</h4>
                    <p className="text-purple-800 text-sm mb-3">
                      Manage viewport adjustments and input focus.
                    </p>
                    <ul className="text-xs text-purple-700 space-y-1">
                      <li>• Keyboard avoiding view</li>
                      <li>• Viewport meta tags</li>
                      <li>• Focus management</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">File Operations</h4>
                    <p className="text-purple-800 text-sm mb-3">
                      Handle upload and download limitations.
                    </p>
                    <ul className="text-xs text-purple-700 space-y-1">
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
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Debugging Techniques</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-6 h-6 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Remote Debugging</h4>
              </div>
              <p className="text-blue-800 text-sm mb-4">
                Use Chrome DevTools for WebView debugging and inspection.
              </p>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="bg-blue-100 p-2 rounded">chrome://inspect (Android)</div>
                <div className="bg-blue-100 p-2 rounded">Safari Web Inspector (iOS)</div>
                <div className="bg-blue-100 p-2 rounded">React Native Debugger</div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Bug className="w-6 h-6 text-green-600" />
                <h4 className="font-semibold text-green-900">Console Logging</h4>
              </div>
              <p className="text-green-800 text-sm mb-4">
                Implement comprehensive logging for error tracking.
              </p>
              <div className="bg-green-100 p-3 rounded-lg">
                <pre className="text-xs text-green-800">
{`console.log('WebView event:', data)
console.error('WebView error:', error)
console.time('WebView load')`}
                </pre>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Network className="w-6 h-6 text-purple-600" />
                <h4 className="font-semibold text-purple-900">Network Monitoring</h4>
              </div>
              <p className="text-purple-800 text-sm mb-4">
                Track network requests and API communication.
              </p>
              <div className="space-y-2 text-xs text-purple-700">
                <div className="bg-purple-100 p-2 rounded">Network tab in DevTools</div>
                <div className="bg-purple-100 p-2 rounded">Flipper network inspector</div>
                <div className="bg-purple-100 p-2 rounded">Custom logging middleware</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advanced Integration Patterns */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">Advanced Integration Patterns</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-indigo-900 mb-4">WebView Lifecycle Management</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Mounting/Unmounting</h4>
                  <p className="text-indigo-800 text-sm mb-3">
                    Proper initialization and cleanup procedures.
                  </p>
                  <div className="bg-indigo-100 p-2 rounded text-xs">
                    <pre className="text-indigo-800 text-xs">
{`useEffect(() => {
  // Setup WebView
  return cleanup
}, [])`}
                    </pre>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Background/Foreground</h4>
                  <p className="text-indigo-800 text-sm mb-3">
                    Handle app state changes and WebView suspension.
                  </p>
                  <div className="bg-indigo-100 p-2 rounded text-xs">
                    <pre className="text-indigo-800 text-xs">
{`AppState.addEventListener(
  'change', handleAppState
)`}
                    </pre>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Memory Cleanup</h4>
                  <p className="text-indigo-800 text-sm mb-3">
                    Implement comprehensive cleanup strategies.
                  </p>
                  <ul className="text-xs text-indigo-700 space-y-1">
                    <li>• Clear WebView cache</li>
                    <li>• Remove message listeners</li>
                    <li>• Cancel pending requests</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-green-900 mb-4">Multi-WebView Architecture</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-900 mb-3">When to Use Multiple WebViews</h4>
                  <ul className="text-green-800 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Independent authentication contexts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Separate security domains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Different performance requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Isolated error boundaries</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-3">Shared State Management</h4>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
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

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-yellow-900 mb-4">Progressive Web App (PWA) Integration</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Service Worker Compatibility</h4>
                  <p className="text-yellow-800 text-sm mb-3">
                    Handle service worker registration and updates in WebView.
                  </p>
                  <div className="bg-yellow-100 p-2 rounded text-xs">
                    <span className="text-yellow-800">Check SW support in WebView</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Offline Functionality</h4>
                  <p className="text-yellow-800 text-sm mb-3">
                    Implement offline support and cache management.
                  </p>
                  <div className="bg-yellow-100 p-2 rounded text-xs">
                    <span className="text-yellow-800">Cache-first strategies</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">App-like Behavior</h4>
                  <p className="text-yellow-800 text-sm mb-3">
                    Create seamless native-web hybrid experiences.
                  </p>
                  <div className="bg-yellow-100 p-2 rounded text-xs">
                    <span className="text-yellow-800">Native navigation patterns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={fadeInUp} className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Time to wrap up and discuss!</h2>
              <p className="text-red-100 mb-4">
                Let's consolidate your learning and discuss implementation strategies for your projects.
              </p>
            </div>
            <ArrowRight className="w-8 h-8 text-red-200" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-sm text-red-100">
              <strong>Up Next:</strong> Wrap-Up & Discussion (40 minutes)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}