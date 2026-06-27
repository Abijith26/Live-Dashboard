import { z } from "zod";
import { CardStatus } from "../types/card";

export const createCardSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(255, "Title cannot exceed 255 characters"),

    status: z.enum(CardStatus),
    // status: z.enum(CardStatus).default("TODO"),
});

export type CreateCardInput = z.infer<typeof createCardSchema>;