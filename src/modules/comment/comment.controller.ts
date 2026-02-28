import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { HTTP_STATUS } from "../../common/constants";
import { CommentService } from "./comment.service";
import { AppError } from "../../common/exceptions/AppError";
import {
  createCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
} from "./comment.dto";
import { IComment } from "@/database/models/Comment.model";

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  createComment = asyncHandler(async (req: Request, res: Response) => {
    /**
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

    if (!req.user) {
      throw new AppError("User not authenticated", HTTP_STATUS.UNAUTHORIZED);
    }

    const comment: IComment = await this.commentService.createComment(
      createCommentSchema.parse({
        post: req.params.postId,
        author: req.user.id,
        comment_message: req.body.comment_message,
        parent_comment_id: req.body.parent_comment_id,
      }),
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: comment,
      message: "Comment created successfully",
    });
  });

  getComment = asyncHandler(async (req: Request, res: Response) => {
    /**
     * Requirements:
     * - Get comment ID from req.params.id
     * - Fetch comment from database by ID
     * - Populate author and post
     * - Return comment data
     * - Handle case when comment not found
     */

    const comment = await this.commentService.getComment(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: comment,
    });
  });

  updateComment = asyncHandler(async (req: Request, res: Response) => {
    /**
     * Requirements:
     * - Get comment ID from req.params.id
     * - Validate request body (comment_message)
     * - Check if user is authenticated (req.user)
     * - Verify comment exists and user is the author
     * - Update comment in database
     * - Return updated comment
     * - Handle authorization errors
     */

    if (!req.user) {
      throw new AppError("User not authenticated", HTTP_STATUS.UNAUTHORIZED);
    }

    if (!req.body.comment_message) {
      throw new AppError(
        "Comment message is required",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const comment: IComment = await this.commentService.updateComment(
      updateCommentSchema.parse({
        id: req.params.id,
        comment_message: req.body.comment_message,
        author: req.user?.id,
      }),
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: comment,
    });
  });

  deleteComment = asyncHandler(async (req: Request, res: Response) => {
    /**
     * Requirements:
     * - Get comment ID from req.params.id
     * - Check if user is authenticated (req.user)
     * - Verify comment exists and user is the author
     * - Delete comment from database
     * - Return success message
     * - Handle authorization errors
     */
    if (!req.user) {
      throw new AppError("User not authenticated", HTTP_STATUS.UNAUTHORIZED);
    }

    await this.commentService.deleteComment(
      deleteCommentSchema.parse({
        id: req.params.id,
        author: req.user?.id,
      }),
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
    });
  });

  getCommentsByPost = asyncHandler(async (req: Request, res: Response) => {
    /**
     * Requirements:
     * - Get postId from req.params.postId
     * - Verify post exists
     * - Fetch all comments for the post from database
     * - Populate author for each comment
     * - Sort by createdAt (newest first)
     * - Return comments array
     * - Handle nested comments structure if needed
     */

    const comments = await this.commentService.getCommentsByPost(
      req.params.postId,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: comments,
    });
  });
}
