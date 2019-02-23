// var express = require('express') 바벨이 변환해주니까 밑에꺼로 변경
import "@babel/polyfill";
import express from "express";
import morgan from "morgan"
import helmet from "helmet"
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import mongoStore from "connect-mongo";
import userRouter from "./routes/userRouter"
import videoRouter from "./routes/videoRouter"
import globalRouter from "./routes/globalRouter"
import apiRouter from "./routes/apiRouter"

import routes from "./routes";

import {
    localMiddleware
} from "./middlewares";

import "./passport";
import boardRouter from "./routes/boardRouter";

const app = express();
const CookieStore = mongoStore(session);
dotenv.config();
// const handleProfile = (req, res) => res.send(`you are my profile`)

// const handleHome = (req, res) => {
//     // console.log(req)
//     res.send("Hello from home")
// }
app.use(helmet())
app.set("view engine", "pug")
app.set("views", path.join(__dirname,"views"))
app.use("/static", express.static(path.join(__dirname,"static")))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(morgan("dev"))
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
        mongooseConnection: mongoose.connection
    })
}))
app.use(passport.initialize());
// npm i express-session
app.use(passport.session());
app.use(localMiddleware)
// mvc 변경 전 
// "/" 접속 시 handleHome실행 
// app.get("/", handleHome)

// app.get("/profile", handleProfile)

// app.use("/user", userRouter)

// 라우터 mvc 변경후 
app.use(routes.home, globalRouter)
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter)
app.use(routes.boards, boardRouter)
app.use(routes.api, apiRouter)
export default app;