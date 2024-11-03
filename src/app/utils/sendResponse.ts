import { Response } from 'express';

type TMeta = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data?.meta || null,
    data: data.data,
  });
};

export default sendResponse;
