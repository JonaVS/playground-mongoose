import { HydratedDocument } from "mongoose";
import { CreateTodoDTO, UpdateTodoDTO } from "../../dtos/todo/todoDtos.js";
import { ActionResult } from "../../types/ActionResult.js";
import { ITodo, Todo } from "../models/Todo.js";

export const createTodo = async (payload: CreateTodoDTO): Promise<ActionResult<HydratedDocument<ITodo> | null>> => {
  
  const result = new ActionResult<HydratedDocument<ITodo> | null>(null);

  const newTodo = new Todo({...payload});

  const validationError = newTodo.validateSync();

  if (validationError) {
    result.setError(400, "Invalid Todo payload");
    return result;
  }

  try {
    result.data = await Todo.create({ ...payload });
  } catch (error) {
    result.setError(500, "An error ocurred while creating the Todo entity");
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

export const update = async ( payload: UpdateTodoDTO ): Promise<ActionResult<HydratedDocument<ITodo> | null>> => {

  const result = new ActionResult<HydratedDocument<ITodo> | null>(null);

  try {
    result.data = await Todo.findByIdAndUpdate(payload.id, payload.dataToUpdate);
    !result.data && result.setError(400, "Invalid todo Id");
  } catch (error ) {
    result.setError(500, "An error ocurred while updating the Todo entity");
  }

  return result;
};