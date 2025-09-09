import OrdersApiHandler from "@/src/lib/mongodb/orders/api";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => OrdersApiHandler(req, res)
