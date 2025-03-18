import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import { indexRouter } from "./routes/index.routes";

import "./config/db";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", indexRouter);
app.use("*", (_, res) => res.status(404).json({ message: "Route not found" }));

// Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
