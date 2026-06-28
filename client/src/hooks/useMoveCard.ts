import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveCard } from "@/api/card";

export const useMoveCard = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: moveCard,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

        },

    });

};