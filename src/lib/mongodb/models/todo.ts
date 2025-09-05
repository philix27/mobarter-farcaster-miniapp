// models/Todo.js
import mongoose, { Schema, Model, Document } from "mongoose";

// types/todo.ts

export interface ITodo extends Document {
    title: string;
    completed: boolean;
    completedXw: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema: Schema<ITodo> = new Schema(
    {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        "collection": "todos"
    }
);

const Todo: Model<ITodo> =
    mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;

