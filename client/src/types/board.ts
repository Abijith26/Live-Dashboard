export type CardStatus =
    | "TODO"
    | "IN_PROGRESS"
    | "DONE";

export interface Card {
    id: string;
    title: string;
    status: CardStatus;
    position: number;
    version: number;
    createdAt: string;
    updatedAt: string;
}

export interface BoardData {
    TODO: Card[];
    IN_PROGRESS: Card[];
    DONE: Card[];
}