import { Router } from "express";
import { FeedController } from "./feed.controller";

const router = Router();
const feedController = new FeedController();

router.get("/", feedController.getGlobalFeed);

export default router;
