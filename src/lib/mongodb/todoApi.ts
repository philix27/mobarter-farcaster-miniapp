// pages/api/todos/index.js

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./init";
import Todo from "./models/todo";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const todos = await Todo.find({
                
                });
                res.status(200).json({ success: true, data: todos });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "POST":
            try {
                const todo = await Todo.create(req.body);
                res.status(201).json({ success: true, data: todo });
            } catch (error: any) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
