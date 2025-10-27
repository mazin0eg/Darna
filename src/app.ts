import "dotenv/config";
import express from "express";
import { connectDB } from "./config/dbconfig";
import { responseHandler } from "./middleware/responseHandler";
import { validatorHandler } from "./middleware/validatorHamdler";
import authRoutes from "./routes/auth";
import entrepriseRoutes from "./routes/entreprise";


const app = express();
connectDB();
app.use(express.json());
app.use(responseHandler)
app.use(validatorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/entreprises", entrepriseRoutes);

export default app;
