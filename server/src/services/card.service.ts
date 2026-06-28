import prisma from "../config/prisma";
import { Board, Card } from "../types/card";
import { CreateCardInput, UpdateCardInput } from "../schemas/card.schema";
import NotFoundError from "../errors/NotFoundError";

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

    return updatedCard;
};