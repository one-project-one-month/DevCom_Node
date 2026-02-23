import { UserModel, IUser } from "../../database/models/User.model";
import { RegisterDTO } from "./auth.dto";

export class AuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).select("+password");
  }

  async createUser(data: RegisterDTO): Promise<IUser> {
    return UserModel.create(data);
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }
}
