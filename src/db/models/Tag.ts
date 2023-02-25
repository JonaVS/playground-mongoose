import mongoose, { Schema } from "mongoose";

export interface ITag {
  name: string;
  createdAt: Date,
  updatedAt: Date
}

const tagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Tag = mongoose.model("Tag", tagSchema);