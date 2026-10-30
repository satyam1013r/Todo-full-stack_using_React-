import express from "express"
import * as todoController from "../controllers/todo.controller.js"
import authmiddleware from "../middleware/auth.middleware.js"

const todoRouter=express.Router()


todoRouter.post("/",authmiddleware,todoController.createTodo)
todoRouter.patch("/:id",authmiddleware,todoController.updateTodo)
todoRouter.delete("/:id",authmiddleware,todoController.deleteTodo)
todoRouter.get("/",authmiddleware,todoController.getAllTodo)
todoRouter.get("/:id",authmiddleware,todoController.getOneTodo)
export default todoRouter;