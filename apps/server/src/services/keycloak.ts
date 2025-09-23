import fetch from "node-fetch";
import {
  KEYCLOAK_ISSUER,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
} from "../config.js";
import type {
  TokenExchangeRequest,
  RefreshTokenRequest,
  LogoutRequest,
  UserInfoRequest,
  TokenResponse,
  UserInfo,
} from "../types/auth.js";

const buildUrl = (path: string): string => {
  if (!KEYCLOAK_ISSUER) {
    throw new Error("KEYCLOAK_ISSUER is not configured");
  }
  return `${KEYCLOAK_ISSUER}/protocol/openid-connect/${path}`;
};

const validateKeycloakConfig = (): void => {
  if (!KEYCLOAK_CLIENT_ID || !KEYCLOAK_CLIENT_SECRET) {
    throw new Error("Keycloak configuration is incomplete");
  }
};

export async function exchangeToken({
  code,
  redirectUri,
  code_verifier,
}: TokenExchangeRequest): Promise<TokenResponse> {
  validateKeycloakConfig();
  
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("client_id", KEYCLOAK_CLIENT_ID!);
  params.append("client_secret", KEYCLOAK_CLIENT_SECRET!);
  if (code_verifier) params.append("code_verifier", code_verifier);

  const resp = await fetch(buildUrl("token"), {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const json = await resp.json() as TokenResponse;
  if (!resp.ok) {
    throw new Error(`Token exchange failed: ${JSON.stringify(json)}`);
  }
  return json;
}

export async function refreshToken({
  refresh_token,
}: RefreshTokenRequest): Promise<TokenResponse> {
  validateKeycloakConfig();
  
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refresh_token);
  params.append("client_id", KEYCLOAK_CLIENT_ID!);
  params.append("client_secret", KEYCLOAK_CLIENT_SECRET!);

  const resp = await fetch(buildUrl("token"), {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const json = await resp.json() as TokenResponse;
  if (!resp.ok) {
    throw new Error(`Token refresh failed: ${JSON.stringify(json)}`);
  }
  return json;
}

export async function logoutToken({
  refresh_token,
  access_token,
}: LogoutRequest): Promise<import("node-fetch").Response> {
  validateKeycloakConfig();
  
  const params = new URLSearchParams();
  params.append("client_id", KEYCLOAK_CLIENT_ID!);
  params.append("client_secret", KEYCLOAK_CLIENT_SECRET!);
  if (refresh_token) params.append("refresh_token", refresh_token);

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (access_token) {
    headers.Authorization = `Bearer ${access_token}`;
  }

  const resp = await fetch(buildUrl("logout"), {
    method: "POST",
    body: params,
    headers,
  });

  return resp;
}

export async function getUserInfo({
  access_token,
}: UserInfoRequest): Promise<UserInfo> {
  const resp = await fetch(buildUrl("userinfo"), {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const json = await resp.json() as UserInfo;
  if (!resp.ok) {
    throw new Error(`Failed to get user info: ${JSON.stringify(json)}`);
  }
  return json;
}
