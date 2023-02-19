import { HydratedDocument } from "mongoose";
import { ITodo } from "../../db/models/Todo.js";
import { TodoDTO } from "./todoDtos.js";

export const toTodoDto = (todo: HydratedDocument<ITodo>): TodoDTO => {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
  };
};
