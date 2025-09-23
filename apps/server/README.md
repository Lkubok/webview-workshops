# Auth Exchange Server

A TypeScript-based authentication server for handling Keycloak OAuth2 flows.

## Features

- Full TypeScript implementation with strict type checking
- Keycloak integration for OAuth2/OIDC flows
- Token exchange, refresh, and user info endpoints
- Health check endpoint for monitoring
- Docker support for easy deployment
- Graceful shutdown handling
- Production-ready error handling

## Development

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Keycloak configuration

# Start development server
pnpm dev

# Type checking
pnpm run check-types

# Build for production
pnpm run build

# Start production server
pnpm start
```

## Environment Variables

- `KEYCLOAK_ISSUER`: Keycloak realm URL
- `KEYCLOAK_CLIENT_ID`: OAuth2 client ID
- `KEYCLOAK_CLIENT_SECRET`: OAuth2 client secret
- `PORT`: Server port (default: 4000)

## Docker Deployment

```bash
# Build Docker image
docker build -t auth-server .

# Run container
docker run -p 4000:4000 --env-file .env auth-server
```

## API Endpoints

- `GET /health` - Health check
- `POST /auth/exchange` - Exchange authorization code for tokens
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/userinfo` - Get user information

## Production Deployment

This server is now ready for deployment to any Node.js hosting platform:

- **Docker**: Use the included Dockerfile
- **Railway/Render**: Push to Git and deploy
- **AWS/Google Cloud**: Deploy as a container or serverless function
- **VPS**: Clone repository, build, and run with PM2

The server includes:
- Proper error handling and logging
- Health checks for monitoring
- Graceful shutdown signals
- Security best practices
- TypeScript for type safety
