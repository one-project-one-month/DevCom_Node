import { ITag, TagModel } from "../../database/models/Tag.model";
import { TagDTO } from "./tag.dto";

export class TagRepository {
  async createTag(data: TagDTO): Promise<ITag> {
    return TagModel.create(data);
  }

  async findById(id: string): Promise<ITag | null> {
    return TagModel.findById(id);
  }

  async getAllTags(): Promise<ITag[]> {
    return TagModel.find().sort({ name: 1 }); // Sort alphabetically by name
  }

  async deleteTag(id: string): Promise<void> {
    await TagModel.findByIdAndDelete(id);
  }
}
