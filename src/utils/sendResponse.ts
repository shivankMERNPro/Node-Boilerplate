import { Response } from "express";
import { ApiResponse } from "../types/apiResponse.type";
import { STATUS_MESSAGE } from "../constants/httpStatus";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  payload?: ApiResponse<T> | string | T
): Response => {
  // If payload is already an ApiResponse object
  if (payload && typeof payload === "object" && "code" in payload) {
    const success =
      typeof payload.success === "boolean"
        ? payload.success
        : statusCode >= 200 && statusCode < 300;

    const message =
      payload.message ||
      STATUS_MESSAGE[statusCode as keyof typeof STATUS_MESSAGE] ||
      (success ? "Success" : "Error");

    const response: ApiResponse<T> = {
      success,
      code: statusCode,
      message,
      error: payload.error,
      data: payload.data,
      errors: payload.errors,
    };

    return res.status(statusCode).json(response);
  }

  const isSuccess = statusCode >= 200 && statusCode < 300;

  const statusMessage =
    STATUS_MESSAGE[statusCode as keyof typeof STATUS_MESSAGE] ||
    (isSuccess ? "Success" : "Error");

  const response: ApiResponse<T> = {
    success: isSuccess,
    code: statusCode,
    message:
      typeof payload === "string" ? payload : statusMessage,
    error: !isSuccess && typeof payload === "string" ? payload : undefined,
    data: isSuccess && typeof payload !== "string" ? (payload as T) : undefined,
  };

  return res.status(statusCode).json(response);
};
