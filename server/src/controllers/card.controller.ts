import { Request, Response, NextFunction } from "express";
import * as cardService from "../services/card.service";
import { successResponse } from "../utils/response";
import { CardIdParams } from "../schemas/card.schema";

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

export const updateCard = async (
    req: Request<CardIdParams>,
    res: Response,
    next: NextFunction
) => {
    try {

        const card = await cardService.updateCard(
            req.params.id,
            req.body
        );

        return successResponse(
            res,
            200,
            "Card updated successfully.",
            card
        );

    } catch (error) {

        next(error);

    }
};