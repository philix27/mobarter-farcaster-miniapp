import AgentOrdersApiHandler from "@/src/lib/mongodb/orders/api-agent";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => AgentOrdersApiHandler(req, res)
