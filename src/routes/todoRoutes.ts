import { Request, Response, Router } from "express";
import { CreateTodoDTO } from "../dtos/todo/todoDtos.js";
import { CreateRequest } from "./types/Request/genericRequests.js";
import * as todoController from "../controllers/todoController.js"

const todoRouter = Router();

todoRouter.post(
  "/",
  async (req: CreateRequest<CreateTodoDTO>, res: Response) => {
    const result = await todoController.createTodo(req.body);

    if (!result.success) {
      res
        .status(result.errorCode!)
        .json({ error: result.error });
    } else {
      res.status(200).json(result.data);
    }
  }
);

todoRouter.get("/", async (req: Request, res: Response) => {
  const result = await todoController.getAll();
  
  if (!result.success) {
    res.status(result.errorCode!).json({ error: result.error });
  } else {
    res.status(200).json(result.data);
  }
});

export default todoRouter
