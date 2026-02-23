import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { HTTP_STATUS } from "../../common/constants";

export class TagController {
  constructor() {}

  getAllTags = asyncHandler(async (_req: Request, res: Response) => {
    /**
     * TODO: Implement get all tags functionality
     * 
     * Requirements:
     * - Fetch all tags from database
     * - Sort tags alphabetically by name
     * - Return tags array with id, name, and timestamps
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });

  getTagById = asyncHandler(async (_req: Request, res: Response) => {
    /**
     * TODO: Implement get single tag functionality
     * 
     * Requirements:
     * - Get tag ID from req.params.id
     * - Fetch tag from database by ID
     * - Return tag data
     * - Handle case when tag not found
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });

  deleteTag = asyncHandler(async (_req: Request, res: Response) => {
    /**
     * TODO: Implement delete tag functionality
     * 
     * Requirements:
     * - Get tag ID from req.params.id
     * - Verify tag exists
     * - Delete tag from database
     * - Return success message
     * - Note: Only admin can delete tags (authorization handled in routes)
     */
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {},
    });
  });
}
