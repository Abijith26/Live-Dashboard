import express from "express";
import cors from "cors";

import cardRoutes from "./routes/card.routes";

import errorHandler from "./middleware/error";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/cards", cardRoutes);

app.use(errorHandler);

export default app;