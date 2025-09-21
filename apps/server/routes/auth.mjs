import { Router } from "express";
import {
  exchangeToken,
  refreshToken,
  logoutToken,
  getUserInfo,
} from "../services/keycloak.mjs";

const router = Router();

router.post("/auth/exchange", async (req, res) => {
  const { code, redirectUri, code_verifier } = req.body;
  if (!code || !redirectUri)
    return res.status(400).json({ error: "Missing code or redirectUri" });

  try {
    const json = await exchangeToken({ code, redirectUri, code_verifier });
    res.json(json);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "X token exchange failed", details: err.message });
  }
});

router.post("/auth/refresh", async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token)
    return res.status(400).json({ error: "Missing refresh_token" });

  try {
    const json = await refreshToken({ refresh_token });
    res.json(json);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "token refresh failed", details: err.message });
  }
});

router.post("/auth/logout", async (req, res) => {
  const { refresh_token, access_token } = req.body;
  try {
    await logoutToken({ refresh_token, access_token });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: true, warning: "Server logout may have failed" });
  }
});

router.get("/auth/userinfo", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ error: "Missing or invalid authorization header" });

  const access_token = authHeader.substring(7);
  try {
    const userInfo = await getUserInfo({ access_token });
    res.json(userInfo);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to get user info", details: err.message });
  }
});

export default router;
