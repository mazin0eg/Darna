import express from "express";
import "dotenv/config";
import { connectDB } from "./config/dbconfig";


const app = express();

app.get("/", (req, res) => { 
    res.json({message : "hello "})
 })
connectDB()

export default app