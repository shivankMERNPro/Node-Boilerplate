export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phone: Number,
  confirmPassword: string,
}

export type ILogin = Pick<IUser, "email" | "password">;