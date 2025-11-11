import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Response {
      success: (
        data?: string | object | null,
        message?: string,
        status?: number
      ) => Response;
      error: (message?: string, status?: number, error?: unknown) => Response;
    }
  }
}

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (
    data: string | object | null = {},
    message: string = "Success",
    status: number = 200
  ) => {
    return res.status(status).json({
      success: true,
      message,
      data,
      error: null,
    });
  };

  res.error = (
    message: string = "Error",
    status: number = 500,
    error: unknown = null
  ) => {
    const errorResponse: string | object | null = error
      ? typeof error === "object" && error !== null
        ? error instanceof Error
          ? error.toString()
          : error
        : error.toString()
      : null;

    return res.status(status).json({
      success: false,
      message,
      data: null,
      error: errorResponse,
    });
  };

  next();
};
