import mongoose, { HydratedDocument, Types } from "mongoose";
import { CreateTodoDTO, UpdateTodoDTO } from "../../dtos/todo/todoDtos.js";
import { ActionResult } from "../../types/ActionResult.js";
import { ITodo, Todo } from "../models/Todo.js";
import { ITag, Tag } from "../models/Tag.js";
import { isNonEmptyString } from "../../utils/isEmptyString.js";

export const createTodo = async (payload: CreateTodoDTO): Promise<ActionResult<HydratedDocument<ITodo> | null>> => {
  const result = new ActionResult<HydratedDocument<ITodo> | null>(null);

  const newTodo = new Todo({ ...payload.todoData });

  const validationError = newTodo.validateSync();

  if (validationError) {
    result.setError(400, "Invalid Todo payload");
    return result;
  }

  //Creates and links the todo tags (if applicable)
  try {
    if (Array.isArray(payload.todoTags) && payload.todoTags.length) {
      const session = await mongoose.startSession();
      session.startTransaction();
      const generatedTags:HydratedDocument<ITag>[] = [];
      
      for (const tag of payload.todoTags) {
        if (isNonEmptyString(tag)) {
          const query = { name: tag };
          const tagDbResult = await Tag.findOneAndUpdate(
            query,
            { name: tag },
            { upsert: true, new: true, session: session }
          );
          if (tagDbResult) {
            generatedTags.push(tagDbResult);
            newTodo.tags.push(tagDbResult._id) 
          }
        }
      }
  
      await newTodo.save({session: session});
      await session.commitTransaction();
      await session.endSession();
      result.data = newTodo;
      result.data.tagsDocs = generatedTags; 
    }
    else{
      //If no tags, just save the base Todo fields.
      result.data = await newTodo.save();
    }
  } catch (error) {
    result.setError(500, "An error ocurred while creating the Todo entity");
  }

  return result;
};

export const getAll = async (): Promise<ActionResult<HydratedDocument<ITodo>[]>> => {

  const result = new ActionResult<HydratedDocument<ITodo>[]>([]);

  try {
    result.data = await Todo.find({});
  } catch (error) {
    result.setError(500, "An error ocurred while fetching the Todo entities");
  }

  return result
};

export const getById = async (id: string): Promise<ActionResult<HydratedDocument<ITodo> | null>> => {

  const result = new ActionResult<HydratedDocument<ITodo> | null>(null);

  try {
    result.data = await Todo.findById(id);
    !result.data && result.setError(404, "Todo entity not found");
  } catch (error) {
    result.setError(500, "An error ocurred while fetching the Todo entity");
  }
  
  return result;
};

export const deleteById = async (id: string): Promise<ActionResult<HydratedDocument<ITodo> | null>> => {

  const result = new ActionResult<HydratedDocument<ITodo> | null>(null);

  try {
    result.data = await Todo.findByIdAndDelete(id);
    !result.data && result.setError(400, "Invalid todo Id");
  } catch (error) {
    result.setError(500, "An error ocurred while deleting the Todo entity");
  }
  
  return result;
};

export const update = async ( payload: UpdateTodoDTO ): Promise<ActionResult<HydratedDocument<ITodo> | null>> => {

  const result = new ActionResult<HydratedDocument<ITodo> | null>(null);

  try {
    result.data = await Todo.findByIdAndUpdate(
      payload.id,
      payload.dataToUpdate,
      { runValidators: true }
    );
    !result.data && result.setError(400, "Invalid todo Id");
  } catch (error ) {
    if (error instanceof mongoose.Error.ValidationError) {
      result.setError(400, error.message);
    } else {
      result.setError(500, "An error ocurred while updating the Todo entity");
    }
  }

  return result;
};