import { CreateTagDTO, TagDTO } from "../dtos/tag/tagDtos.js";
import { ActionResult } from "../types/ActionResult.js";
import * as tagService from "../db/services/tagService.js"

export const createTodo = async (payload: CreateTagDTO): Promise<ActionResult<TagDTO | null>> => {
  return await tagService.createTag(payload);
};