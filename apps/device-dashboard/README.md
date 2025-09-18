# Keycloak Workshop App

A minimal Next.js 14 application demonstrating Keycloak authentication with three protected pages.

## Features

- **Login Page**: Keycloak/OpenID Connect authentication using NextAuth.js
- **Dashboard Page**: Protected page with user welcome message and navigation
- **Embedded View Page**: WebView-optimized page for React Native integration
- **Auth Protection**: Middleware-based route protection for secure pages

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and configure your Keycloak settings:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Required environment variables:

\`\`\`env
# Keycloak Configuration
KEYCLOAK_CLIENT_ID=your-client-id
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ISSUER=https://your-keycloak-server/realms/your-realm

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
\`\`\`

### 2. Keycloak Configuration

In your Keycloak admin console:

1. **Create a new client** with these settings:
   - Client ID: `workshop-app` (or your preferred ID)
   - Client Protocol: `openid-connect`
   - Access Type: `confidential`

2. **Configure Valid Redirect URIs**:
   - `http://localhost:3000/api/auth/callback/keycloak`
   - Add your production URL when deploying

3. **Configure Web Origins**:
   - `http://localhost:3000`
   - Add your production domain when deploying

4. **Get your client secret** from the Credentials tab

5. **Set the Issuer URL**:
   - Format: `https://your-keycloak-server/realms/your-realm`
   - Example: `https://auth.example.com/realms/workshop`

### 3. Install Dependencies

\`\`\`bash
npm install next-auth
\`\`\`

### 4. Run the Application

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to test the authentication flow.

## Application Flow

1. **Home Page** (`/`) - Redirects to login or dashboard based on auth status
2. **Login Page** (`/login`) - Keycloak authentication interface
3. **Dashboard Page** (`/dashboard`) - Protected welcome page with user info
4. **Embedded View** (`/embedded`) - WebView-optimized page for mobile apps

## WebView Integration

The `/embedded` page is specifically designed for React Native WebView:

- Touch-friendly interface
- Minimal navigation
- Responsive design
- Real-time content updates
- Preserved authentication state

## Security Features

- Route-level protection via NextAuth middleware
- Automatic token refresh
- Secure session management
- Protected API routes ready for extension

## Tech Stack

- **Next.js 14** with App Router
- **NextAuth.js** for authentication
- **Keycloak** as identity provider
- **TailwindCSS** for styling
- **shadcn/ui** components
