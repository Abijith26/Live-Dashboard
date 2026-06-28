import { z } from "zod";
import { CardStatus } from "../types/card";

export const cardIdParamsSchema = z.object({
    id: z.string().cuid(),
});

export type CardIdParams = z.infer<typeof cardIdParamsSchema>;

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

export const updateCardSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(1, "Title is required")
            .max(255, "Title cannot exceed 255 characters")
            .optional(),

        status: z.enum(CardStatus).optional(),

        position: z
            .number()
            .int()
            .min(0, "Position cannot be negative")
            .optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field must be provided.",
        }
    );

export type UpdateCardInput = z.infer<typeof updateCardSchema>;