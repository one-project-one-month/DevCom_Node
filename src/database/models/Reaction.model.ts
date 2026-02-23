import mongoose, { Schema, Document } from "mongoose";

export interface IReaction extends Document {
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const ReactionSchema = new Schema<IReaction>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ReactionSchema.index({ post: 1, user: 1 }, { unique: true });
ReactionSchema.index({ post: 1 });
ReactionSchema.index({ user: 1 });

export const ReactionModel = mongoose.model<IReaction>("Reaction", ReactionSchema);
