import { Router } from "express";

import * as cardController from "../controllers/card.controller";
import validate from "../middleware/validate";
import { createCardSchema } from "../schemas/card.schema";

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

export default router;