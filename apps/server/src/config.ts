import "dotenv/config";

interface Config {
  KEYCLOAK_ISSUER: string | undefined;
  KEYCLOAK_CLIENT_ID: string | undefined;
  KEYCLOAK_CLIENT_SECRET: string | undefined;
  PORT: number;
}

export const {
  KEYCLOAK_ISSUER,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  PORT = 4000,
}: Config = process.env as any;

console.log("Server configuration:");
console.log("KEYCLOAK_ISSUER:", KEYCLOAK_ISSUER);
console.log("KEYCLOAK_CLIENT_ID:", KEYCLOAK_CLIENT_ID);
console.log(
  "KEYCLOAK_CLIENT_SECRET:",
  KEYCLOAK_CLIENT_SECRET ? "[SET]" : "[NOT SET]"
);
