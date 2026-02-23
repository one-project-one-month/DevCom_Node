import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { HTTP_STATUS } from "../../common/constants";

export class CommentController {
  constructor() {}

  createComment = asyncHandler(async (req: Request, res: Response) => {
    /**
     * TODO: Implement create comment functionality
     * 
     * Requirements:
     * - Get postId from req.params.postId
     * - Validate request body (comment_message, optional parent_comment_id)
     * - Check if user is authenticated (req.user)
     * - Verify post exists
     * - If parent_comment_id provided, verify parent comment exists
     * - Create comment in database with post and author references
     * - Return created comment with populated author
     * - Handle errors appropriately
     */
    
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: {},
    });
  });

  getComment = asyncHandler(async (req: Request, res: Response) => {
    /**
     * TODO: Implement get single comment functionality
     * 
     * Requirements:
     * - Get comment ID from req.params.id
     * - Fetch comment from database by ID
     * - Populate author and post
     * - Return comment data
     * - Handle case when comment not found
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });

  updateComment = asyncHandler(async (req: Request, res: Response) => {
    /**
     * TODO: Implement update comment functionality
     * 
     * Requirements:
     * - Get comment ID from req.params.id
     * - Validate request body (comment_message)
     * - Check if user is authenticated (req.user)
     * - Verify comment exists and user is the author
     * - Update comment in database
     * - Return updated comment
     * - Handle authorization errors
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });

  deleteComment = asyncHandler(async (req: Request, res: Response) => {
    /**
     * TODO: Implement delete comment functionality
     * 
     * Requirements:
     * - Get comment ID from req.params.id
     * - Check if user is authenticated (req.user)
     * - Verify comment exists and user is the author
     * - Delete comment from database
     * - Return success message
     * - Handle authorization errors
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });

  getCommentsByPost = asyncHandler(async (req: Request, res: Response) => {
    /**
     * TODO: Implement get comments by post functionality
     * 
     * Requirements:
     * - Get postId from req.params.postId
     * - Verify post exists
     * - Fetch all comments for the post from database
     * - Populate author for each comment
     * - Sort by createdAt (newest first)
     * - Return comments array
     * - Handle nested comments structure if needed
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });
}
