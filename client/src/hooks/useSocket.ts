"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/socket/socket";

export const useSocket = () => {

    const queryClient = useQueryClient();

    useEffect(() => {

        socket.on("connect", () => {

            console.log("🟢 Connected");

        });

        socket.on("disconnect", () => {

            console.log("🔴 Disconnected");

        });

        socket.on("card:created", () => {

            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

        });

        socket.on("card:updated", () => {

            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

        });

        socket.on("card:deleted", () => {

            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

        });

        socket.on("board:changed", () => {

            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

        });

        return () => {

            socket.off();

        };

    }, [queryClient]);

};