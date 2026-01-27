import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "../types/user.types";

// Extend Document for TypeScript + Mongoose
export interface IUserDocument extends IUser, Document {}

// Define schema
const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    confirmPassword : {
      type : String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type:Number,
      minLength:[10, "Minimum 10 digits required" ],
      maxLength: [10, "Maximum 10 digits"]
    }
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
    versionKey: false, // Removes __v field
    strict: "throw", // ❌ Throws error for extra fields
    collection: "users", // Explicit collection name
  }
);


// Reuse model if already created, otherwise create
export const User: Model<IUserDocument> = mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);

