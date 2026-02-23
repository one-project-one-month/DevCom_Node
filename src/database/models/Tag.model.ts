import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
}

const TagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

TagSchema.index({ name: 1 });

export const TagModel = mongoose.model<ITag>("Tag", TagSchema);
