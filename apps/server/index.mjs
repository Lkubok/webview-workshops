import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.mjs";
import healthRoutes from "./routes/health.mjs";

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use(authRoutes);
app.use(healthRoutes);

// Start server
import { PORT } from "./config.mjs";
app.listen(PORT, () =>
  console.log(`Auth exchange server listening on http://0.0.0.0:${PORT}`)
);
