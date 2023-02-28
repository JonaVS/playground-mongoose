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
      newTodo.tags = [] as Types.ObjectId[];
      
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
      result.data.tags = generatedTags; 
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
    result.data = await Todo.find({}).populate("tags");
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
    const session = await mongoose.startSession();
    session.startTransaction();
    let updatedTags = false;

    /*
      Updates base todo fields. Title , description, etc.
      If no base fields updates, mongonsee still returns 
      the todo based on the passed id. Useful later on for tags related oeperations.
    */
    const todoTarget = await Todo.findByIdAndUpdate(
      payload.id,
      payload.dataToUpdate.todoData,
      { runValidators: true, session: session, new: true }
    ).populate('tags');


    if (!todoTarget) {
      await session.abortTransaction();
      result.setError(400, "Invalid todo Id");
      return result;
    } 

    /* ---------Tags related operations START--------- */

    /*
      -The tags field can be of type ObjectId[] (when saving ids that links to Tags docs) 
        or HydratedDocument<ITag>[] (when populated data is present)
      -In this scenario of updating, both types can be present which causes problems.
      -If population data is present, the tags are saved on a temporal variable.
      -This is needed otherwise at runtime the tags array field is going to have mixed objects.
    */
      let tempTodoTags: HydratedDocument<ITag>[] = [];
      if (todoTarget.populated('tags')) {
        tempTodoTags = todoTarget.tags as HydratedDocument<ITag>[];
      }

      //Check if removal of Tags from a Todo is needed.
      if (Array.isArray(payload.dataToUpdate.tagsToDelete) && payload.dataToUpdate.tagsToDelete.length) {
        for (const tagIdToDelete of payload.dataToUpdate.tagsToDelete) {
          tempTodoTags = tempTodoTags.filter(tag => tag.id !== tagIdToDelete);
        }
        updatedTags = true;
      }

      //Add new tags to the todo if applicable.
      if (Array.isArray(payload.dataToUpdate.todoTags) && payload.dataToUpdate.todoTags.length) {
        for (const tag of payload.dataToUpdate.todoTags) {
          if (isNonEmptyString(tag) && !tempTodoTags.find(x => x.name === tag)) {
            const query = { name: tag };
            const tagDbResult = await Tag.findOneAndUpdate(
              query,
              { name: tag },
              { upsert: true, new: true, session: session }
            );
            if (tagDbResult) {
              tempTodoTags.push(tagDbResult);
            }
          }
        }
        updatedTags = true;
      }

      //if todos tags have been updated, apply changes in memory
      if (updatedTags) todoTarget.tags = tempTodoTags.map((tag) => tag._id);

      /* ---------Tags related operations END--------- */
       
      await todoTarget.save({session: session});
      await session.commitTransaction();
      await session.endSession();

      result.data = todoTarget;
      result.data.tags = tempTodoTags;

  } catch (error ) {
    if (error instanceof mongoose.Error.ValidationError) {
      result.setError(400, error.message);
    } else {
      result.setError(500, "An error ocurred while updating the Todo entity");
    }
  }

  return result;
};