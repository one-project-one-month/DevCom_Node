import { Router } from "express";
import { ReactionController } from "./reaction.controller";
import { authenticate } from "../../common/middleware/auth.middleware";

const router = Router();
const reactionController = new ReactionController();

router.post("/post/:postId", authenticate, reactionController.toggleReaction);
router.get("/post/:postId/count", reactionController.getReactionCount);
router.get("/post/:postId/check", authenticate, reactionController.checkUserReaction);

export default router;
