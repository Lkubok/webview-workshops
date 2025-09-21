import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

interface KeycloakToken {
  resource_access?: {
    [client: string]: {
      roles: string[];
    };
  };
}

/**
 * React hook to check if a Keycloak JWT token contains a specific role
 * for a specific client.
 *
 * @param token JWT token string
 * @param client Client ID in Keycloak
 * @param role Role to check
 */
export const useHasRole = (
  token: string | undefined,
  client: string,
  role: string
) => {
  return useMemo(() => {
    if (!token) return false;
    try {
      const decoded = jwtDecode<KeycloakToken>(token);
      return decoded.resource_access?.[client]?.roles.includes(role) ?? false;
    } catch (e) {
      console.error("Invalid token:", e);
      return false;
    }
  }, [token, client, role]);
};
