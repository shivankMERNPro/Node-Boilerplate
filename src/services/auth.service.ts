import { User } from "../models/user.model";
import { IUser } from "../types/user.types";
import { hashPassword } from "../utils/hashPassword";
import { HTTP_STATUS } from "../constants/httpStatus";
import { ApiResponse } from "../types/apiResponse.type";

/**
 * Registers a new user
 * @param newUser - User data from controller
 * @returns ApiResponse<IUser>
 */
export const registerUserService = async ( newUser: IUser ): Promise<ApiResponse<IUser>> => {
  
  const { name, email, password, confirmPassword, phone, role } = newUser;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      code: HTTP_STATUS.CONFLICT,
      message: "User already exists",
      error: `User with email ${email} already exists`,
    };
  }

  // Hash passwords
  const hashedPassword = await hashPassword(password);
  const hashedConfirmPassword = await hashPassword(confirmPassword);

  // Prepare final user object
  const finalData = {
    name,
    email,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
    phone,
    role,
  };

  // Create user in DB
  const user = await User.create(finalData);

  return {
    code: HTTP_STATUS.CREATED,
    message: "User registered successfully",
    data: user,
  };
};
