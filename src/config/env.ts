import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: (process.env.NODE_ENV || "development") as string,
  
  mongoUri: (process.env.MONGO_URI || "mongodb://localhost:27017/devcom") as string,
  
  jwtSecret: (process.env.JWT_SECRET || "your-secret-key-change-in-production") as string,
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN || "7d") as string,
  
  cloudinary: {
    cloudName: (process.env.CLOUDINARY_CLOUD_NAME || "") as string,
    apiKey: (process.env.CLOUDINARY_API_KEY || "") as string,
    apiSecret: (process.env.CLOUDINARY_API_SECRET || "") as string,
  },
  
  facebook: {
    appId: (process.env.FACEBOOK_APP_ID || "") as string,
    appSecret: (process.env.FACEBOOK_APP_SECRET || "") as string,
    pageId: (process.env.FACEBOOK_PAGE_ID || "") as string,
    pageAccessToken: (process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "") as string,
  },
  
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
};
