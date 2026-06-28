import prisma from "../config/prisma";
import NotFoundError from "../errors/NotFoundError";

import { MoveCardInput } from "../schemas/board.schema";
import { Card, CardStatus } from "../types/card";
import { clampPosition, getLastPosition, getMaxInsertPosition, shiftDestinationColumn, shiftPositionsDown, shiftPositionsUp, shiftSourceColumn } from "../utils/board.utils";

export const moveWithinColumn = async (
    card: Card,
    requestedPosition: number
): Promise<Card> => {

    const lastPosition = await getLastPosition(
        card.status
    );

    const targetPosition = clampPosition(
        requestedPosition,
        lastPosition
    );

    if (card.position === targetPosition) {
        return card;
    }

    return prisma.$transaction(async (tx) => {

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

        return tx.card.update({

            where: {

                id: card.id,

            },

            data: {

                position: targetPosition,

            },

        });

    });

};

export const moveAcrossColumns = async (
    card: Card,
    targetStatus: CardStatus,
    requestedPosition: number
): Promise<Card> => {

    const maxInsertPosition =
        await getMaxInsertPosition(targetStatus);

    const targetPosition = clampPosition(
        requestedPosition,
        maxInsertPosition
    );

    return prisma.$transaction(async (tx) => {

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

        return tx.card.update({

            where: {

                id: card.id,

            },

            data: {

                status: targetStatus,

                position: targetPosition,

            },

        });

    });

};

export const moveCard = async (
    id: string,
    data: MoveCardInput
) => {

    // Step 1
    // Find existing card
    const existingCard = await prisma.card.findUnique({
        where: {
            id,
        },
    });

    if (!existingCard) {
        throw new NotFoundError("Card not found.");
    }

    // Step 2
    // Determine movement type
    const isSameColumn =
        existingCard.status === data.status;

    // Step 3
    // Execute transaction
    if (isSameColumn) {
        return moveWithinColumn(
            existingCard,
            data.position
        );
    }

    return moveAcrossColumns(
        existingCard,
        data.status,
        data.position
    );

};
