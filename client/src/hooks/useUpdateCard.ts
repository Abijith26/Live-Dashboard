import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCard } from "@/api/card";

export const useUpdateCard = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            title,
            version,
        }: {
            id: string;
            title: string;
            version: number;
        }) => updateCard(
            id,
            title,
            version
        ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

        },

    });

};