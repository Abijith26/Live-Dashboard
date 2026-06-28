import { NextFunction, Request, Response } from "express";

import * as boardService from "../services/board.service";

import { MoveCardInput } from "../schemas/board.schema";

import { successResponse } from "../utils/response";

import {
    CardIdParams,
} from "../schemas/card.schema";

export const moveCard = async (
    req: Request<CardIdParams, unknown, MoveCardInput>,
    res: Response,
    next: NextFunction
) => {
    try {

        const card = await boardService.moveCard(
            req.params.id,
            req.body
        );

        return successResponse(
            res,
            200,
            "Card moved successfully.",
            card
        );

    } catch (error) {

        next(error);

    }
};