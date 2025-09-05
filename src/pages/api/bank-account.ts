// pages/api/todos/index.js

import dbConnect from "@/src/lib/mongodb/init";
import BankAccountModel from "@/src/lib/mongodb/models/bankAccount";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { method } = req;
    console.log("Reach bank account")
    switch (method) {
        case "GET":
            try {
                const accounts = await BankAccountModel.find({});
                res.status(200).json({ success: true, data: accounts });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "POST":
            try {
                const accounts = await BankAccountModel.create(req.body);
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
