import { Router } from "express";
import { TagController } from "./tag.controller";
import { authenticate, authorize } from "../../common/middleware/auth.middleware";
import { USER_ROLES } from "../../common/constants";

const router = Router();
const tagController = new TagController();

router.get("/", tagController.getAllTags);
router.get("/:id", tagController.getTagById);
router.delete("/:id", authenticate, authorize(USER_ROLES.ADMIN), tagController.deleteTag);

export default router;
