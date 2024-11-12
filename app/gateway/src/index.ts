import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routes from "./routes";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(routes);
app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Gateway started on port " + PORT);
});