# React Native WebView Integration Workshop - Presentation Script

## Section 2: Tools & Architecture Overview (10 min) 9:30–9:40

---

### Opening Transition (1 minute)

"Now that we've seen our specific loyalty app integration approach, let's zoom out and look at the broader architecture and tools that make this entire solution possible. Understanding these foundational elements will help you implement similar solutions in your own projects.

I want to show you the complete ecosystem we've built – from the monorepo structure that keeps everything organized, to the identity management system that handles security, to the architectural decisions that enable scalability."

### Monorepo Setup with pnpm and Turborepo (2.5 minutes)

"Let's start with our development infrastructure. We've organized this entire workshop as a **monorepo using pnpm and Turborepo**, and this isn't just for convenience – it's a strategic architectural decision that brings significant benefits to WebView integration projects.

**Here's why this matters for WebView development specifically:**

First, **unified dependency management**. When you're building WebView integrations, you often have shared types, utilities, and authentication logic between your mobile app and your web applications. With pnpm workspaces, we can share packages like:

- Common TypeScript interfaces for API responses
- Shared authentication utilities
- Common styling themes and components
- Validation schemas that work in both environments

Second, **coordinated development**. In traditional setups, your mobile team and web team might be working in separate repositories, making it difficult to test integrations. With our monorepo, you can:

- Run the mobile app and web app simultaneously with a single command
- Make changes to both sides of the WebView integration in one commit
- Ensure version compatibility across all applications

**Turborepo adds intelligent build orchestration** on top of this. It understands the dependencies between our packages and can:

- Build only what's changed since your last commit
- Run tests in parallel across multiple applications
- Cache build results to speed up development

For example, in our workshop setup, when you run `pnpm dev`, Turborepo automatically starts:

- The React Native development server
- The Next.js web applications
- The Keycloak development instance
- All supporting services

This means you can see your WebView integrations working end-to-end immediately, without complex setup procedures."

### Custom Keycloak Instance and Configuration (3 minutes)

"At the heart of our authentication strategy is a **custom Keycloak instance running on a private server**. Keycloak is an open-source identity and access management solution, but let me explain why we chose it specifically for WebView integrations and how we've configured it.

**Why Keycloak for WebView Authentication?**

Traditional mobile authentication often relies on proprietary SDKs or simple JWT tokens. But WebView integrations have unique requirements:

- You need seamless authentication between native and web contexts
- You often integrate with existing enterprise identity systems
- You need fine-grained permissions for different web applications
- You must handle token exchange securely

Keycloak solves all of these challenges because it's designed as a **complete identity broker**.

**Our Keycloak Configuration Strategy:**

**Clients, Roles, and Realms** – Let me break down how we structure this:

A **Realm** in Keycloak is like a tenant – a completely isolated authentication domain. We typically have:

- `development` realm for our workshop and testing
- `staging` realm for pre-production testing
- `production` realm for live applications

Within each realm, we define **Clients**. Each client represents an application that needs authentication:

- `mobile-app` client for our React Native application
- `device-dashboard` client for our web dashboard
- `loyalty-portal` client for the external loyalty application

**Roles** define what users can do:

- `device:read` – can view device information
- `device:control` – can control device settings
- `admin` – full administrative access

**Here's the powerful part for WebView integrations:** We can configure different clients with different permission scopes, and then use Keycloak's token exchange feature to create limited-scope tokens specifically for WebView contexts.

**User Isolation Per Client** – This is crucial for multi-tenant applications. Each client can have its own user base, or we can share users across clients with different role mappings. For example:

- A user might have `admin` role in the mobile app
- But only `device:read` role when accessing the web dashboard through WebView
- This principle of least privilege enhances security

**Public vs. Confidential Clients** – This distinction is critical for mobile apps:

**Public Clients** (like our React Native app):

- Cannot securely store client secrets
- Use PKCE (Proof Key for Code Exchange) for security
- Rely on redirect URI validation for security

**Confidential Clients** (like our backend services):

- Can securely store client secrets
- Used for server-to-server communication
- Handle token exchange operations

This brings us to **why PKCE is essential for mobile authentication**..."

### PKCE and Mobile Security (2.5 minutes)

"**PKCE – Proof Key for Code Exchange** – is not just a nice-to-have feature; it's absolutely essential for secure mobile authentication, especially when using WebViews.

**The Problem PKCE Solves:**

Traditional OAuth flows were designed for server-side applications that can securely store client secrets. But mobile apps face unique challenges:

- They can't securely store secrets (anyone can decompile the app)
- Network requests can be intercepted on mobile networks
- Custom URL schemes can be hijacked by malicious apps

**How PKCE Works in Our WebView Flow:**

When our mobile app initiates authentication:

1. **Code Verifier Generation**: The app generates a random string (code verifier)
2. **Code Challenge Creation**: It creates a SHA256 hash of the verifier (code challenge)
3. **Authorization Request**: Sends the code challenge to Keycloak (not the verifier)
4. **User Authentication**: User authenticates in WebView
5. **Authorization Code**: Keycloak returns an authorization code
6. **Token Exchange**: App exchanges the code + original verifier for tokens

**The Security Benefit**: Even if someone intercepts the authorization code, they can't exchange it for tokens without the original code verifier, which never left the mobile device.

**In WebView Context**, this is particularly important because:

- The authentication happens in a web context (potentially less secure)
- Network traffic might be monitored
- The WebView itself might be compromised

**Our Implementation Benefits:**

With this architecture, we achieve several key benefits:

1. **Security Without Compromise**: Full OAuth security without storing client secrets
2. **Seamless User Experience**: Users authenticate once, access multiple applications
3. **Granular Permissions**: Different scopes for different WebView contexts
4. **Enterprise Integration**: Works with existing corporate identity systems
5. **Scalability**: Easy to add new applications and services
6. **Auditability**: Complete authentication and authorization logs
7. **Flexibility**: Support for multiple authentication flows (social login, SAML, etc.)
