import "dotenv/config";
import express from "express";
import { connectDB } from "./config/dbconfig";
import { responseHandler } from "./middleware/responseHandler";

import { validatorHandler } from "./middleware/validatorHamdler";
import authRoutes from "./routes/auth";
<<<<<<< HEAD
import entrepriseRoutes from "./routes/entreprise";
=======
import { responseHandler } from "./middleware/responseHandler";
>>>>>>> fe5a1613140a62e6749b39add7d325d4d3c127cb

const app = express();
connectDB();
app.use(express.json());
app.use(responseHandler)
app.use(validatorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/entreprises", entrepriseRoutes);

export default app;
