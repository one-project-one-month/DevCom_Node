import jwt from "jsonwebtoken";
import { config } from "../../config/env";
import { AppError } from "../../common/exceptions/AppError";
import { HTTP_STATUS } from "../../common/constants";
import { AuthRepository } from "./auth.repository";
import { RegisterDTO, LoginDTO } from "./auth.dto";
import { JWTPayload } from "../../common/middleware/auth.middleware";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(data: RegisterDTO) {
    const existingUser = await this.authRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("Email already exists", HTTP_STATUS.CONFLICT);
    }

    const user = await this.authRepository.createUser(data);
    const token = this.generateToken(user);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    };
  }

  async login(data: LoginDTO) {
    const user = await this.authRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    };
  }

  private generateToken(user: any): string {
    const payload: JWTPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
  }
}
