export const CardStatus = [
    "TODO",
    "IN_PROGRESS",
    "DONE",
] as const;

export type CardStatus = (typeof CardStatus)[number];

export type Board<T> = Record<CardStatus, T[]>;

export interface Card {
    id: string;
    title: string;
    status: CardStatus;
    position: number;
    version: number;
    createdAt: Date;
    updatedAt: Date;
}