// var express = require('express') 바벨이 변환해주니까 밑에꺼로 변경
import express from "express";
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import { userRouter } from "./router"
var app = express()

const handleProfile = (req, res) => res.send(`you are my profile`)

const handleHome = (req, res) => {
    // console.log(req)
    res.send("Hello from home")
}
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())
app.use(morgan("dev"))
// "/" 접속 시 handleHome실행 
app.get("/", handleHome)

app.get("/profile", handleProfile)

app.use("/user", userRouter)
export default app;