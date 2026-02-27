import { Router } from "express";
import { TagController } from "./tag.controller";
import {
  authenticate,
  authorize,
} from "../../common/middleware/auth.middleware";
import { USER_ROLES } from "../../common/constants";

const router = Router();
const tagController = new TagController();

router.post("/create", tagController.createTag);
router.get("/", tagController.getAllTags);
router.delete(
  "/:id",
  authenticate,
  authorize(USER_ROLES.ADMIN),
  tagController.deleteTag,
);

export default router;
