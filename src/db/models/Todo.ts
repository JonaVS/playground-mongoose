import mongoose, { HydratedDocument, Schema, Types } from "mongoose";
import { ITag } from "./Tag.js";

export interface ITodo {
  title: string;
  description: string;
  completed: boolean,
  createdAt: Date,
  updatedAt: Date,
  tags: Types.ObjectId[] | HydratedDocument<ITag>[];
  //This field is just for temporal population porpouses.
  tagsDocs: HydratedDocument<ITag>[];
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true},
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);