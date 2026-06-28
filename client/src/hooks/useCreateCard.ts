import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "@/api/card";

export const useCreateCard = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            title,
            status,
        }: {
            title: string;
            status: "TODO" | "IN_PROGRESS" | "DONE";
        }) => createCard(title, status),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

        },

    });

};