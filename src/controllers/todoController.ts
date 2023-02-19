import { CreateTodoDTO, TodoDTO } from "../dtos/todo/todoDtos.js";
import { Result } from "../types/Result.js";
import * as todoService from "../db/services/todoService.js"

export const createTodo = async (payload: CreateTodoDTO): Promise<Result<TodoDTO | null>> => {
  return await todoService.createTodo(payload);
};