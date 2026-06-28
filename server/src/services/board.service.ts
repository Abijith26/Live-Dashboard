import prisma from "../config/prisma";
import NotFoundError from "../errors/NotFoundError";
import type { Prisma } from "@prisma/client";
import { MoveCardInput } from "../schemas/board.schema";
import { Card, CardStatus } from "../types/card";
import { clampPosition, getLastPosition, getMaxInsertPosition, shiftDestinationColumn, shiftPositionsDown, shiftPositionsUp, shiftSourceColumn } from "../utils/board.utils";
import ConflictError from "../errors/ConflictError";

export const moveWithinColumn = async (
    tx: Prisma.TransactionClient,
    card: Card,
    requestedPosition: number
): Promise<number> => {

    const lastPosition = await getLastPosition(card.status);

    const targetPosition = clampPosition(
        requestedPosition,
        lastPosition
    );

    if (card.position === targetPosition) {
        return targetPosition;
    }

    if (targetPosition < card.position) {

        await shiftPositionsUp(
            tx,
            card.status,
            card.position,
            targetPosition
        );

    } else {

        await shiftPositionsDown(
            tx,
            card.status,
            card.position,
            targetPosition
        );

    }

    return targetPosition;
};

export const moveAcrossColumns = async (
    tx: Prisma.TransactionClient,
    card: Card,
    targetStatus: CardStatus,
    requestedPosition: number
): Promise<number> => {

    const maxInsertPosition =
        await getMaxInsertPosition(targetStatus);

    const targetPosition = clampPosition(
        requestedPosition,
        maxInsertPosition
    );

    await shiftSourceColumn(
        tx,
        card.status,
        card.position
    );

    await shiftDestinationColumn(
        tx,
        targetStatus,
        targetPosition
    );

    return targetPosition;
};

export const moveCard = async (
    id: string,
    data: MoveCardInput
): Promise<Card> => {

    return prisma.$transaction(async (tx) => {

        const card = await tx.card.findUnique({
            where: {
                id,
            },
        });

        if (!card) {
            throw new NotFoundError("Card not found.");
        }

        let targetPosition: number;

        if (card.status === data.status) {

            targetPosition = await moveWithinColumn(
                tx,
                card,
                data.position
            );

        } else {

            targetPosition = await moveAcrossColumns(
                tx,
                card,
                data.status,
                data.position
            );

        }

        const result = await tx.card.updateMany({

            where: {
                id: card.id,
                version: data.version,
            },

            data: {
                status: data.status,
                position: targetPosition,
                version: {
                    increment: 1,
                },
            },

        });

        if (result.count === 0) {
            throw new ConflictError(
                "This card has already been modified. Please refresh the board."
            );
        }

        return tx.card.findUniqueOrThrow({
            where: {
                id: card.id,
            },
        });

    });

};

