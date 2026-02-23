import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import postRoutes from "../modules/post/post.routes";
import commentRoutes from "../modules/comment/comment.routes";
import reactionRoutes from "../modules/reaction/reaction.routes";
import feedRoutes from "../modules/feed/feed.routes";
import tagRoutes from "../modules/tag/tag.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/reactions", reactionRoutes);
router.use("/feed", feedRoutes);
router.use("/tags", tagRoutes);

export default router;
