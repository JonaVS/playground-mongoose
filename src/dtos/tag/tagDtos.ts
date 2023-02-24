import { ITag } from "../../db/models/Tag.js";

export type CreateTagDTO = Pick<ITag, "name">;
export type TagDTO = CreateTagDTO & {
  id: string;
};
