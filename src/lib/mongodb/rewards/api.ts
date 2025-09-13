import dbConnect from "@/src/lib/mongodb/init";
import { NextApiRequest, NextApiResponse } from "next";
import { RewardsService } from "./service";


export default async function RewardsApiHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const service = new RewardsService()
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const data = await service.get(req.query as any)
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

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
