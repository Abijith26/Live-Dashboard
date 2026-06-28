import { Router } from "express";

import * as cardController from "../controllers/card.controller";
import * as boardController from "../controllers/board.controller";
import validate from "../middleware/validate";
import {
    cardIdParamsSchema,
    createCardSchema,
    updateCardSchema,
} from "../schemas/card.schema";
import { moveCardSchema } from "../schemas/board.schema";

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

router.delete(
    "/:id",
    validate(cardIdParamsSchema, "params"),
    cardController.deleteCard
);

router.patch(
    "/:id/move",
    validate(cardIdParamsSchema, "params"),
    validate(moveCardSchema),
    boardController.moveCard
);

export default router;