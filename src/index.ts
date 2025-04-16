import express from "express";
import {config} from "dotenv";
import sequelize from "./database";
import routes from "./routes";
import cookieParser from 'cookie-parser';
import {checkS3Connection} from "./providers/s3.client";

config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);

const start = async() => {
    try {
        await sequelize.authenticate();
        console.log(`Connected to database`);
        await sequelize.sync();
        console.log("Models synchronized");
        await checkS3Connection();
        app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
    } catch (e){
        console.error(e);
    }
}

start();