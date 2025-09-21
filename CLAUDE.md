# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a monorepo using pnpm workspaces and Turborepo containing a React Native webview workshop demonstration with three main applications:

- **Client App** (`apps/client-app`): Expo React Native app demonstrating advanced webview, authentication, and cookie management
- **Device Dashboard** (`apps/device-dashboard`): Next.js web dashboard that works with embedded webviews
- **Server** (`apps/server`): Express.js backend for code exchange used by the Expo app

The project demonstrates webview integration patterns, OAuth authentication flows, and cookie management between native and web contexts.

## Development Commands

### Build System
- `pnpm dev` - Start all apps in development mode
- `pnpm dev --parallel` - Start all apps in parallel (faster startup)
- `pnpm build` - Build all apps for production
- `pnpm lint` - Run linting across all packages
- `pnpm check-types` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier

### Individual App Commands
- **Client App**: `expo run:ios` or `expo run:android` (after `expo prebuild`)
- **Device Dashboard**: Runs on `device-dashboard.localhost:3010` (requires `/etc/hosts` entry)
- **Server**: Simple Express server on default port

## Key Configuration Requirements

### Local Development Setup
1. Add `127.0.0.1 device-dashboard.localhost` to `/etc/hosts` for local domain resolution
2. Use provided test credentials:
   - Mobile App: `client1` / `test123`
   - Web Dashboard: `dashboard1` / `test123`

### Identity Management
- Uses custom IDM provider at `https://plague.dev/idm`
- Alternative: Local Keycloak via Docker in `apps/identity-provider`

## Package Structure

### Shared Packages
- `packages/ui` - Shared React components (Button, Card, Code)
- `packages/eslint-config` - ESLint configurations
- `packages/typescript-config` - TypeScript configurations

### Technology Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui components
- **Mobile**: Expo SDK 54, React Native, expo-auth-session, react-native-webview
- **Backend**: Express.js with CORS support
- **Build**: Turborepo, pnpm workspaces

## Development Notes

- Device Dashboard uses Next.js with Turbopack for fast development
- Client app requires prebuild step before running on devices
- Server is a simple Node.js/Express app handling OAuth code exchange
- All apps are configured to work together for webview authentication demos
