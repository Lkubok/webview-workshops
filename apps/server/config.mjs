import "dotenv/config";

export const {
  KEYCLOAK_ISSUER,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  PORT = 4000,
} = process.env;

console.log("Server configuration:");
console.log("KEYCLOAK_ISSUER:", KEYCLOAK_ISSUER);
console.log("KEYCLOAK_CLIENT_ID:", KEYCLOAK_CLIENT_ID);
console.log(
  "KEYCLOAK_CLIENT_SECRET:",
  KEYCLOAK_CLIENT_SECRET ? "[SET]" : "[NOT SET]"
);
