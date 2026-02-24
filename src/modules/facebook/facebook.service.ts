import axios from "axios";
import { config } from "../../config/env";
import { logger } from "../../config/logger";

export interface FacebookPostData {
  message: string;
  link?: string;
  access_token: string;
}

export interface FacebookPostResponse {
  id: string;
  post_id?: string;
}

export class FacebookService {
  private graphApiUrl: string;
  private pageId: string;
  private accessToken: string;

  constructor() {
    this.graphApiUrl = "https://graph.facebook.com/v21.0";
    this.pageId = config.facebook.pageId;
    this.accessToken = config.facebook.pageAccessToken;
  }

  async createPagePost(data: {
    title: string;
    content: string;
    imageUrl?: string;
    link?: string;
  }): Promise<FacebookPostResponse | null> {
    try {
      if (!this.pageId || !this.accessToken) {
        logger.warn("Facebook Page ID or Access Token not configured. Skipping Facebook post.");
        return null;
      }

      const message = this.formatPostMessage(data.title, data.content);
      const postData: any = {
        message,
        access_token: this.accessToken,
      };

      if (data.imageUrl) {
        postData.url = data.imageUrl;
      } else if (data.link) {
        postData.link = data.link;
      }

      const response = await axios.post(
        `${this.graphApiUrl}/${this.pageId}/feed`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      logger.info(`Successfully posted to Facebook Page. Post ID: ${response.data.id}`);
      return {
        id: response.data.id,
        post_id: response.data.post_id,
      };
    } catch (error: any) {
      logger.error("Error posting to Facebook:", {
        message: error.response?.data?.error?.message || error.message,
        code: error.response?.data?.error?.code,
        type: error.response?.data?.error?.type,
      });
      
      return null;
    }
  }

  async createPagePostWithPhoto(data: {
    title: string;
    content: string;
    imageUrl: string;
    caption?: string;
  }): Promise<FacebookPostResponse | null> {
    try {
      if (!this.pageId || !this.accessToken) {
        logger.warn("Facebook Page ID or Access Token not configured. Skipping Facebook post.");
        return null;
      }

      const message = this.formatPostMessage(data.title, data.content);
      
      const photoData = {
        url: data.imageUrl,
        caption: data.caption || message,
        access_token: this.accessToken,
      };

      const response = await axios.post(
        `${this.graphApiUrl}/${this.pageId}/photos`,
        photoData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      logger.info(`Successfully posted photo to Facebook Page. Post ID: ${response.data.post_id}`);
      return {
        id: response.data.id,
        post_id: response.data.post_id,
      };
    } catch (error: any) {
      logger.error("Error posting photo to Facebook:", {
        message: error.response?.data?.error?.message || error.message,
        code: error.response?.data?.error?.code,
        type: error.response?.data?.error?.type,
      });
      
      return null;
    }
  }

  private formatPostMessage(title: string, content: string): string {
    return `${title}\n\n${content}`;
  }

  async getPageAccessToken(): Promise<string | null> {
    try {
      if (!config.facebook.appId || !config.facebook.appSecret) {
        logger.warn("Facebook App ID or App Secret not configured.");
        return null;
      }

      const response = await axios.get(`${this.graphApiUrl}/oauth/access_token`, {
        params: {
          client_id: config.facebook.appId,
          client_secret: config.facebook.appSecret,
          grant_type: "client_credentials",
        },
      });

      return response.data.access_token;
    } catch (error: any) {
      logger.error("Error getting Facebook access token:", error.message);
      return null;
    }
  }
}
