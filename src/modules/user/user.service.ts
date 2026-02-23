import { AppError } from "../../common/exceptions/AppError";
import { HTTP_STATUS } from "../../common/constants";
import { UserRepository } from "./user.repository";
import { UpdateProfileDTO } from "./user.dto";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateProfile(userId: string, data: UpdateProfileDTO) {
    const user = await this.userRepository.updateById(userId, data);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      updatedAt: user.updatedAt,
    };
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    }));
  }
}
