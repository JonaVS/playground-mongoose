import { HydratedDocument } from "mongoose";
import { CreateTagDTO, TagDTO } from "../../dtos/tag/tagDtos.js";
import { ActionResult } from "../../types/ActionResult.js";
import { toTagDto } from "../../dtos/tag/tagDtoMappers.js";
import * as tagDal from '../dal/tagDal.js'
import { toServiceActionResult } from "./helpers/toServiceActionResult.js";
import { ITag } from "../models/Tag.js";

export const createTag = async ( payload: CreateTagDTO ): Promise<ActionResult<TagDTO | null>> => {
  const dbResult = await tagDal.createTag(payload);

  const serviceResult = toServiceActionResult<HydratedDocument<ITag>, TagDTO>(
    dbResult,
    toTagDto
  ) as ActionResult<TagDTO | null>;

  return serviceResult;
};
