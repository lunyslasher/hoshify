import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectToDatabase = async () => {
    if (!MONGO_URI) {
        throw new Error("MongoDB URI is missing");
    }
    await mongoose.connect(MONGO_URI, {});
    console.log("Connected to Database");
}

export default connectToDatabase;