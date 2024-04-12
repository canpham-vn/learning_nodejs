import express, { Express } from "express";
import dotenv from "dotenv";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server listening on port " + port);
});

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.yovabgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
