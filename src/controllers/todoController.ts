import { CreateTodoDTO, TodoDTO } from "../dtos/todo/todoDtos.js";
import { ActionResult } from "../types/ActionResult.js";
import * as todoService from "../db/services/todoService.js"

export const createTodo = async (payload: CreateTodoDTO): Promise<ActionResult<TodoDTO | null>> => {
  return await todoService.createTodo(payload);
};

export const getAll = async (): Promise<ActionResult<TodoDTO[]>> => {
  return await todoService.getAll();
};

export const getById = async (id: string): Promise<ActionResult<TodoDTO | null>> => {
  return await todoService.getById(id);
};

export const deleteById = async (id: string): Promise<ActionResult<TodoDTO | null>> => {
  return await todoService.deleteById(id);
};