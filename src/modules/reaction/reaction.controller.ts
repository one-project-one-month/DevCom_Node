import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { HTTP_STATUS } from "../../common/constants";

export class ReactionController {
  constructor() {}

  toggleReaction = asyncHandler(async (_req: Request, res: Response) => {
    /**
     * TODO: Implement toggle reaction functionality
     * 
     * Requirements:
     * - Get postId from req.params.postId
     * - Check if user is authenticated (req.user)
     * - Verify post exists
     * - Check if user already reacted to the post
     * - If reacted, remove reaction (unlike)
     * - If not reacted, create reaction (like)
     * - Return reaction status and count
     * - Ensure one user can only react once per post
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });

  getReactionCount = asyncHandler(async (_req: Request, res: Response) => {
    /**
     * TODO: Implement get reaction count functionality
     * 
     * Requirements:
     * - Get postId from req.params.postId
     * - Verify post exists
     * - Count total reactions for the post
     * - Return reaction count
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });

  checkUserReaction = asyncHandler(async (_req: Request, res: Response) => {
    /**
     * TODO: Implement check user reaction functionality
     * 
     * Requirements:
     * - Get postId from req.params.postId
     * - Check if user is authenticated (req.user)
     * - Verify post exists
     * - Check if current user has reacted to the post
     * - Return boolean indicating if user reacted
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });
}
