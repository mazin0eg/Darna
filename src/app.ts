import "dotenv/config";
import express from "express";
import { connectDB } from "./config/dbconfig";

import { validatorHandler } from "./middleware/validatorHamdler";
import authRoutes from "./routes/auth";
import { responseHandler } from "./middleware/responseHandler";

const app = express();
connectDB();
app.use(express.json());
app.use(responseHandler)
app.use(validatorHandler);

app.use("/api/auth", authRoutes);

export default app;
