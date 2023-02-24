import { HydratedDocument } from "mongoose";
import { ITag } from "../../db/models/Tag.js";
import { TagDTO } from "./tagDtos.js";

export const toTagDto = (tag: HydratedDocument<ITag>): TagDTO => {
  return {
    id: tag.id,
    name: tag.name,
    createdAt: tag.createdAt
  };
};
