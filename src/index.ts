import express from "express";
import {config} from "dotenv";
import sequelize from "./database";

config();

const app = express();

app.use(express.json());

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log(`Connected to database`);
        app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
    } catch (e){
        console.error(e);
    }
}

start();