# Vaillant react-native-webview workshops

This repository is a monorepo (using [pnpm](https://pnpm.io/) and [turborepo](https://turbo.build/)) containing an Expo React Native app, a web dashboard, and supporting services for demonstrating advanced webview, authentication, and cookie management techniques.

## Prerequisites

Before you start, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/) (run `npm install -g pnpm`)
- [Docker](https://www.docker.com/) (for optional running Keycloak IDM locally)

## System Configuration

### /etc/hosts

Add the following entry to your `/etc/hosts` file for local domain resolution:

```
sudo vim /etc/hosts
```

and then

```
127.0.0.1 device-dashboard.localhost
```

This allows the web dashboard and embedded webview to work with local cookies and authentication.

## Installation

Clone the repository and install dependencies:

```sh
git clone git@github.com:Lkubok/webview-workshops.git
cd webview-workshops
pnpm install
```

## Running the Apps

Start all apps in parallel:

```sh
pnpm dev --parallel
```

This will start:

- The Expo React Native app (`apps/client-app`)
- The web dashboard (`apps/device-dashboard`)
- The backend server for code exchange used in expo app (`apps/server`)

## Credentials

- **Mobile App:**
  - Username: `client1`
  - Password: `test123`
- **Web Dashboard:**
  - Username: `dashboard1`
  - Password: `test123`

## Identity Management (IDM)

This project uses a custom private IDM provider hosted at:

```
https://plague.dev/idm
```

You can also run your own Keycloak instance locally for development/testing:

1. Go to the `apps/identity-provider` folder.
2. Run:
   ```sh
   docker-compose up
   ```
3. Keycloak will be available at `http://localhost:8080` (default credentials: admin/admin).
4. If you want to use local keycloak instance you need to change KEYCLOAK_ISSUER to your ip

## Workshop Exercises

This repository contains step-by-step exercises in the `exercises/` folder. Each exercise demonstrates different WebView integration patterns and features:

- **Exercise 1**: Basic WebView Setup
- **Exercise 2**: Two-Way Communication Bridge
- **Exercise 3**: Cookie Handling and Communication
- **Exercise 4**: Token exchange and update in webview
- **Exercise 5**: Navigation and State Management

### Exercise Structure

Each exercise folder contains:

- `mobile-app/`: React Native WebView component files
  - `webview-initial.tsx` - Starting point with TODOs
  - `webview-final.tsx` - Complete implementation
- `nextjs-page/`: Next.js page component files
  - `page-initial.tsx` - Starting point with TODOs
  - `page-final.tsx` - Complete implementation

### How to Use Exercise Files

To work with an exercise:

1. **Mobile App Component**: Replace the content of `apps/client-app/app/(tabs)/webview.tsx` with either:
   - `webview-initial.tsx` (to start from scratch)
   - `webview-final.tsx` (to see the complete solution)

2. **Next.js Page Component**: Replace the content of `apps/device-dashboard/app/embedded/page.tsx` with either:
   - `page-initial.tsx` (to start from scratch)
   - `page-final.tsx` (to see the complete solution)

### Exercise Branches

Each exercise is also available on separate git branches following the pattern:

- `exercise-1`
- `exercise-2`
- `exercise-3`
- `exercise-4`
- `exercise-5`

You can switch to any exercise branch to see the complete working implementation:

```sh
git checkout exercise-1
pnpm dev --parallel
```

## Notes

- Make sure your device/emulator can access `device-dashboard.localhost` (use the correct IP if running on a physical device).
- If you change ports or domains, update the configuration in the relevant app files.
- For Expo Go, ensure your local network is accessible and the correct redirect URIs are set.

## Troubleshooting

- If you encounter issues with authentication, check your IDM/Keycloak instance and network configuration.
- For cookie issues, ensure your `/etc/hosts` entry is correct and you are not running in incognito/private mode.

---

Happy coding!
