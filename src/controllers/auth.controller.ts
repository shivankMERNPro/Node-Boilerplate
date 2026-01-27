import { Request, Response } from "express";
import { registerUserService } from "../services/auth.service";
import { sendResponse } from "../utils/sendResponse";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const result = await registerUserService(req.body);
    return sendResponse(res, result.code, result);
    
  } catch (error: any) {
    return sendResponse(res, 500, error.message);
  }
};
