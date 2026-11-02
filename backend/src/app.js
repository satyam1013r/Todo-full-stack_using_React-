import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js";
import todoRouter from "./routes/todo.routes.js";
import cors from "cors"

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

const app=express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth",authRouter)  // auth routes
app.use("/api/todos",todoRouter)      // task routes

export default app;