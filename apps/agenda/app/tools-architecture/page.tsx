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
  Smartphone,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Database,
  Network,
  Zap,
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

export default function ToolsArchitecture() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-600">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-4xl font-bold text-transparent">
              Tools & Architecture Overview
            </h1>
          </div>
          <div className="mb-4 flex items-center justify-center gap-2 text-slate-600">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Duration: 10 minutes</span>
            <span className="text-slate-400">|</span>
            <span>9:30 AM - 9:40 AM</span>
          </div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
            Explore the complete technology stack and architectural decisions
            that power our WebView integration solution, from monorepo setup to
            secure authentication systems.
          </p>
        </motion.div>

        {/* Monorepo Setup */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Package className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Monorepo Setup with pnpm and Turborepo
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-900">
                Why Monorepo Architecture?
              </h3>
              <p className="leading-relaxed text-blue-800">
                Our monorepo structure allows us to manage multiple related
                applications (React Native app, Next.js web apps, shared
                libraries) in a single repository with shared tooling,
                dependencies, and build processes.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white">
                <div className="mb-4 flex items-center gap-2">
                  <GitBranch className="h-6 w-6" />
                  <h4 className="text-lg font-semibold">pnpm Workspace</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-200" />
                    <span>Efficient dependency management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-200" />
                    <span>Disk space optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-200" />
                    <span>Fast installation times</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-200" />
                    <span>Strict dependency resolution</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 p-6 text-white">
                <div className="mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  <h4 className="text-lg font-semibold">Turborepo</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-200" />
                    <span>Incremental builds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-200" />
                    <span>Smart caching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-200" />
                    <span>Parallel task execution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-200" />
                    <span>Remote caching support</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h4 className="mb-3 font-semibold text-slate-800">
                Project Structure
              </h4>
              <div className="rounded-lg bg-slate-800 p-4">
                <pre className="text-sm text-green-400">
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
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Server className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Custom Keycloak Instance
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-indigo-900">
                Keycloak as Identity Provider
              </h3>
              <p className="leading-relaxed text-indigo-800">
                Keycloak serves as our centralized identity and access
                management solution, running on a private server to provide
                secure authentication services for all our applications. It
                handles user authentication, authorization, and token management
                across our ecosystem.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Globe className="h-6 w-6 text-emerald-600" />
                  <h4 className="font-semibold text-emerald-900">Realms</h4>
                </div>
                <p className="mb-3 text-sm text-emerald-800">
                  Isolated security domains that separate different environments
                  and applications.
                </p>
                <ul className="space-y-1 text-xs text-emerald-700">
                  <li>• Development realm</li>
                  <li>• Production realm</li>
                  <li>• Testing realm</li>
                </ul>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Clients</h4>
                </div>
                <p className="mb-3 text-sm text-blue-800">
                  Applications that can request authentication and authorization
                  from Keycloak.
                </p>
                <ul className="space-y-1 text-xs text-blue-700">
                  <li>• Service app client</li>
                  <li>• Loyalty app client</li>
                  <li>• Admin dashboard client</li>
                </ul>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Roles</h4>
                </div>
                <p className="mb-3 text-sm text-purple-800">
                  Fine-grained permissions that control access to specific
                  features and resources.
                </p>
                <ul className="space-y-1 text-xs text-purple-700">
                  <li>• Service technician</li>
                  <li>• Loyalty member</li>
                  <li>• Admin user</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Isolation */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Database className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              User Isolation per Client
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-900">
                Multi-Tenant Architecture
              </h3>
              <p className="leading-relaxed text-green-800">
                Our system implements strict user isolation where each client
                (service provider) maintains their own user base, preventing
                cross-contamination of user data and ensuring privacy compliance
                across different service organizations.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Network className="h-5 w-5" />
                  Isolation Strategy
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">
                      Client-Based Separation
                    </h5>
                    <p className="text-sm text-green-100">
                      Each service provider gets their own client configuration
                      with isolated user pools, ensuring no data leakage between
                      organizations.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h5 className="mb-2 font-medium">Role-Based Access</h5>
                    <p className="text-sm text-green-100">
                      Users can only access resources within their assigned
                      client scope, with role-based permissions controlling
                      feature access.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h5 className="mb-2 font-semibold text-slate-800">
                    Client A Users
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="rounded bg-blue-100 p-2 text-blue-800">
                      Technician 1
                    </div>
                    <div className="rounded bg-blue-100 p-2 text-blue-800">
                      Technician 2
                    </div>
                    <div className="rounded bg-blue-100 p-2 text-blue-800">
                      Admin A
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h5 className="mb-2 font-semibold text-slate-800">
                    Client B Users
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="rounded bg-green-100 p-2 text-green-800">
                      Technician X
                    </div>
                    <div className="rounded bg-green-100 p-2 text-green-800">
                      Technician Y
                    </div>
                    <div className="rounded bg-green-100 p-2 text-green-800">
                      Admin B
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h5 className="mb-2 font-semibold text-slate-800">
                    Client C Users
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="rounded bg-purple-100 p-2 text-purple-800">
                      Technician M
                    </div>
                    <div className="rounded bg-purple-100 p-2 text-purple-800">
                      Technician N
                    </div>
                    <div className="rounded bg-purple-100 p-2 text-purple-800">
                      Admin C
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Client Types & PKCE */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Public vs. Confidential Clients
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-red-900">
                Mobile App Security Considerations
              </h3>
              <p className="leading-relaxed text-red-800">
                Mobile applications are considered "public clients" in OAuth2
                terminology because they cannot securely store client secrets.
                This classification requires special security measures to
                protect against token interception and replay attacks.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Smartphone className="h-6 w-6 text-orange-600" />
                  <h4 className="font-semibold text-orange-900">
                    Public Clients (Mobile Apps)
                  </h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-orange-600" />
                    <span className="text-orange-800">
                      Cannot securely store secrets
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-orange-600" />
                    <span className="text-orange-800">
                      Code can be reverse engineered
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span className="text-orange-800">
                      Use PKCE for security
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span className="text-orange-800">Short-lived tokens</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Server className="h-6 w-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">
                    Confidential Clients (Server Apps)
                  </h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span className="text-blue-800">
                      Can securely store secrets
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span className="text-blue-800">Server-side execution</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span className="text-blue-800">
                      Full OAuth2 flow support
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span className="text-blue-800">
                      Longer token lifetimes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-yellow-900">
                <Key className="h-5 w-5" />
                PKCE (Proof Key for Code Exchange)
              </h4>
              <p className="mb-4 leading-relaxed text-yellow-800">
                PKCE is essential for mobile authentication security. It
                prevents authorization code interception attacks by using
                dynamically generated challenge-response pairs.
              </p>

              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-lg border border-yellow-200 bg-white p-3">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-600 text-xs font-bold text-white">
                    1
                  </div>
                  <h5 className="mb-1 text-sm font-medium text-yellow-900">
                    Generate Verifier
                  </h5>
                  <p className="text-xs text-yellow-800">
                    Create random code verifier
                  </p>
                </div>
                <div className="rounded-lg border border-yellow-200 bg-white p-3">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-600 text-xs font-bold text-white">
                    2
                  </div>
                  <h5 className="mb-1 text-sm font-medium text-yellow-900">
                    Create Challenge
                  </h5>
                  <p className="text-xs text-yellow-800">
                    Hash verifier to create challenge
                  </p>
                </div>
                <div className="rounded-lg border border-yellow-200 bg-white p-3">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-600 text-xs font-bold text-white">
                    3
                  </div>
                  <h5 className="mb-1 text-sm font-medium text-yellow-900">
                    Send Challenge
                  </h5>
                  <p className="text-xs text-yellow-800">
                    Include in authorization request
                  </p>
                </div>
                <div className="rounded-lg border border-yellow-200 bg-white p-3">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-600 text-xs font-bold text-white">
                    4
                  </div>
                  <h5 className="mb-1 text-sm font-medium text-yellow-900">
                    Verify Code
                  </h5>
                  <p className="text-xs text-yellow-800">
                    Send verifier with token request
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold">
                Ready for the technical deep dive?
              </h2>
              <p className="mb-4 text-purple-100">
                Now that we understand the foundation, let's explore WebView
                configuration and communication patterns.
              </p>
            </div>
            <ArrowRight className="h-8 w-8 text-purple-200" />
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-purple-100">
              <strong>Up Next:</strong> WebView Deep Dive & Communication
              Bridges (20 minutes)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
