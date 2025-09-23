import PresentationLayout from '../components/PresentationLayout'
import CodeBlock from '../components/CodeBlock'
import { Target, ArrowRight, Shield, Zap, TrendingUp, CheckCircle } from 'lucide-react'

export default function ApproachPage() {
  const authFlowCode = `// Mobile App Authentication Flow
const authenticateUser = async () => {
  // Step 1: User authenticates with Keycloak
  const fullToken = await authenticateWithKeycloak();

  // Step 2: Exchange for scoped token
  const scopedToken = await exchangeToken({
    originalToken: fullToken,
    audience: 'loyalty-portal',
    scope: 'loyalty:read loyalty:write profile:read'
  });

  // Step 3: Navigate WebView with hash params
  const loyaltyUrl = \`https://loyalty-portal.com#access_token=\${scopedToken}&expires_in=3600\`;
  webViewRef.current.source = { uri: loyaltyUrl };
};`

  const communicationCode = `// Two-Way Communication Example
// WebView to Native: Request camera for receipt scanning
window.ReactNativeWebView.postMessage(JSON.stringify({
  type: 'scan_receipt',
  context: 'loyalty_points'
}));

// Native to WebView: Send scanned receipt data
webViewRef.current.injectJavaScript(\`
  window.receiveScannedReceipt(\${JSON.stringify(receiptData)});
\`);`

  return (
    <PresentationLayout
      title="Our Approach to Loyalty App Integration"
      subtitle="Real-world production implementation • 10 minutes"
    >
      <div className="space-y-8">
        {/* Business Challenge */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="mr-3 text-primary-600" size={24} />
            The Business Challenge
          </h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 className="font-medium text-yellow-900 mb-3">Two Separate Applications, One User Experience</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-blue-900 mb-2">myVaillant Pro</h4>
                <p className="text-sm text-gray-700">Main service app for heating system management, user accounts, device control</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-green-900 mb-2">Loyalty Portal</h4>
                <p className="text-sm text-gray-700">Specialized web application for reward programs, point tracking, exclusive offers</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <h3 className="font-medium text-red-900 mb-2">Traditional Approaches Failed</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-red-800">❌ Native Rebuild</h4>
                <ul className="text-red-700 mt-1 space-y-1">
                  <li>• 6+ months development</li>
                  <li>• Duplicate business logic</li>
                  <li>• Slower feature parity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-800">❌ External Browser</h4>
                <ul className="text-red-700 mt-1 space-y-1">
                  <li>• Jarring context switch</li>
                  <li>• Re-authentication required</li>
                  <li>• Poor user retention</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-800">❌ Simple WebView</h4>
                <ul className="text-red-700 mt-1 space-y-1">
                  <li>• Security token exposure</li>
                  <li>• No native integration</li>
                  <li>• Authentication mismatches</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="mr-3 text-green-600" size={24} />
            Our Solution: Intelligent WebView Integration
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-900 mb-2 flex items-center">
                  <Shield className="mr-2" size={18} />
                  Security-First Design
                </h3>
                <p className="text-green-700 text-sm">
                  Token exchange with limited scopes, hash parameter security,
                  and automatic expiration reduces security exposure.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Zap className="mr-2" size={18} />
                  Seamless Experience
                </h3>
                <p className="text-blue-700 text-sm">
                  Single sign-on across applications with native-feeling
                  integration and real-time communication.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-medium text-purple-900 mb-2 flex items-center">
                  <TrendingUp className="mr-2" size={18} />
                  Development Velocity
                </h3>
                <p className="text-purple-700 text-sm">
                  Web team maintains development speed while adding
                  mobile access without platform duplication.
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 className="font-medium text-orange-900 mb-2">Production Metrics</h3>
                <div className="text-sm space-y-1">
                  <p className="text-orange-700">• 99.7% auth success rate</p>
                  <p className="text-orange-700">• 85% session completion</p>
                  <p className="text-orange-700">• 67% fewer support tickets</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication Flow */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <ArrowRight className="mr-3 text-primary-600" size={24} />
            Authentication Flow: Mobile App → WebView → Keycloak
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border mb-6">
            <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-2 mx-auto">1</div>
                <p>User in Mobile App</p>
              </div>
              <ArrowRight className="text-gray-400" size={20} />
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-2 mx-auto">2</div>
                <p>Token Exchange</p>
              </div>
              <ArrowRight className="text-gray-400" size={20} />
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mb-2 mx-auto">3</div>
                <p>WebView Navigation</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium text-blue-900">Full Token (Mobile)</h4>
                <p className="text-gray-600">All permissions, 24hr expiry</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium text-green-900">Scoped Token</h4>
                <p className="text-gray-600">Limited permissions, 1hr expiry</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium text-purple-900">Hash Parameters</h4>
                <p className="text-gray-600">Client-side only, not logged</p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={authFlowCode}
            title="Authentication Flow Implementation"
            language="typescript"
          />
        </section>

        {/* Key Challenges Solved */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Challenges and Solutions</h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-3">Challenge 1: Hash Parameter Security vs Usability</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-red-700 mb-2">Problem</h4>
                  <p className="text-sm text-gray-600">Hash parameters are secure but can be lost during navigation</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2">Solution</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Automatic token refresh via WebView communication</li>
                    <li>• Memory-only storage, never localStorage</li>
                    <li>• PostMessage for secure token updates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-3">Challenge 2: Two-Way Communication</h3>
              <CodeBlock
                code={communicationCode}
                title="Bidirectional Communication Pattern"
                language="typescript"
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-3">Challenge 3: Performance with Token Exchange</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Parallel Processing</h4>
                  <p className="text-gray-600">Start token exchange and WebView initialization simultaneously</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Optimistic Loading</h4>
                  <p className="text-gray-600">Show placeholder content while token exchange completes</p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-700 mb-2">Smart Caching</h4>
                  <p className="text-gray-600">Cache exchanged tokens for repeated access with proper expiration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Hash Params are Secure */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-900 mb-4">Hash Params for Token Passing</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-red-800 mb-2">❌ Query Parameters</h3>
              <p className="text-sm text-red-700 mb-2">
                <code className="bg-red-100 px-2 py-1 rounded">?access_token=abc123</code>
              </p>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Sent to server in HTTP requests</li>
                <li>• Logged in server access logs</li>
                <li>• Visible in referrer headers</li>
                <li>• Cached by proxies and CDNs</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-green-800 mb-2">✅ Hash Parameters</h3>
              <p className="text-sm text-green-700 mb-2">
                <code className="bg-green-100 px-2 py-1 rounded">#access_token=abc123</code>
              </p>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Never sent to server</li>
                <li>• Not logged anywhere</li>
                <li>• Client-side JavaScript only</li>
                <li>• Reduces token leakage risk</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PresentationLayout>
  )
}