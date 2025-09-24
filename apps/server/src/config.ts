import "dotenv/config";

interface Config {
  KEYCLOAK_ISSUER: string | undefined;
  KEYCLOAK_CLIENT_ID: string | undefined;
  KEYCLOAK_CLIENT_SECRET: string | undefined;
  PORT: number;
}

export const KEYCLOAK_ISSUER: string | undefined = process.env.KEYCLOAK_ISSUER;
export const KEYCLOAK_CLIENT_ID: string | undefined =
  process.env.KEYCLOAK_CLIENT_ID;
export const KEYCLOAK_CLIENT_SECRET: string | undefined =
  process.env.KEYCLOAK_CLIENT_SECRET;
export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 4000;

console.log("Server configuration:");
console.log("KEYCLOAK_ISSUER:", KEYCLOAK_ISSUER);
console.log("KEYCLOAK_CLIENT_ID:", KEYCLOAK_CLIENT_ID);
console.log(
  "KEYCLOAK_CLIENT_SECRET:",
  KEYCLOAK_CLIENT_SECRET ? "[SET]" : "[NOT SET]"
);
