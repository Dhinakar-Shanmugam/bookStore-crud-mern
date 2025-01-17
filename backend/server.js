import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import {Book} from "./models/book.model.js"
import bookRouter from "./routes/book.routes.js"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/books",bookRouter);

app.listen(3000, () => {
    connectDB();
    console.log("Server listening on port 3000");
})