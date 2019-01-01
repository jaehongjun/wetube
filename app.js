// var express = require('express') 바벨이 변환해주니까 밑에꺼로 변경
import express from "express";
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import userRouter from "./routes/userRouter"
import videoRouter from "./routes/videoRouter"
import globalRouter from "./routes/globalRouter"
import routes from "./routes";
import { localMiddleware } from "./middlewares";
var app = express()

// const handleProfile = (req, res) => res.send(`you are my profile`)

// const handleHome = (req, res) => {
//     // console.log(req)
//     res.send("Hello from home")
// }
app.use(helmet())
app.set("view engine", "pug")
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan("dev"))
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
export default app;