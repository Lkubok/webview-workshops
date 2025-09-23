import PresentationLayout from '../components/PresentationLayout'
import CodeBlock from '../components/CodeBlock'
import { Package, Server, Shield, Users, Database, Zap } from 'lucide-react'

export default function ArchitecturePage() {
  const monorepoCode = `// pnpm workspace configuration
{
  "name": "webview-workshops",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test"
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}

// Shared packages across mobile and web
packages/
├── shared-types/     # Common TypeScript interfaces
├── auth-utils/       # Authentication utilities
├── theme/           # Common styling and components
└── validation/      # Shared validation schemas`

  const keycloakCode = `// Keycloak Client Configuration
const keycloakConfig = {
  // Realm: Complete authentication domain
  realm: 'vaillant-production',

  // Clients: Applications that need authentication
  clients: {
    'mobile-app': {
      type: 'public',           // No client secret
      pkce: true,              // Required for mobile
      redirectUris: ['app://auth/callback']
    },
    'device-dashboard': {
      type: 'confidential',     // Has client secret
      directAccess: true,       // Server-to-server
      tokenExchange: true       // Can exchange tokens
    }
  },

  // Roles: What users can do
  roles: {
    'device:read': 'View device information',
    'device:control': 'Control device settings',
    'admin': 'Full administrative access'
  }
};`

  const pkceCode = `// PKCE Flow Implementation
const initiatePKCEFlow = () => {
  // 1. Generate code verifier (random string)
  const codeVerifier = generateRandomString(128);

  // 2. Create code challenge (SHA256 hash)
  const codeChallenge = sha256(codeVerifier);

  // 3. Store verifier securely on device
  await SecureStore.setItemAsync('code_verifier', codeVerifier);

  // 4. Start auth with challenge (NOT verifier)
  const authUrl = \`\${keycloakUrl}/auth?\` +
    \`response_type=code&\` +
    \`client_id=mobile-app&\` +
    \`code_challenge=\${codeChallenge}&\` +
    \`code_challenge_method=S256\`;

  // 5. Open WebView for authentication
  webViewRef.current.source = { uri: authUrl };
};

// When auth code returns, exchange with verifier
const exchangeCodeForTokens = async (authCode) => {
  const codeVerifier = await SecureStore.getItemAsync('code_verifier');

  const tokens = await fetch(tokenEndpoint, {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      code_verifier: codeVerifier,  // Original verifier proves identity
      client_id: 'mobile-app'
    })
  });

  return tokens.json();
};`

  return (
    <PresentationLayout
      title="Tools & Architecture Overview"
      subtitle="Development infrastructure and security patterns • 10 minutes"
    >
      <div className="space-y-8">
        {/* Monorepo Benefits */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="mr-3 text-primary-600" size={24} />
            Monorepo Setup with pnpm and Turborepo
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-medium text-blue-900 mb-3">Why Monorepo for WebView Development?</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Unified Dependency Management</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Shared TypeScript interfaces for API responses</li>
                  <li>• Common authentication utilities</li>
                  <li>• Unified styling themes and components</li>
                  <li>• Validation schemas for both environments</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-blue-800 mb-2">Coordinated Development</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Run mobile and web apps simultaneously</li>
                  <li>• Test integrations in real-time</li>
                  <li>• Single commit for cross-platform changes</li>
                  <li>• Ensure version compatibility</li>
                </ul>
              </div>
            </div>
          </div>

          <CodeBlock
            code={monorepoCode}
            title="Monorepo Structure"
            language="typescript"
          />

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <h4 className="font-medium text-green-900 mb-2 flex items-center">
              <Zap className="mr-2" size={18} />
              Turborepo Intelligence
            </h4>
            <p className="text-sm text-green-700">
              <code className="bg-green-100 px-2 py-1 rounded">pnpm dev</code> automatically starts:
              React Native development server, Next.js web applications, Keycloak development instance, and all supporting services.
            </p>
          </div>
        </section>

        {/* Keycloak Configuration */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Server className="mr-3 text-primary-600" size={24} />
            Custom Keycloak Instance and Configuration
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-medium text-purple-900 mb-2 flex items-center">
                <Database className="mr-2" size={18} />
                Realms
              </h3>
              <p className="text-sm text-purple-700 mb-2">Isolated authentication domains</p>
              <ul className="text-xs text-purple-600 space-y-1">
                <li>• development</li>
                <li>• staging</li>
                <li>• production</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                <Users className="mr-2" size={18} />
                Clients
              </h3>
              <p className="text-sm text-blue-700 mb-2">Applications requiring auth</p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• mobile-app (public)</li>
                <li>• device-dashboard (confidential)</li>
                <li>• loyalty-portal (confidential)</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-900 mb-2 flex items-center">
                <Shield className="mr-2" size={18} />
                Roles
              </h3>
              <p className="text-sm text-green-700 mb-2">Permission definitions</p>
              <ul className="text-xs text-green-600 space-y-1">
                <li>• device:read</li>
                <li>• device:control</li>
                <li>• admin</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            code={keycloakCode}
            title="Keycloak Configuration Strategy"
            language="typescript"
          />

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <h3 className="font-medium text-yellow-900 mb-2">Token Exchange for WebView Integration</h3>
            <p className="text-sm text-yellow-700">
              Configure different clients with different permission scopes, then use Keycloak's token exchange
              feature to create limited-scope tokens specifically for WebView contexts.
            </p>
          </div>
        </section>

        {/* User Isolation */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Isolation and Client Security</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-3">Multi-Tenant Architecture</h3>
              <p className="text-sm text-gray-700 mb-4">
                Each client can have its own user base, or share users across clients with different role mappings.
              </p>

              <div className="bg-gray-50 p-3 rounded border">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Example: Role Isolation</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• User has <code>admin</code> role in mobile app</li>
                  <li>• Same user has only <code>device:read</code> in WebView</li>
                  <li>• Principle of least privilege enhances security</li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-3">Client Types</h3>

              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800">Public Clients (Mobile)</h4>
                  <ul className="text-xs text-blue-600 mt-1 space-y-1">
                    <li>• Cannot securely store secrets</li>
                    <li>• Use PKCE for security</li>
                    <li>• Redirect URI validation</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h4 className="text-sm font-medium text-green-800">Confidential Clients (Backend)</h4>
                  <ul className="text-xs text-green-600 mt-1 space-y-1">
                    <li>• Can store client secrets securely</li>
                    <li>• Handle token exchange operations</li>
                    <li>• Server-to-server communication</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PKCE Security */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="mr-3 text-primary-600" size={24} />
            PKCE: Essential for Mobile Authentication
          </h2>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="font-medium text-red-900 mb-3">The Problem PKCE Solves</h3>
            <p className="text-red-700 mb-4">
              Traditional OAuth flows were designed for server-side applications that can securely store client secrets.
              Mobile apps face unique security challenges.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border">
                <h4 className="text-sm font-medium text-red-800">Secret Storage</h4>
                <p className="text-xs text-red-600">Anyone can decompile mobile apps and extract embedded secrets</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="text-sm font-medium text-red-800">Network Interception</h4>
                <p className="text-xs text-red-600">Mobile network requests can be intercepted and analyzed</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="text-sm font-medium text-red-800">URL Scheme Hijacking</h4>
                <p className="text-xs text-red-600">Malicious apps can register the same URL schemes</p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={pkceCode}
            title="PKCE Flow Implementation"
            language="typescript"
          />

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
            <h3 className="font-medium text-green-900 mb-3">Security Benefits in WebView Context</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-green-800 mb-2">Authentication Security</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Authentication happens in potentially less secure web context</li>
                  <li>• Network traffic might be monitored</li>
                  <li>• WebView itself might be compromised</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-green-800 mb-2">PKCE Protection</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Code verifier never leaves mobile device</li>
                  <li>• Intercepted auth codes are useless without verifier</li>
                  <li>• Full OAuth security without client secrets</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Benefits */}
        <section className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg border border-primary-200">
          <h2 className="text-xl font-semibold text-primary-900 mb-4">Implementation Benefits</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-primary-800 mb-3">Development Benefits</h3>
              <ul className="space-y-2 text-sm text-primary-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Seamless User Experience:</strong> Users authenticate once, access multiple applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Granular Permissions:</strong> Different scopes for different WebView contexts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Enterprise Integration:</strong> Works with existing corporate identity systems</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-primary-800 mb-3">Operational Benefits</h3>
              <ul className="space-y-2 text-sm text-primary-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Scalability:</strong> Easy to add new applications and services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Auditability:</strong> Complete authentication and authorization logs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Flexibility:</strong> Support for multiple authentication flows</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PresentationLayout>
  )
}