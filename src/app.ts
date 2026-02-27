import express, { Application } from "express";
import routes from "./routes";  // Import routes
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config/env";
import { errorHandler } from "./common/middleware/errorHandler";

const app: Application = express();

// Use middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limit middleware for API routes
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);  // Apply limiter to all `/api` routes

// Mount the routes (with `/api` prefix)
app.use("/api", routes);

// 404 handler for routes not found
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler middleware
app.use(errorHandler);

export default app;