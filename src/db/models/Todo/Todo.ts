import mongoose, { Schema } from "mongoose";

interface ITodo {
  title: string;
  description: string;
  createdAt: Date,
  updatedAt: Date
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
