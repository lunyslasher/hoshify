import {Sequelize} from "sequelize-typescript";
import {config} from "dotenv";
config();

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOSTNAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [__dirname + '/models'],
    logging: false,
});

export default sequelize;