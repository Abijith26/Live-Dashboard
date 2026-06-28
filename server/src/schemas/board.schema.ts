import { z } from "zod";
import { CardStatus } from "../types/card";

export const moveCardSchema = z.object({
    status: z.enum(CardStatus),

    position: z
        .number()
        .int()
        .min(0, "Position cannot be negative"),
});

export type MoveCardInput = z.infer<typeof moveCardSchema>;