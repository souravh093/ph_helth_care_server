import { Request, Response } from 'express';

const notFoundRoute = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route not found',
  });
};

export default notFoundRoute;
