import prisma from "../config/prisma";
import { Board, Card } from "../types/card";
import { CreateCardInput, UpdateCardInput } from "../schemas/card.schema";
import NotFoundError from "../errors/NotFoundError";
import { getIO } from "../sockets/socket";
import { SOCKET_EVENTS } from "../constants/socket-events";

export const createCard = async (data: CreateCardInput) => {
    // Find the last card in the selected column
    const lastCardInColumn = await prisma.card.findFirst({
        where: {
            status: data.status,
        },
        orderBy: {
            position: "desc",
        },
    });

    // Calculate the next position
    const nextPosition = (lastCardInColumn?.position ?? -1) + 1;

    // Create the new card
    const card = await prisma.card.create({
        data: {
            title: data.title,
            status: data.status,
            position: nextPosition,
        },
    });

    getIO().emit(SOCKET_EVENTS.CARD_CREATED, { card });

    return card;
};

export const getBoard = async (): Promise<Board<Card>> => {
    const cards = await prisma.card.findMany({
        orderBy: [
            {
                position: "asc",
            },
        ],
    });

    const board = cards.reduce<Board<Card>>(
        (board, card) => {
            board[card.status].push(card);
            return board;
        },
        {
            TODO: [],
            IN_PROGRESS: [],
            DONE: [],
        }
    );

    return board;
};

export const updateCard = async (
    id: string,
    data: UpdateCardInput
) => {

    const existingCard = await prisma.card.findUnique({
        where: {
            id,
        },
    });

    if (!existingCard) {
        throw new NotFoundError("Card not found.");
    }

    const updatedCard = await prisma.card.update({
        where: {
            id,
        },
        data: {
            title: data.title ?? existingCard.title,
            status: data.status ?? existingCard.status,
            position: data.position ?? existingCard.position,
        },
    });

    getIO().emit(SOCKET_EVENTS.CARD_UPDATED, {
        card: updatedCard,
    });

    return updatedCard;
};

export const deleteCard = async (id: string) => {

    await prisma.$transaction(async (tx) => {

        const existingCard = await tx.card.findUnique({
            where: { id },
        });

        if (!existingCard) {
            throw new NotFoundError("Card not found.");
        }

        await tx.card.delete({
            where: { id },
        });

        await tx.card.updateMany({
            where: {
                status: existingCard.status,
                position: {
                    gt: existingCard.position,
                },
            },
            data: {
                position: {
                    decrement: 1,
                },
            },
        });

    });

    // Transaction has committed here ✅
    getIO().emit(SOCKET_EVENTS.CARD_DELETED, { id });

    return null;
};