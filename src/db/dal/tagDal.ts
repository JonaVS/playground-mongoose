import { HydratedDocument } from "mongoose";
import { CreateTagDTO } from "../../dtos/tag/tagDtos.js";
import { ActionResult } from "../../types/ActionResult.js";
import { ITag, Tag } from "../models/Tag.js";

export const createTag = async ( payload: CreateTagDTO ): Promise<ActionResult<HydratedDocument<ITag> | null>> => {
  const result = new ActionResult<HydratedDocument<ITag> | null>(null);
  const newTag = new Tag({ ...payload });
  const validationError = newTag.validateSync();

  if (validationError) {
    result.setError(400, "Invalid Tag payload");
    return result;
  }

  try {
    result.data = await Tag.create({ ...payload });
  } catch (error) {
    result.setError(500, "An error ocurred while creating the Tag entity");
  }

  return result;
};