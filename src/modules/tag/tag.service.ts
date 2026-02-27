import { AppError } from "../../common/exceptions/AppError";
import { TagDTO } from "./tag.dto";
import { TagRepository } from "./tag.repository";
import { HTTP_STATUS } from "../../common/constants";

export class TagService {
  private tagRepository: TagRepository;

  constructor() {
    this.tagRepository = new TagRepository();
  }

  async createTag(data: TagDTO) {
    if (!data.name || data.name.trim() === "") {
      throw new AppError("Tag name is required", HTTP_STATUS.BAD_REQUEST);
    }
    return this.tagRepository.createTag(data);
  }

  async getAllTags() {
    return this.tagRepository.getAllTags();
  }

  async deleteTagById(id: string) {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new AppError("Tag not found", HTTP_STATUS.NOT_FOUND);
    }
    await this.tagRepository.deleteTag(id);
    return { message: "Tag deleted successfully" };
  }
}
