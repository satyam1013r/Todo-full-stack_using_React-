import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js";
import todoRouter from "./routes/todo.routes.js";


const app=express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth",authRouter)  // auth routes
app.use("/api/todos",todoRouter)      // task routes

export default app;