import { Request, Response, NextFunction } from "express";
import * as cardService from "../services/card.service";
import { successResponse } from "../utils/response";

export const createCard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const card = await cardService.createCard(req.body);

        return successResponse(
            res,
            201,
            "Card created successfully.",
            card
        );
    } catch (error) {
        next(error);
    }
};

export const getBoard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const board = await cardService.getBoard();

        return successResponse(
            res,
            200,
            "Board fetched successfully.",
            board
        );
    } catch (error) {
        next(error);
    }
};