import { ITag } from "../../db/models/Tag.js";
import { ITodo } from "../../db/models/Todo.js";
import { TodoTagDTO } from "../tag/tagDtos.js";

export type CreateTodoDTO = {
  todoData: Pick<ITodo, 'title' | "description" | "completed">,
  todoTags: string[];
};

export type UpdateTodoDTO = {
  id?: string,
  dataToUpdate: Partial<CreateTodoDTO>
}
export type TodoDTO = Partial<ITodo> & { id: string, todoTags: TodoTagDTO[]};