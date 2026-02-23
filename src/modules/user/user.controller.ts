import { Request, Response } from "express";
import { UserService } from "./user.service";
import { updateProfileSchema } from "./user.dto";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { HTTP_STATUS } from "../../common/constants";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getProfile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("User not authenticated");
    }

    const profile = await this.userService.getProfile(req.user.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: profile,
    });
  });

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("User not authenticated");
    }

    const validatedData = updateProfileSchema.parse(req.body);
    const profile = await this.userService.updateProfile(req.user.id, validatedData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: profile,
    });
  });

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: users,
    });
  });
}
