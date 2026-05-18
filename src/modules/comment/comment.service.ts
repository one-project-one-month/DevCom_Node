import { CommentRepository } from "./comment.repository";
import { IComment } from "../../database/models/Comment.model";
import {
  CreateCommentDTO,
  DeleteCommentDTO,
  UpdateCommentDTO,
} from "./comment.dto";
import { IPost, PostModel } from "../../database/models/Post.model";
import { AppError } from "../../common/exceptions/AppError";

export class CommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async createComment(comment: CreateCommentDTO): Promise<IComment> {
    //Verify Post Exists
    //TODO: update this when post repository is implemented to call post repository instead of direct db query
    const postExists = await PostModel.findById(comment.post);
    if (!postExists) {
      throw new AppError("Post does not exist", 404);
    }

    // If parent_comment_id provided, verify parent comment exists
    if (comment.parent_comment_id) {
      const parentCommentExists = await this.commentRepository.findById(
        comment.parent_comment_id,
      );

      if (!parentCommentExists) {
        throw new AppError("Parent comment does not exist", 404);
      }
    }

    const createdComment = await this.commentRepository.create(comment);
    await createdComment.populate("author");
    await createdComment.populate("post");

    return this.formatComment(createdComment);
  }

  async getComment(id: string): Promise<IComment> {
    const comment: IComment | null = await this.commentRepository.findById(id);

    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    return this.formatComment(comment);
  }

  /*
   * Get Comments for a Post with Nested Replies
   * 1. Fetch Root Comments (parent_comment_id = null) for the post
   * 2. Fetch All Replies for those root comments in a single query
   * 3. Transform into Tree Structure in Memory using a Map
   * 4. Link Children to their respective parents
   *
   * Maked like this because we will probably add pagination in the future.
   * Otherwise it's hard to do pagination with these nested comments
   */
  async getCommentsByPost(postId: string): Promise<IComment[]> {
    //TODO: update this when post repository is implemented to call post repository instead of direct db query
    let postExists: IPost | null = await PostModel.findById(postId);

    if (!postExists) {
      throw new AppError("Post not found", 404);
    }

    //Get Root Comments (Top-Level)
    const roots = await this.commentRepository.findRootsByPostId(postId);
    if (roots.length === 0) return [];

    const rootIds = roots.map((root) => root._id.toString());

    //Get All Replies for these roots
    const children =
      await this.commentRepository.findChildrenByParentIds(rootIds);

    //Transform into Tree Structure using Map
    const commentMap = new Map<string, any>();
    roots.forEach((root) => {
      const formattedRoot = this.formatComment(root);
      formattedRoot.replies = [];
      commentMap.set(formattedRoot.id, formattedRoot);
    });

    //Link children to roots
    children.forEach((child) => {
      const parentId = child.parent_comment_id?.toString();
      if (parentId && commentMap.has(parentId)) {
        const formattedChild = this.formatComment(child);
        commentMap.get(parentId).replies.push(formattedChild);
      }
    });

    return Array.from(commentMap.values());
  }

  /*
   * Assumed that the only editable field is comment_message.
   */
  async updateComment(updateCommentDTO: UpdateCommentDTO): Promise<IComment> {
    let comment: IComment | null = await this.commentRepository.findById(
      updateCommentDTO.id,
    );
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    if (!comment.author.equals(updateCommentDTO.author)) {
      throw new AppError("Unauthorized to update this comment", 403);
    }
    comment = await this.commentRepository.updateById(
      updateCommentDTO.id,
      updateCommentDTO.comment_message,
    );

    if (!comment) {
      throw new AppError("Failed to update comment", 500);
    }

    return this.formatComment(comment);
  }

  async deleteComment(
    deleteCommentDTO: DeleteCommentDTO,
  ): Promise<IComment | null> {
    const comment = await this.commentRepository.findById(deleteCommentDTO.id);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    if (!comment.author.equals(deleteCommentDTO.author)) {
      throw new AppError("Unauthorized to delete this comment", 403);
    }

    const deleted = await this.commentRepository.deleteById(
      deleteCommentDTO.id,
    );
    return deleted ? this.formatComment(deleted) : null;
  }

  /**
   * Formats a comment document or object to remove internal MongoDB fields
   * and convert _id to id for the frontend.
   */
  private formatComment(comment: any): any {
    const obj = comment.toObject ? comment.toObject() : comment;

    const formatted = {
      id: obj._id?.toString() || obj.id?.toString(),
      comment_message: obj.comment_message,
      post: obj.post,
      author: obj.author,
      parent_comment_id: obj.parent_comment_id,
      replies: obj.replies || [],
    };

    // Clean up internal fields from nested objects if they exist
    if (formatted.author && typeof formatted.author === "object") {
      const authorObj = formatted.author;
      formatted.author = {
        id: authorObj._id,
        name: authorObj.name,
        email: authorObj.email,
        role: authorObj.role,
        avatar: authorObj.avatar,
      };
    }
    if (formatted.post && typeof formatted.post === "object") {
      delete formatted.post.__v;
    }

    return formatted;
  }
}
