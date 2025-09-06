import { NextApiRequest, NextApiResponse } from "next";
import BankAccountHandler from "@/src/lib/mongodb/bank/api";


export default async (req: NextApiRequest, res: NextApiResponse) => BankAccountHandler(req, res)
