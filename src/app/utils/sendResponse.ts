import { Response } from "express";

type TMeta = {
  total?: number;
  page: number;
  limit: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta | null | undefined;
  data?: T | null | undefined;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data?.meta || null || undefined,
    data: data.data || null || undefined,
  });
};

export default sendResponse;
