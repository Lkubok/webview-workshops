import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const { KEYCLOAK_ISSUER, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET } =
  process.env;

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

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Auth exchange server listening on http://0.0.0.0:${port}`)
);
