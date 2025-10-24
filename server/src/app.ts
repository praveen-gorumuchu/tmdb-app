import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movie.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", movieRoutes);

app.get("/", (_, res) => res.send("Server running ✅"));

export default app;
