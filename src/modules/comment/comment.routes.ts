import { Router } from "express";
import { CommentController } from "./comment.controller";
import { authenticate } from "../../common/middleware/auth.middleware";

const router = Router();
const commentController = new CommentController();

router.post("/post/:postId", authenticate, commentController.createComment);
router.get("/post/:postId", commentController.getCommentsByPost);
router.get("/:id", commentController.getComment);
router.put("/:id", authenticate, commentController.updateComment);
router.delete("/:id", authenticate, commentController.deleteComment);

export default router;
