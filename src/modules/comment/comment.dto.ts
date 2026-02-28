import { z } from "zod";

export const createCommentSchema = z.object({
  post: z.string(),
  author: z.string(),
  comment_message: z.string().min(1, "Comment message is required"),
  parent_comment_id: z.string().optional(),
});

export const updateCommentSchema = z.object({
  id: z.string(),
  comment_message: z.string().min(1, "Comment message is required"),
  author: z.string(),
});

export const deleteCommentSchema = z.object({
  id: z.string(),
  author: z.string(),
});

export type CreateCommentDTO = z.infer<typeof createCommentSchema>;
export type UpdateCommentDTO = z.infer<typeof updateCommentSchema>;
export type DeleteCommentDTO = z.infer<typeof deleteCommentSchema>;
