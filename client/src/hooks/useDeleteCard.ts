import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "@/api/card";

export const useDeleteCard = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteCard,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

        },

    });

};