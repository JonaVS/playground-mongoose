import { ITodo } from "../../db/models/Todo.js";

export type CreateTodoDTO = Pick<ITodo, 'title' | "description" | "completed">;
export type UpdateTodoDTO = {
  id?: string,
  dataToUpdate: Partial<CreateTodoDTO>
}
export type TodoDTO = ITodo & { id: string;};
