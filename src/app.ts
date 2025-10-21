import "dotenv/config";
import express from "express";
import { connectDB } from "./config/dbconfig";

const app = express();
connectDB();
app.use(express.json());

app.use()

export default app;
