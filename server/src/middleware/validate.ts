import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

type ValidationTarget = "body" | "params" | "query";

const validate =
    (schema: z.ZodObject, target: ValidationTarget = "body") =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                req[target] = schema.parse(req[target]);

                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return errorResponse(
                        res,
                        400,
                        "Validation failed.",
                        error.flatten().fieldErrors
                    );
                }

                next(error);
            }
        };

export default validate;