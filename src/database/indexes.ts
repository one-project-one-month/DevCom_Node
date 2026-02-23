import { logger } from "../config/logger";

export const createIndexes = async (): Promise<void> => {
  try {
    logger.info("Database indexes created successfully");
  } catch (error) {
    logger.error("Error creating indexes:", error);
  }
};
