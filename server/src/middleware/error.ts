import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";
import AppError from "../errors/AppError";

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);

    if (error instanceof AppError) {
        return errorResponse(
            res,
            error.statusCode,
            error.message
        );
    }

    return errorResponse(
        res,
        500,
        "Internal Server Error."
    );
};

export default errorHandler;