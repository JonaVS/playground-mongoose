import { CreateTodoDTO, TodoDTO } from "../../dtos/todo/todoDtos.js";
import { ActionResult } from "../../types/ActionResult.js";
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

export const getById = async (id: string): Promise<ActionResult<TodoDTO | null>> => {
  const dbResult = await todoDal.getById(id);
  const serviceResult = new ActionResult<TodoDTO | null>(null);

  if (!dbResult.data) {
    serviceResult.setError(dbResult.errorCode!, dbResult.error);
  } else {
    serviceResult.data = toTodoDto(dbResult.data);
  }

  return serviceResult;
}

export const deleteById = async (id: string): Promise<ActionResult<TodoDTO | null>> => {
  
  const dbResult = await todoDal.deleteById(id);
  const serviceResult = new ActionResult<TodoDTO | null>(null);

  if (!dbResult.data) {
    serviceResult.setError(dbResult.errorCode!, dbResult.error);
  } else {
    serviceResult.data = toTodoDto(dbResult.data);
  }

  return serviceResult;
}