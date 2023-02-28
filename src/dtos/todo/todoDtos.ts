import { ITodo } from "../../db/models/Todo.js";
import { TodoTagDTO } from "../tag/tagDtos.js";

export type CreateTodoDTO = {
  todoData: Pick<ITodo, 'title' | "description" | "completed">,
  todoTags: string[];
};

export type UpdateTodoDTO = {
  id?: string,
  dataToUpdate: Partial<CreateTodoDTO> & {
    tagsToDelete?: string[]
  }
}

export type TodoDTO = Pick<
  ITodo,
  "title" | "description" | "completed" | "createdAt" | "updatedAt"
> & { id: string, tags: TodoTagDTO[] };