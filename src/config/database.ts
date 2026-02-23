import mongoose from "mongoose";
import { config } from "./env";
import { logger } from "./logger";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info("✅ MongoDB connected successfully");
  } catch (error) {
    logger.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info("MongoDB disconnected");
  } catch (error) {
    logger.error("Error disconnecting MongoDB:", error);
  }
};
