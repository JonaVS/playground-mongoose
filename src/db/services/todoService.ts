import { CreateTodoDTO, TodoDTO } from "../../dtos/todo/todoDtos.js";
import { ActionResult } from "../../types/ActionResult.js";
import * as todoDal from "../dal/todoDal.js"
import { toTodoDto } from "../../dtos/todo/todoDtoMappers.js";
import { toServiceActionResult } from "./helpers/toServiceActionResult.js";
import { HydratedDocument } from "mongoose";
import { ITodo } from "../models/Todo.js";

export const createTodo = async (payload: CreateTodoDTO): Promise<ActionResult<TodoDTO | null>> => {
  const dbResult = await todoDal.createTodo(payload);

  const serviceResult = toServiceActionResult<HydratedDocument<ITodo>, TodoDTO>(
    dbResult,
    toTodoDto
  ) as ActionResult<TodoDTO | null>;

  return serviceResult;
};

export const getAll = async (): Promise<ActionResult<TodoDTO[]>> => {

  const dbResult = await todoDal.getAll();

  const serviceResult = toServiceActionResult<HydratedDocument<ITodo>, TodoDTO>(
    dbResult,
    toTodoDto
  ) as ActionResult<TodoDTO[]>;

  return serviceResult;

};

export const getById = async (id: string): Promise<ActionResult<TodoDTO | null>> => {

  const dbResult = await todoDal.getById(id);

  const serviceResult = toServiceActionResult<HydratedDocument<ITodo>, TodoDTO>(
    dbResult,
    toTodoDto
  ) as ActionResult<TodoDTO | null>;

  return serviceResult;

}

export const deleteById = async (id: string): Promise<ActionResult<TodoDTO | null>> => {
  
  const dbResult = await todoDal.deleteById(id);

  const serviceResult = toServiceActionResult<HydratedDocument<ITodo>, TodoDTO>(
    dbResult,
    toTodoDto
  ) as ActionResult<TodoDTO | null>;

  return serviceResult;
}