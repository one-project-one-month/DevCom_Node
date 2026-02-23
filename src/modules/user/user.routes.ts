import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticate } from "../../common/middleware/auth.middleware";

const router = Router();
const userController = new UserController();

router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);
router.get("/", authenticate, userController.getAllUsers);

export default router;
