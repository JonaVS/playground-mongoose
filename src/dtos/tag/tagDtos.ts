import { ITag } from "../../db/models/Tag.js";

export type CreateTagDTO = Pick<ITag, "name">;
export type TagDTO = Partial<ITag> & {
  id: string;
};
export type TodoTagDTO = Pick<TagDTO, "id" | "name">