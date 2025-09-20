import fetch from "node-fetch";
import {
  KEYCLOAK_ISSUER,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
} from "../config.mjs";

const buildUrl = (path) => `${KEYCLOAK_ISSUER}/protocol/openid-connect/${path}`;

export async function exchangeToken({ code, redirectUri, code_verifier }) {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("client_id", KEYCLOAK_CLIENT_ID);
  params.append("client_secret", KEYCLOAK_CLIENT_SECRET);
  if (code_verifier) params.append("code_verifier", code_verifier);

  const resp = await fetch(buildUrl("token"), {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const json = await resp.json();
  if (!resp.ok) throw new Error(JSON.stringify(json));
  return json;
}

export async function refreshToken({ refresh_token }) {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refresh_token);
  params.append("client_id", KEYCLOAK_CLIENT_ID);
  params.append("client_secret", KEYCLOAK_CLIENT_SECRET);

  const resp = await fetch(buildUrl("token"), {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const json = await resp.json();
  if (!resp.ok) throw new Error(JSON.stringify(json));
  return json;
}

export async function logoutToken({ refresh_token, access_token }) {
  const params = new URLSearchParams();
  params.append("client_id", KEYCLOAK_CLIENT_ID);
  params.append("client_secret", KEYCLOAK_CLIENT_SECRET);
  if (refresh_token) params.append("refresh_token", refresh_token);

  const resp = await fetch(buildUrl("logout"), {
    method: "POST",
    body: params,
    headers: access_token ? { Authorization: `Bearer ${access_token}` } : {},
  });

  return resp;
}

export async function getUserInfo({ access_token }) {
  const resp = await fetch(buildUrl("userinfo"), {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const json = await resp.json();
  if (!resp.ok) throw new Error(JSON.stringify(json));
  return json;
}
