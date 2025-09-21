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

## Notes

- Make sure your device/emulator can access `device-dashboard.localhost` (use the correct IP if running on a physical device).
- If you change ports or domains, update the configuration in the relevant app files.
- For Expo Go, ensure your local network is accessible and the correct redirect URIs are set.

## Troubleshooting

- If you encounter issues with authentication, check your IDM/Keycloak instance and network configuration.
- For cookie issues, ensure your `/etc/hosts` entry is correct and you are not running in incognito/private mode.

---

Happy coding!
