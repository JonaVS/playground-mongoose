import { HydratedDocument } from "mongoose";
import { ITag } from "../../db/models/Tag.js";
import { TagDTO, TodoTagDTO } from "./tagDtos.js";

export const toTagDto = (tag: HydratedDocument<ITag>): TagDTO => {
  return {
    id: tag.id,
    name: tag.name,
    createdAt: tag.createdAt
  };
};

export const toTodoTagDto = (tag: HydratedDocument<ITag>): TodoTagDTO => {
  return {
    id: tag.id,
    name: tag.name
  }
}
