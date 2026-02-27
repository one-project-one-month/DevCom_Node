import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { HTTP_STATUS } from "../../common/constants";
import { TagService } from "./tag.service";

export class TagController {
  private tagService: TagService;
  constructor() {
    this.tagService = new TagService();
  }

  createTag = asyncHandler(async (req: Request, res: Response) => {
    console.log("Creating tag with data:", req.body);
    const result = await this.tagService.createTag(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: result,
    });
  });

  getAllTags = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.tagService.getAllTags();
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
    });
  });

  deleteTag = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const tag = await this.tagService.deleteTagById(id);
    if (!tag) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Tag not found",
      });
    }
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: tag,
    });
    return;
  });
}
