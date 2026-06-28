import { api } from "./axios";
import { BoardData } from "@/types/board";

export const getBoard = async () => {
    const response = await api.get("/cards");

    return response.data.data as BoardData;
};