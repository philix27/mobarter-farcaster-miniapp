// types/api.ts

import { ITodo } from "../models/todo";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Examples:
export type TodosResponse = ApiResponse<ITodo[]>;
export type TodoResponse = ApiResponse<ITodo>;
