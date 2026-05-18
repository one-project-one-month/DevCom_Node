import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  comment_message: string;
  post: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  parent_comment_id?: mongoose.Types.ObjectId;
  replies?: IComment[];
}

const CommentSchema = new Schema<IComment>(
  {
    comment_message: {
      type: String,
      required: [true, "Comment message is required"],
      trim: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parent_comment_id: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.index({ post: 1, createdAt: -1 });
CommentSchema.index({ parent_comment_id: 1 });
CommentSchema.index({ author: 1 });

export const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);
