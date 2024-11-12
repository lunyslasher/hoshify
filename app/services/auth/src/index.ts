import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import connectToDatabase from "./database";
import routes from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `*`,
    credentials: true
}));
app.use(helmet());
app.use(routes);

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