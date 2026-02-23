import { Router } from "express";
import { PostController } from "./post.controller";
import { authenticate } from "../../common/middleware/auth.middleware";

const router = Router();
const postController = new PostController();

router.post("/", authenticate, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.put("/:id", authenticate, postController.updatePost);
router.delete("/:id", authenticate, postController.deletePost);

export default router;
