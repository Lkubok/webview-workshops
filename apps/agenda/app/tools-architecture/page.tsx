"use client";

import { motion } from "framer-motion";
import {
  Settings,
  Package,
  GitBranch,
  Server,
  Users,
  Shield,
  Key,
  Lock,
  Smartphone,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Database,
  Network,
  Zap
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

export default function ToolsArchitecture() {
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
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Tools & Architecture Overview
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Duration: 10 minutes</span>
            <span className="text-slate-400">|</span>
            <span>9:30 AM - 9:40 AM</span>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore the complete technology stack and architectural decisions that power our
            WebView integration solution, from monorepo setup to secure authentication systems.
          </p>
        </motion.div>

        {/* Monorepo Setup */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Monorepo Setup with pnpm and Turborepo</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-blue-900 mb-3">Why Monorepo Architecture?</h3>
              <p className="text-blue-800 leading-relaxed">
                Our monorepo structure allows us to manage multiple related applications (React Native app,
                Next.js web apps, shared libraries) in a single repository with shared tooling,
                dependencies, and build processes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="w-6 h-6" />
                  <h4 className="font-semibold text-lg">pnpm Workspace</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-200" />
                    <span>Efficient dependency management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-200" />
                    <span>Disk space optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-200" />
                    <span>Fast installation times</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-200" />
                    <span>Strict dependency resolution</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6" />
                  <h4 className="font-semibold text-lg">Turborepo</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-200" />
                    <span>Incremental builds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-200" />
                    <span>Smart caching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-200" />
                    <span>Parallel task execution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-200" />
                    <span>Remote caching support</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h4 className="font-semibold text-slate-800 mb-3">Project Structure</h4>
              <div className="bg-slate-800 p-4 rounded-lg">
                <pre className="text-green-400 text-sm">
{`webview-workshops/
├── apps/
│   ├── client-app/          # React Native mobile app
│   ├── device-dashboard/    # Next.js web dashboard
│   ├── agenda/             # This workshop documentation
│   └── keycloak/           # Custom Keycloak configuration
├── packages/
│   ├── shared-types/       # TypeScript type definitions
│   ├── auth-utils/         # Authentication utilities
│   └── webview-bridge/     # Communication bridge library
├── exercises/              # Workshop exercise files
├── turbo.json             # Turborepo configuration
└── pnpm-workspace.yaml    # pnpm workspace configuration`}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Keycloak Setup */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Server className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">Custom Keycloak Instance</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-indigo-900 mb-3">Keycloak as Identity Provider</h3>
              <p className="text-indigo-800 leading-relaxed">
                Keycloak serves as our centralized identity and access management solution, running on a
                private server to provide secure authentication services for all our applications.
                It handles user authentication, authorization, and token management across our ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-semibold text-emerald-900">Realms</h4>
                </div>
                <p className="text-emerald-800 text-sm mb-3">
                  Isolated security domains that separate different environments and applications.
                </p>
                <ul className="text-emerald-700 text-xs space-y-1">
                  <li>• Development realm</li>
                  <li>• Production realm</li>
                  <li>• Testing realm</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Clients</h4>
                </div>
                <p className="text-blue-800 text-sm mb-3">
                  Applications that can request authentication and authorization from Keycloak.
                </p>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Service app client</li>
                  <li>• Loyalty app client</li>
                  <li>• Admin dashboard client</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Roles</h4>
                </div>
                <p className="text-purple-800 text-sm mb-3">
                  Fine-grained permissions that control access to specific features and resources.
                </p>
                <ul className="text-purple-700 text-xs space-y-1">
                  <li>• Service technician</li>
                  <li>• Loyalty member</li>
                  <li>• Admin user</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Isolation */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">User Isolation per Client</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-green-900 mb-3">Multi-Tenant Architecture</h3>
              <p className="text-green-800 leading-relaxed">
                Our system implements strict user isolation where each client (service provider)
                maintains their own user base, preventing cross-contamination of user data and
                ensuring privacy compliance across different service organizations.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Isolation Strategy
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">Client-Based Separation</h5>
                    <p className="text-sm text-green-100">
                      Each service provider gets their own client configuration with isolated user pools,
                      ensuring no data leakage between organizations.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h5 className="font-medium mb-2">Role-Based Access</h5>
                    <p className="text-sm text-green-100">
                      Users can only access resources within their assigned client scope,
                      with role-based permissions controlling feature access.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h5 className="font-semibold text-slate-800 mb-2">Client A Users</h5>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-100 p-2 rounded text-blue-800">Technician 1</div>
                    <div className="bg-blue-100 p-2 rounded text-blue-800">Technician 2</div>
                    <div className="bg-blue-100 p-2 rounded text-blue-800">Admin A</div>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h5 className="font-semibold text-slate-800 mb-2">Client B Users</h5>
                  <div className="space-y-2 text-sm">
                    <div className="bg-green-100 p-2 rounded text-green-800">Technician X</div>
                    <div className="bg-green-100 p-2 rounded text-green-800">Technician Y</div>
                    <div className="bg-green-100 p-2 rounded text-green-800">Admin B</div>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h5 className="font-semibold text-slate-800 mb-2">Client C Users</h5>
                  <div className="space-y-2 text-sm">
                    <div className="bg-purple-100 p-2 rounded text-purple-800">Technician M</div>
                    <div className="bg-purple-100 p-2 rounded text-purple-800">Technician N</div>
                    <div className="bg-purple-100 p-2 rounded text-purple-800">Admin C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Client Types & PKCE */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-slate-800">Public vs. Confidential Clients</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-red-900 mb-3">Mobile App Security Considerations</h3>
              <p className="text-red-800 leading-relaxed">
                Mobile applications are considered "public clients" in OAuth2 terminology because they
                cannot securely store client secrets. This classification requires special security
                measures to protect against token interception and replay attacks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-6 h-6 text-orange-600" />
                  <h4 className="font-semibold text-orange-900">Public Clients (Mobile Apps)</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                    <span className="text-orange-800">Cannot securely store secrets</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                    <span className="text-orange-800">Code can be reverse engineered</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-orange-800">Use PKCE for security</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-orange-800">Short-lived tokens</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Confidential Clients (Server Apps)</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-blue-800">Can securely store secrets</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-blue-800">Server-side execution</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-blue-800">Full OAuth2 flow support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-blue-800">Longer token lifetimes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <Key className="w-5 h-5" />
                PKCE (Proof Key for Code Exchange)
              </h4>
              <p className="text-yellow-800 mb-4 leading-relaxed">
                PKCE is essential for mobile authentication security. It prevents authorization code
                interception attacks by using dynamically generated challenge-response pairs.
              </p>

              <div className="grid md:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-lg border border-yellow-200">
                  <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold mb-2">1</div>
                  <h5 className="font-medium text-yellow-900 text-sm mb-1">Generate Verifier</h5>
                  <p className="text-xs text-yellow-800">Create random code verifier</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-yellow-200">
                  <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold mb-2">2</div>
                  <h5 className="font-medium text-yellow-900 text-sm mb-1">Create Challenge</h5>
                  <p className="text-xs text-yellow-800">Hash verifier to create challenge</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-yellow-200">
                  <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold mb-2">3</div>
                  <h5 className="font-medium text-yellow-900 text-sm mb-1">Send Challenge</h5>
                  <p className="text-xs text-yellow-800">Include in authorization request</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-yellow-200">
                  <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold mb-2">4</div>
                  <h5 className="font-medium text-yellow-900 text-sm mb-1">Verify Code</h5>
                  <p className="text-xs text-yellow-800">Send verifier with token request</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={fadeInUp} className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready for the technical deep dive?</h2>
              <p className="text-purple-100 mb-4">
                Now that we understand the foundation, let's explore WebView configuration and communication patterns.
              </p>
            </div>
            <ArrowRight className="w-8 h-8 text-purple-200" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-sm text-purple-100">
              <strong>Up Next:</strong> WebView Deep Dive & Communication Bridges (20 minutes)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}