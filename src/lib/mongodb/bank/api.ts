import dbConnect from "@/src/lib/mongodb/init";
import { NextApiRequest, NextApiResponse } from "next";
import { BankAccountService } from "@/src/lib/mongodb/bank/service";


export default async function BankAccountHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const service = new BankAccountService()
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const data = await service.getAll(req.query as any)
                res.status(200).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case "POST":
            try {
                const data = await service.create(req.body)
                res.status(201).json({ success: true, data: data });
            } catch (error: any) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "DELETE":
            try {
                const data = await service.delete(req.body)
                res.status(201).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
