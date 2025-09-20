import { Router } from "express";
import { KEYCLOAK_ISSUER, KEYCLOAK_CLIENT_ID } from "../config.mjs";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    keycloak_issuer: KEYCLOAK_ISSUER,
    client_id: KEYCLOAK_CLIENT_ID,
  });
});

export default router;
