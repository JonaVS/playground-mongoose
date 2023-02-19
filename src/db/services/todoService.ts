import { CreateTodoDTO, TodoDTO } from "../../dtos/todo/todoDtos.js";
import { Result } from "../../types/Result.js";
import * as todoDal from "../dal/todoDal.js"
import { toTodoDto } from "../../dtos/todo/todoDtoMappers.js";


export const createTodo = async (payload: CreateTodoDTO): Promise<Result<TodoDTO | null>> => {
    const dbResult = await todoDal.createTodo(payload);

    const result:Result<TodoDTO | null> = {
        ...dbResult,
        data: dbResult.data ? toTodoDto(dbResult.data) : null
    }

    return result
} 