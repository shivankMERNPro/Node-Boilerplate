import { Request, Response } from "express";
import {
    createStudentService,
    getAllStudentsService,
    getStudentByIdService,
    updateStudentService,
    deleteStudentService,
} from "../services/student.service";

import { sendResponse } from "../utils/sendResponse";

export const createStudentController = async (req: Request, res: Response) => {
    try {
        const result = await createStudentService(req.body);
        return sendResponse(res, result.code, result);
    } catch (error: any) {
        return sendResponse(res, 500, error.message);
    }
};

export const getAllStudentsController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await getAllStudentsService(page, limit);
        return sendResponse(res, result.code, result);
    } catch (error: any) {
        return sendResponse(res, 500, error.message);
    }
};

export const getStudentByIdController = async (req: Request, res: Response) => {
    try {
        const result = await getStudentByIdService(req.params.id as string);
        return sendResponse(res, result.code, result);
    } catch (error: any) {
        return sendResponse(res, 500, error.message);
    }
};

export const updateStudentController = async (req: Request, res: Response) => {
    try {
        const result = await updateStudentService(req.params.id as string, req.body);
        return sendResponse(res, result.code, result);
    } catch (error: any) {
        return sendResponse(res, 500, error.message);
    }
};

export const deleteStudentController = async (req: Request, res: Response) => {
    try {
        const result = await deleteStudentService(req.params.id as string);
        return sendResponse(res, result.code, result);
    } catch (error: any) {
        return sendResponse(res, 500, error.message);
    }
};
