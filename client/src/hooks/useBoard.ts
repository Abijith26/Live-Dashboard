import { useQuery } from "@tanstack/react-query";
import { getBoard } from "@/api/board";

export const useBoard = () => {

    return useQuery({

        queryKey: ["board"],

        queryFn: getBoard,

    });

};