// import "reflect-metadata";
import express, {NextFunction} from "express";

import { DbConfig } from "./infrastructure/configuration/DbConfig.js";
import {UserRoutes} from "./infrastructure/routes/UserRoutes";
import {Error} from "mongoose";
const PORT = process.env.PORT || 7777;

const app = express();
app.use(express.json());

const userRoutes = new UserRoutes();
app.use(userRoutes.getRouter());

// @ts-ignore
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error("Unhandled error:", err);
    // @ts-ignore
    res.status(500).json({ message: "Internal Server Error" });
});

DbConfig.setupDatabase()
    .then(() => {
        console.log("✅ Database connection successful");
        app.listen(PORT, () => {
            console.log(`🚀🚀🚀 Server started on port ${PORT} 🚀🚀🚀`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err);
    });



