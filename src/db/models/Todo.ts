import mongoose, { Schema } from "mongoose";

export interface ITodo {
  title: string;
  description: string;
  completed: boolean,
  createdAt: Date,
  updatedAt: Date
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true}
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);