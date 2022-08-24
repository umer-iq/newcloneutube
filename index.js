


import express from "express";

import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
 import userRoutes from "./routes/users.js";
 import videoRoutes from "./routes/videos.js";
 import commentRoutes from "./routes/comments.js";
 import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import jwt from 'express-jwt';
import path from 'path';
import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();
dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//middlewares

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//app.use(jwt({secret:process.env.JWT, algorithms:['HS256']}))

app.use(cors())

 app.use(cookieParser())
 app.use(express.json());
 app.use("/api/auth", authRoutes);
 app.use("/api/users", userRoutes);
 app.use("/api/videos", videoRoutes);
 app.use("/api/comments", commentRoutes);
app.use((err,req,res,next) =>{const status = err.status || 500;
const message = err.message || "something went wrong";
return res.status(status).json({
  success:false,
  status,message
})})
//error handler
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || "Something went wrong!";
//   return res.status(status).json({
//     success: false,
//     status,
//     message,
//   });
// });
const PORT = process.env.PORT|| 8080
//herokusetup
if(process.env.NODE_ENV==="production"){
  app.use(express.static('/vtubepk/client/build'));
  
  app.get("*",(req,res) =>{res.sendFile(path.join(__dirname +'/server/client/build/index.html'))})
}
else{
  app.get('/',(req,res) => res.send("Please set to production"))
}
app.listen(PORT, () => {
  console.log("Connected to Server");
  connect();
});

