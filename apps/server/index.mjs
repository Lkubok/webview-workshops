import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const { KEYCLOAK_ISSUER, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET } =
  process.env;

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Token exchange endpoint (your existing code)
app.post("/auth/exchange", async (req, res) => {
  const { code, redirectUri, code_verifier } = req.body;
  if (!code || !redirectUri)
    return res.status(400).json({ error: "Missing code or redirectUri" });

  try {
    const tokenUrl = `${KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("client_id", KEYCLOAK_CLIENT_ID);
    params.append("client_secret", KEYCLOAK_CLIENT_SECRET);
    if (code_verifier) params.append("code_verifier", code_verifier);

    const resp = await fetch(tokenUrl, {
      method: "POST",
      body: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const json = await resp.json();
    if (!resp.ok)
      return res
        .status(500)
        .json({ error: "token exchange failed", details: json });

    // return the token response directly to the mobile client (dev). In production you might create your own session.
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error", details: err.message });
  }
});

// Refresh token endpoint
app.post("/auth/refresh", async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token)
    return res.status(400).json({ error: "Missing refresh_token" });

  try {
    const tokenUrl = `${KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refresh_token);
    params.append("client_id", KEYCLOAK_CLIENT_ID);
    params.append("client_secret", KEYCLOAK_CLIENT_SECRET);

    const resp = await fetch(tokenUrl, {
      method: "POST",
      body: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const json = await resp.json();
    if (!resp.ok)
      return res
        .status(500)
        .json({ error: "token refresh failed", details: json });

    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error", details: err.message });
  }
});

// Logout endpoint
app.post("/auth/logout", async (req, res) => {
  const { refresh_token, access_token } = req.body;

  try {
    const logoutUrl = `${KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
    const params = new URLSearchParams();
    params.append("client_id", KEYCLOAK_CLIENT_ID);
    params.append("client_secret", KEYCLOAK_CLIENT_SECRET);
    if (refresh_token) params.append("refresh_token", refresh_token);

    const resp = await fetch(logoutUrl, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      },
    });

    // Keycloak logout might return 204 or other success codes
    if (resp.ok || resp.status === 204) {
      res.json({ success: true, message: "Logged out successfully" });
    } else {
      const json = await resp.json().catch(() => ({}));
      res.status(500).json({ error: "logout failed", details: json });
    }
  } catch (err) {
    console.error(err);
    // Don't fail logout on server errors - client should still clear local tokens
    res.json({
      success: true,
      message: "Local logout completed",
      warning: "Server logout may have failed",
    });
  }
});

// Get user info endpoint (optional - you can call Keycloak directly from client)
app.get("/auth/userinfo", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid authorization header" });
  }

  const accessToken = authHeader.substring(7);

  try {
    const userinfoUrl = `${KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`;
    const resp = await fetch(userinfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!resp.ok) {
      const json = await resp.json().catch(() => ({}));
      return res
        .status(resp.status)
        .json({ error: "Failed to get user info", details: json });
    }

    const userInfo = await resp.json();
    res.json(userInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error", details: err.message });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Auth exchange server listening on http://0.0.0.0:${port}`)
);
