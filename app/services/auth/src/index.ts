import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const start = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log("Auth service running on port", PORT);
        });
    } catch (error) {
        console.error(error);
    }
}

start();