# Identity Provider (Keycloak)

This directory contains the Keycloak identity provider setup using Docker Compose.

## Security Setup

⚠️ **IMPORTANT**: Default admin credentials are for development only!

admin / admin

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

## remote idm

export config:

sudo systemctl stop keycloak
sudo -u keycloak /opt/keycloak/bin/kc.sh export --dir /tmp/keycloak-export --realm YOUR_REALM_NAME sudo systemctl start keycloak
docker cp realm-export.json keycloak:/tmp/
docker cp ./WorkshopRealmExport/WorkshopRealm-realm.json identity-provider-keycloak-1:/tmp/
