import { Router } from "express";

import * as cardController from "../controllers/card.controller";
import validate from "../middleware/validate";
import {
    cardIdParamsSchema,
    createCardSchema,
    updateCardSchema,
} from "../schemas/card.schema";

const router = Router();

router.post(
    "/",
    validate(createCardSchema),
    cardController.createCard
);

router.get(
    "/",
    cardController.getBoard
);

router.patch(
    "/:id",
    validate(cardIdParamsSchema, "params"),
    validate(updateCardSchema),
    cardController.updateCard
);

export default router;