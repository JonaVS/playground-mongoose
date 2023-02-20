import { HydratedDocument } from "mongoose";
import { CreateTodoDTO } from "../../dtos/todo/todoDtos.js";
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

export const getAll = async (): Promise<Result<HydratedDocument<ITodo>[]>> => {

  const result: Result<HydratedDocument<ITodo>[]> = {
    success: true,
    data: [],
  };

  try {
    result.data = await Todo.find({});
  } catch (error) {
    console.log(error);
    result.error = "An error ocurred while fetching the Todo entities";
    result.errorCode = 500;
  }

  return result
};

export const getById = async (id: string): Promise<Result<HydratedDocument<ITodo> | null>> => {

  const result: Result<HydratedDocument<ITodo> | null> = {
    success: true,
    data: null,
  };

  try {
    result.data = await Todo.findById(id);
  } catch (error) {
    result.error = "An error ocurred while fetching the Todo entity";
    result.errorCode = 500;
  }
  
  return result;
};