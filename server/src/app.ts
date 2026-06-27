import express from "express";
import cors from "cors";

import cardRoutes from "./routes/card.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/cards", cardRoutes);

export default app;