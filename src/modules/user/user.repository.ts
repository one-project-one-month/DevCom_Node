import { UserModel, IUser } from "../../database/models/User.model";
import { UpdateProfileDTO } from "./user.dto";

export class UserRepository {
  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async updateById(id: string, data: UpdateProfileDTO): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async findAll(): Promise<IUser[]> {
    return UserModel.find().select("-password");
  }
}
