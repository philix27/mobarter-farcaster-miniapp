// pages/api/todos/index.js

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./init";
import BankAccount from "./models/bankAccount";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const accounts = await BankAccount.find({});
                res.status(200).json({ success: true, data: accounts });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "POST":
            try {
                const accounts = await BankAccount.create(req.body);
                res.status(201).json({ success: true, data: accounts });
            } catch (error: any) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
