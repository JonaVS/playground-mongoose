import { HydratedDocument } from "mongoose";
import { ITag } from "../../db/models/Tag.js";
import { ITodo } from "../../db/models/Todo.js";
import { toTodoTagDto } from "../tag/tagDtoMappers.js";
import { TodoDTO } from "./todoDtos.js";

export const toTodoDto = (todo: HydratedDocument<ITodo>): TodoDTO => {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    tags: todo.tags ? todo.tags.map((tag) => toTodoTagDto(tag as HydratedDocument<ITag>)) : []
  };
};
