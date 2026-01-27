import mongoose, { Schema, Document, Model } from "mongoose";
import { IStudent } from "../types/student.types";

export interface IStudentDocument extends IStudent, Document { }

const studentSchema = new Schema<IStudentDocument>(
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
        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [0, "Age must be a positive number"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
        strict: "throw",
        collection: "students",
    }
);

export const Student: Model<IStudentDocument> = mongoose.models.Student || mongoose.model<IStudentDocument>("Student", studentSchema);
