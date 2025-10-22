import "dotenv/config";
import express from "express";
import { connectDB } from "./config/dbconfig";

import authRoutes from "./routes/auth";

const app = express();
connectDB();
app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
