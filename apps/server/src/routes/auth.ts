import { Router, Request, Response } from "express";
import {
  exchangeToken,
  refreshToken,
  logoutToken,
  getUserInfo,
} from "../services/keycloak.js";
import type {
  TokenExchangeRequest,
  RefreshTokenRequest,
  LogoutRequest,
} from "../types/auth.js";

const router = Router();

router.post("/auth/exchange", async (req: Request, res: Response) => {
  const { code, redirectUri, code_verifier }: Partial<TokenExchangeRequest> = req.body;

  if (!code || !redirectUri) {
    res.status(400).json({ error: "Missing code or redirectUri" });
    return;
  }

  try {
    const json = await exchangeToken({ code, redirectUri, code_verifier });
    res.json(json);
  } catch (err) {
    console.error("Token exchange error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res
      .status(500)
      .json({ error: "Token exchange failed", details: errorMessage });
  }
});

router.post("/auth/refresh", async (req: Request, res: Response) => {
  const { refresh_token }: Partial<RefreshTokenRequest> = req.body;

  if (!refresh_token) {
    res.status(400).json({ error: "Missing refresh_token" });
    return;
  }

  try {
    const json = await refreshToken({ refresh_token });
    res.json(json);
  } catch (err) {
    console.error("Token refresh error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res
      .status(500)
      .json({ error: "Token refresh failed", details: errorMessage });
  }
});

router.post("/auth/logout", async (req: Request, res: Response) => {
  const { refresh_token, access_token }: Partial<LogoutRequest> = req.body;
  
  try {
    await logoutToken({ refresh_token, access_token });
    res.json({ success: true });
  } catch (err) {
    console.error("Logout error:", err);
    res.json({ success: true, warning: "Server logout may have failed" });
  }
});

router.get("/auth/userinfo", async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ error: "Missing or invalid authorization header" });
    return;
  }

  const access_token = authHeader.substring(7);
  
  try {
    const userInfo = await getUserInfo({ access_token });
    res.json(userInfo);
  } catch (err) {
    console.error("User info error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res
      .status(500)
      .json({ error: "Failed to get user info", details: errorMessage });
  }
});

export default router;
