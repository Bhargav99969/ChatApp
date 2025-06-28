import express from "express";
import cookiePareser from "cookie-parser"

import dotenv, { config } from "dotenv";
import moongose from "mongoose";
import router from "./routes/auth.routes.js";
import connectDb from "./config/db.connect.js";
import cors from "cors"
import router1 from "./routes/message.route1.js";
import { app,server } from "./config/socket.js";


dotenv.config();
app.use(express.json());
app.use(cookiePareser())
app.use(cors(
  {
    origin:"https://chatapp-7ftn.onrender.com",
    credentials:true
  }
))

const port = process.env.PORT || 3000;
const uri = process.env.MONGO;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", router);
app.use("/api/message", router1);

server.listen(port, () => {
  console.log(`listening on ${port}`);

  connectDb();
});
