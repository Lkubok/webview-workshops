# Identity Provider (Keycloak)

This directory contains the Keycloak identity provider setup using Docker Compose.

## Security Setup

⚠️ **IMPORTANT**: Default admin credentials are for development only!

### Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with secure credentials:
```env
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=your-secure-password-here  # Change this!
```

🔐 **Security Notes**:
- Never use default passwords in production
- Environment files are excluded from git via `.gitignore`
- Use strong, unique passwords for admin accounts
- Rotate admin passwords regularly

## Running Keycloak

```bash
# Start Keycloak with environment variables
docker-compose up -d

# View logs
docker-compose logs -f keycloak

# Stop Keycloak
docker-compose down
```

## Access

- **Admin Console**: http://localhost:8080/admin
- **Admin Credentials**: Set via environment variables (.env file)
