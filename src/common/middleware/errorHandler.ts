import { Request, Response, NextFunction } from "express";
import { AppError } from "../exceptions/AppError";
import { logger } from "../../config/logger";
import { HTTP_STATUS } from "../constants";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
    return;
  }

  // bad request (zod validation error)
  if (err instanceof ZodError) {
    res.status(400).json({
      status: 'error',
      message: err.message,
      errors: err.errors
    });
    return;
  }

  // Check if the error is a Mongoose CastError
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      status: 'error',
      message: `Invalid ID format: ${err.value} is not a valid ObjectId`,
    });
    return;
  }

  logger.error("Unhandled error:", err);

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
