import dbConnect from "@/src/lib/mongodb/init";
import { NextApiRequest, NextApiResponse } from "next";
import { OrdersService } from "./service";


export default async function AgentOrdersApiHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const service = new OrdersService()
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const data = await service.getForAgent()
                res.status(200).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
