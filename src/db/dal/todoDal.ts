import { HydratedDocument } from "mongoose";
import { CreateTodoDTO } from "../../dtos/todo/todoDtos.js";
import { ActionResult } from "../../types/ActionResult.js";
import { Result } from "../../types/Result.js";
import { ITodo, Todo } from "../models/Todo.js";

export const createTodo = async (payload: CreateTodoDTO): Promise<Result<HydratedDocument<ITodo> | null>> => {
  
  const result: Result<HydratedDocument<ITodo> | null> = {
    success: true,
    data: null,
  };

  const newTodo = new Todo({...payload});

  const validationError = newTodo.validateSync();

  if (validationError) {
    result.success = false;
    result.error = "Invalid Todo payload";
    result.errorCode = 400;
    return result;
  }

  try {
    result.data = await Todo.create({ ...payload });
  } catch (error) {
    console.log(error);
    result.success = false;
    result.error = "An error ocurred while creating the Todo entity";
    result.errorCode = 500;
  }

  return result;
};

export const getAll = async (): Promise<ActionResult<HydratedDocument<ITodo>[]>> => {

  const result = new ActionResult<HydratedDocument<ITodo>[]>([]);

  try {
    result.data = await Todo.find({});
  } catch (error) {
    result.setError(500, "An error ocurred while fetching the Todo entities");
  }

  return result
};

export const getById = async (id: string): Promise<ActionResult<HydratedDocument<ITodo> | null>> => {

  const result = new ActionResult<HydratedDocument<ITodo> | null>(null);

  try {
    result.data = await Todo.findById(id);
    !result.data && result.setError(404, "Todo entity not found");
  } catch (error) {
    result.setError(500, "An error ocurred while fetching the Todo entity");
  }
  
  return result;
};

export const deleteById = async (id: string): Promise<ActionResult<HydratedDocument<ITodo> | null>> => {

  const result = new ActionResult<HydratedDocument<ITodo> | null>(null);

  try {
    result.data = await Todo.findByIdAndDelete(id);
    !result.data && result.setError(400, "Invalid todo Id");
  } catch (error) {
    result.setError(500, "An error ocurred while deleting the Todo entity");
  }
  
  return result;
};