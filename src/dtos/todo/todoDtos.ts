import { ITodo } from "../../db/models/Todo.js";

export type CreateTodoDTO = Pick<ITodo, 'title' | "description" | "completed">;
export type TodoDTO = ITodo & {
  id: string;
};