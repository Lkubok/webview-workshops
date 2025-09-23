"use client";

import { motion } from "framer-motion";
import {
  Target,
  Key,
  Shield,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
  Server,
  Smartphone,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowDownRight
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

export default function LoyaltyIntegration() {
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
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Our Approach to Loyalty App Integration
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Duration: 10 minutes</span>
            <span className="text-slate-400">|</span>
            <span>9:20 AM - 9:30 AM</span>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover how we successfully integrated our loyalty app with myVaillant Pro service app
            using secure token exchange and advanced authentication flows.
          </p>
        </motion.div>

        {/* Integration Overview */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">Integration Overview</h2>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-lg text-green-900 mb-3">The Challenge</h3>
            <p className="text-green-800 leading-relaxed">
              We needed to seamlessly integrate our existing loyalty web application into the myVaillant Pro
              mobile service app while maintaining secure authentication and providing a native-like user experience.
              The key was ensuring users could access loyalty features without separate login while keeping
              security standards high.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Before Integration
              </h4>
              <ul className="text-blue-800 text-sm space-y-2">
                <li>• Separate loyalty web app</li>
                <li>• Independent authentication</li>
                <li>• Users had to login twice</li>
                <li>• No shared user context</li>
                <li>• Poor mobile experience</li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                After Integration
              </h4>
              <ul className="text-emerald-800 text-sm space-y-2">
                <li>• Embedded WebView integration</li>
                <li>• Seamless token exchange</li>
                <li>• Single sign-on experience</li>
                <li>• Shared authentication state</li>
                <li>• Native mobile experience</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Token Exchange Solution */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-800">Exchange Token Solution</h2>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-lg text-purple-900 mb-3">Keycloak IDM Integration</h3>
            <p className="text-purple-800 leading-relaxed">
              Our solution leverages Keycloak as the Identity Management (IDM) provider to create a secure
              token exchange mechanism. This allows the mobile app to obtain a loyalty-specific token
              using the user's existing service app credentials.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Server className="w-5 h-5" />
                Token Exchange Flow
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h5 className="font-medium mb-2">Service App Token</h5>
                  <p className="text-sm text-purple-100">
                    User authenticates in myVaillant Pro service app and obtains service token
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h5 className="font-medium mb-2">Token Exchange</h5>
                  <p className="text-sm text-purple-100">
                    Service token is exchanged for loyalty-specific token via Keycloak
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h5 className="font-medium mb-2">WebView Access</h5>
                  <p className="text-sm text-purple-100">
                    Loyalty token is passed to WebView for seamless authentication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Authentication Flow */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">Authentication Flow</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-indigo-900 mb-3">Mobile App → WebView → Keycloak Flow</h3>
              <p className="text-indigo-800 leading-relaxed mb-4">
                The authentication flow involves three main components working together to provide
                seamless access while maintaining security boundaries.
              </p>

              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-indigo-200">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900">Mobile Application</h4>
                    <p className="text-sm text-indigo-700">
                      Initiates authentication and manages WebView lifecycle
                    </p>
                  </div>
                  <ArrowDownRight className="w-5 h-5 text-indigo-400" />
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-indigo-200">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900">WebView</h4>
                    <p className="text-sm text-indigo-700">
                      Renders loyalty app and handles token-based authentication
                    </p>
                  </div>
                  <ArrowDownRight className="w-5 h-5 text-indigo-400" />
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-indigo-200">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                    <Server className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900">Keycloak IDM</h4>
                    <p className="text-sm text-indigo-700">
                      Validates tokens and provides secure authentication services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hash Params Security */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-slate-800">Hash Params for Token Passing</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-orange-900 mb-3">Why Hash Params Are More Secure</h3>
              <p className="text-orange-800 leading-relaxed">
                We use hash parameters (e.g., <code className="bg-orange-200 px-2 py-1 rounded">#access_token=...</code>)
                instead of query parameters for passing tokens because they provide an additional layer of security.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-900">Query Parameters (Less Secure)</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                    <span className="text-red-800">Visible in server logs and access logs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                    <span className="text-red-800">Sent in HTTP referrer headers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                    <span className="text-red-800">Cached by browsers and proxies</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                    <span className="text-red-800">Visible in browser history</span>
                  </div>
                </div>
                <div className="mt-4 bg-red-100 p-3 rounded-lg">
                  <code className="text-xs text-red-800">
                    https://app.com/loyalty?access_token=abc123...
                  </code>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <EyeOff className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-900">Hash Parameters (More Secure)</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-green-800">Never sent to the server</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-green-800">Not included in referrer headers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-green-800">Client-side only processing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-green-800">Reduced attack surface</span>
                  </div>
                </div>
                <div className="mt-4 bg-green-100 p-3 rounded-lg">
                  <code className="text-xs text-green-800">
                    https://app.com/loyalty#access_token=abc123...
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Benefits in Practice
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-yellow-900 mb-2">Server Log Protection</h5>
                  <p className="text-yellow-800">
                    Hash params never appear in server access logs, preventing token exposure in log files.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-900 mb-2">Referrer Safety</h5>
                  <p className="text-yellow-800">
                    Tokens won't leak through HTTP referrer headers when users navigate to external sites.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-900 mb-2">Reduced Attack Surface</h5>
                  <p className="text-yellow-800">
                    Client-side only processing means fewer opportunities for token interception.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Challenges & Solutions */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-slate-800">Challenges & How We Solved Them</h2>
          </div>

          <div className="grid gap-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-yellow-900 mb-4">Key Implementation Challenges</h3>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Challenge: Token Lifecycle Management</h4>
                  <p className="text-yellow-800 text-sm mb-3">
                    Managing token expiration, refresh, and secure storage across mobile and web contexts.
                  </p>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-green-800 text-sm">
                      <strong>Solution:</strong> Implemented automatic token refresh with fallback authentication
                      and secure token storage using mobile platform keychain services.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Challenge: Cross-Platform Consistency</h4>
                  <p className="text-yellow-800 text-sm mb-3">
                    Ensuring identical behavior between iOS and Android WebView implementations.
                  </p>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-green-800 text-sm">
                      <strong>Solution:</strong> Created platform-agnostic communication layer and comprehensive
                      testing suite covering both platforms with automated verification.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Challenge: User Experience Continuity</h4>
                  <p className="text-yellow-800 text-sm mb-3">
                    Maintaining native app feel while embedding web content with different UI paradigms.
                  </p>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-green-800 text-sm">
                      <strong>Solution:</strong> Developed custom CSS injection and UI adaptation layer
                      to match native app styling and behavior patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={fadeInUp} className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to explore the technical foundation?</h2>
              <p className="text-green-100 mb-4">
                Let's dive into the tools and architecture that make this integration possible.
              </p>
            </div>
            <ArrowRight className="w-8 h-8 text-green-200" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-sm text-green-100">
              <strong>Up Next:</strong> Tools & Architecture Overview (10 minutes)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}