import "dotenv/config";
import express from "express";
import { connectDB } from "./config/dbconfig";
import { setupSwagger } from "./config/swagger";
import { responseHandler } from "./middleware/responseHandler";
import { validatorHandler } from "./middleware/validatorHamdler";
import authRoutes from "./routes/auth";
import authProxy from "./routes/authProxy";
import entrepriseRoutes from "./routes/entreprise";
import propertyRoutes from "./routes/property";


const app = express();
connectDB();
setupSwagger(app);
app.use(express.json());
app.use(responseHandler)
app.use(validatorHandler);

app.use("/api/auth-proxy", authProxy);
app.use("/api/auth", authRoutes);
app.use("/api/entreprises", entrepriseRoutes);
app.use("/api/annonces", propertyRoutes);


export default app;
