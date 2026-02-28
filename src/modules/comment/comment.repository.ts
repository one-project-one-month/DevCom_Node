import { CommentModel, IComment } from "../../database/models/Comment.model";
import { CreateCommentDTO } from "./comment.dto";

export class CommentRepository {
  async create(comment: CreateCommentDTO): Promise<IComment> {
    return CommentModel.create(comment);
  }

  async findById(id: string): Promise<IComment | null> {
    return CommentModel.findById(id).populate("author").populate("post");
  }

  async findPostId(postId: string): Promise<IComment[]> {
    return CommentModel.find({ post: postId, parent_comment_id: null })
      .populate("author")
      .populate("post")
      .sort({ createdAt: -1 });
  }
  async findRootsByPostId(postId: string, limit: number = 10, skip: number = 0): Promise<IComment[]> {
    return CommentModel.find({ post: postId, parent_comment_id: null })
      .populate("author")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async findChildrenByParentIds(parentIds: string[]): Promise<IComment[]> {
    return CommentModel.find({ parent_comment_id: { $in: parentIds } })
      .populate("author")
      .sort({ createdAt: 1 });
  }
  
  async updateById(
    id: string,
    comment_message: string
  ): Promise<IComment | null> {
    return CommentModel.findByIdAndUpdate(id, { comment_message }, {
      new: true,
      runValidators: true,
    }).populate("author").populate("post");
  }

  async deleteById(id: string): Promise<IComment | null> {
    return CommentModel.findByIdAndDelete(id, { new: true }).populate("author").populate("post");
  }
}
