import { Request, Response, Router } from "express";
import { CreateTodoDTO, UpdateTodoDTO } from "../dtos/todo/todoDtos.js";
import { CreateRequest, RequestById, UpdateRequest } from "./types/Request/genericRequests.js";
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

todoRouter.get("/:id", async (req: RequestById, res: Response) => {
  const result = await todoController.getById(req.params.id);
  
  if (!result.success) {
    res.status(result.errorCode!).json({ error: result.error });
  } else {
    res.status(200).json(result.data);
  }
});

todoRouter.delete("/:id", async (req: RequestById, res: Response) => {
  const result = await todoController.deleteById(req.params.id);
  
  if (!result.success) {
    res.status(result.errorCode!).json({ error: result.error });
  } else {
    res.status(200).json(result.data);
  }
});

todoRouter.put("/:id", async (req: UpdateRequest<UpdateTodoDTO>, res: Response) => {
  //This is just used to pass only one parameter instead of 2 (fields to update and id)
  req.body.id = req.params.id; 

  const result = await todoController.update(req.body);
  
  if (!result.success) {
    res.status(result.errorCode!).json({ error: result.error });
  } else {
    res.status(200).json(result.data);
  }
});

export default todoRouter