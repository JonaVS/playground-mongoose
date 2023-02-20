import { CreateTodoDTO, TodoDTO } from "../../dtos/todo/todoDtos.js";
import { Result } from "../../types/Result.js";
import * as todoDal from "../dal/todoDal.js"
import { toTodoDto } from "../../dtos/todo/todoDtoMappers.js";

export const createTodo = async (payload: CreateTodoDTO): Promise<Result<TodoDTO | null>> => {
  const dbResult = await todoDal.createTodo(payload);

  const result: Result<TodoDTO | null> = {
    ...dbResult,
    data: dbResult.data ? toTodoDto(dbResult.data) : null,
  };

  return result;
};

export const getAll = async (): Promise<Result<TodoDTO[]>> => {
  const dbResult = await todoDal.getAll();

  const result: Result<TodoDTO[]> = {
    ...dbResult,
    data: dbResult.data ? dbResult.data.map(toTodoDto) : [],
  };

  return result;
};

export const getById = async (id: string): Promise<Result<TodoDTO | null>> => {
  const dbResult = await todoDal.getById(id);

  const result: Result<TodoDTO | null> = {
    ...dbResult,
    data: dbResult.data ? toTodoDto(dbResult.data) : null,
  };

  return result;
}