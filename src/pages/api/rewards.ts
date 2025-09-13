import RewardsApiHandler from "@/src/lib/mongodb/rewards/api";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => RewardsApiHandler(req, res)
