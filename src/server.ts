import app from "./app";
import { connectDatabase } from "./config/database";
import { logger } from "./config/logger";
import { config } from "./config/env";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    const PORT = config.port;
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📝 Environment: ${config.nodeEnv}`);
      logger.info(`🌐 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err: Error) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});

startServer();
