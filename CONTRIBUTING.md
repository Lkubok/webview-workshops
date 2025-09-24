# Contributing to Webview Workshops

## Development Setup

### Prerequisites

- Node.js >= 18
- pnpm >= 10.0.0

### Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Open VSCode with the workspace file:

   ```bash
   code webview-workshops.code-workspace
   ```

3. Install recommended VSCode extensions when prompted

### Available Scripts

From the root directory, you can run:

- `pnpm turbo build` - Build all packages and apps
- `pnpm turbo dev` - Start all apps in development mode
- `pnpm turbo lint` - Lint all packages and apps
- `pnpm turbo check-types` - Type-check all packages and apps

### Package Structure

```
.
├── apps/
│   ├── client-app/     # React Native/Expo mobile app
│   ├── server/         # Express.js API server
│   ├── presentation/   # Next.js workshop agenda app
│   └── device-dashboard/ # Next.js device management dashboard
├── packages/
│   ├── ui/             # Shared React components
│   ├── eslint-config/  # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
```

### Development Guidelines

#### Code Quality

- **ESLint**: All code must pass ESLint checks with zero warnings
- **TypeScript**: All TypeScript code must compile without errors
- **Prettier**: Code formatting is enforced via Prettier

#### Adding New Packages

1. Create package directory under `apps/` or `packages/`
2. Add `package.json` with proper workspace dependencies
3. Configure ESLint and TypeScript properly
4. Add build/lint/check-types scripts as needed

#### ESLint Configuration

- Use `@repo/eslint-config/base` for basic TypeScript projects
- Use `@repo/eslint-config/react-internal` for React components
- Use `@repo/eslint-config/next-js` for Next.js applications

#### TypeScript Configuration

- Use `@repo/typescript-config/base` for basic TypeScript projects
- Use `@repo/typescript-config/react-library` for React components
- Use `@repo/typescript-config/nextjs` for Next.js applications

### VSCode Setup

The repository includes:

- Workspace configuration for multi-root development
- Recommended extensions
- Debugger configurations
- Build tasks
- Proper ESLint and TypeScript integration

### Troubleshooting

#### ESLint Issues

If ESLint is not working properly:

1. Reload VSCode window (`Cmd/Ctrl + Shift + P` → "Developer: Reload Window")
2. Check that the ESLint extension is enabled
3. Verify workspace folders are configured correctly

#### TypeScript Issues

If TypeScript errors are not showing:

1. Ensure TypeScript extension is enabled
2. Check that `typescript.preferences.includePackageJsonAutoImports` is enabled
3. Restart TypeScript server (`Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server")

#### Build Issues

If builds are failing:

1. Run `pnpm install` to ensure dependencies are up to date
2. Clear Turbo cache: `pnpm turbo build --force`
3. Check individual package scripts are working

### Best Practices

1. **Dependencies**: Use exact versions for critical dependencies, ranges for dev tools
2. **Imports**: Prefer relative imports within packages, workspace imports between packages
3. **Types**: Always type your interfaces and function signatures
4. **Commits**: Use conventional commit messages
5. **PRs**: Ensure all checks pass before requesting review

### Performance Tips

- Use Turbo's caching effectively by ensuring proper task dependencies
- Keep package.json scripts consistent across packages
- Use TypeScript project references for faster builds
- Leverage ESLint's cache for faster linting
