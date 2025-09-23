import { Router, Request, Response } from "express";
import { KEYCLOAK_ISSUER, KEYCLOAK_CLIENT_ID } from "../config.js";
import type { HealthResponse } from "../types/auth.js";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  const response: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    keycloak_issuer: KEYCLOAK_ISSUER,
    client_id: KEYCLOAK_CLIENT_ID,
  };
  
  res.json(response);
});

export default router;
