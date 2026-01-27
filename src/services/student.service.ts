import { Student, IStudentDocument } from "../models/student.model";
import { IStudent } from "../types/student.types";
import { HTTP_STATUS } from "../constants/httpStatus";
import { ApiResponse } from "../types/apiResponse.type";

/**
 * Create a new student
 */
export const createStudentService = async (data: IStudent): Promise<ApiResponse<IStudentDocument>> => {
    const existingStudent = await Student.findOne({ email: data.email });
    if (existingStudent) {
        return {
            code: HTTP_STATUS.CONFLICT,
            message: "Student with this email already exists",
        };
    }
    const student = await Student.create(data);
    return {
        code: HTTP_STATUS.CREATED,
        message: "Student created successfully",
        data: student,
    };
};

/**
 * Get all students with pagination
 */
export const getAllStudentsService = async (page: number = 1, limit: number = 10): Promise<ApiResponse<{ students: IStudentDocument[]; pagination: any }>> => {
    const skip = (page - 1) * limit;
    const total = await Student.countDocuments();
    const students = await Student.find().skip(skip).limit(limit);
    const totalPages = Math.ceil(total / limit);

    return {
        code: HTTP_STATUS.OK,
        message: "Students retrieved successfully",
        data: {
            students,
            pagination: {
                total,
                page,
                limit,
                totalPages,
            },
        },
    };
};

/**
 * Get student by ID
 */
export const getStudentByIdService = async (id: string): Promise<ApiResponse<IStudentDocument>> => {
    const student = await Student.findById(id);
    if (!student) {
        return {
            code: HTTP_STATUS.NOT_FOUND,
            message: "Student not found",
        };
    }
    return {
        code: HTTP_STATUS.OK,
        message: "Student retrieved successfully",
        data: student,
    };
};

/**
 * Update student information
 */
export const updateStudentService = async (id: string, data: Partial<IStudent>): Promise<ApiResponse<IStudentDocument>> => {
    const student = await Student.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!student) {
        return {
            code: HTTP_STATUS.NOT_FOUND,
            message: "Student not found",
        };
    }
    return {
        code: HTTP_STATUS.OK,
        message: "Student updated successfully",
        data: student,
    };
};

/**
 * Delete student record
 */
export const deleteStudentService = async (id: string): Promise<ApiResponse<null>> => {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
        return {
            code: HTTP_STATUS.NOT_FOUND,
            message: "Student not found",
        };
    }
    return {
        code: HTTP_STATUS.OK,
        message: "Student deleted successfully",
    };
};
