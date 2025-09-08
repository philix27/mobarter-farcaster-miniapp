import UserInfoApiHandler from "@/src/lib/mongodb/user/api";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => UserInfoApiHandler(req, res)
