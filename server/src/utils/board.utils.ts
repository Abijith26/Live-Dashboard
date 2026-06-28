import prisma from "../config/prisma";
import { CardStatus } from "../types/card";
import type { Prisma } from "@prisma/client";

export const shiftPositionsUp = async (
    tx: Prisma.TransactionClient,
    status: CardStatus,
    from: number,
    to: number
) => {

    await tx.card.updateMany({

        where: {

            status,

            position: {

                gte: to,

                lt: from,

            },

        },

        data: {

            position: {

                increment: 1,

            },

        },

    });

};

export const shiftPositionsDown = async (
    tx: Prisma.TransactionClient,
    status: CardStatus,
    from: number,
    to: number
) => {

    await tx.card.updateMany({

        where: {

            status,

            position: {

                gt: from,

                lte: to,

            },

        },

        data: {

            position: {

                decrement: 1,

            },

        },

    });

};

export const shiftSourceColumn = async (
    tx: Prisma.TransactionClient,
    status: CardStatus,
    position: number
) => {

    await tx.card.updateMany({

        where: {

            status,

            position: {

                gt: position,

            },

        },

        data: {

            position: {

                decrement: 1,

            },

        },

    });

};

export const shiftDestinationColumn = async (
    tx: Prisma.TransactionClient,
    status: CardStatus,
    position: number
) => {

    await tx.card.updateMany({

        where: {

            status,

            position: {

                gte: position,

            },

        },

        data: {

            position: {

                increment: 1,

            },

        },

    });

};

export const clampPosition = (
    requestedPosition: number,
    lastPosition: number
): number => {

    return Math.max(
        0,
        Math.min(requestedPosition, lastPosition)
    );

};

export const getLastPosition = async (
    status: CardStatus
): Promise<number> => {

    const count = await prisma.card.count({
        where: {
            status,
        },
    });

    return Math.max(0, count - 1);

};

export const getMaxInsertPosition = async (
    status: CardStatus
): Promise<number> => {

    return prisma.card.count({
        where: {
            status,
        },
    });

};