import { CardStatus } from "@/types/board";
import { api } from "./axios";

interface MoveCardPayload {
    id: string;
    status: CardStatus;
    position: number;
    version: number;
}

export const createCard = async (
    title: string,
    status: CardStatus
) => {

    const response = await api.post("/cards", {
        title,
        status,
    });

    return response.data.data;

};

export const deleteCard = async (id: string) => {

    await api.delete(`/cards/${id}`);

};

export const updateCard = async (
    id: string,
    title: string,
    version: number
) => {

    const response = await api.patch(
        `/cards/${id}`,
        {
            title,
            version,
        }
    );

    return response.data.data;

};

export const moveCard = async ({
    id,
    status,
    position,
    version,
}: MoveCardPayload) => {

    const response = await api.patch(
        `/cards/${id}/move`,
        {
            status,
            position,
            version,
        }
    );

    return response.data.data;

};