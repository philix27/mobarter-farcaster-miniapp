import { logger } from "../../utils";
import { IRewards, RewardsModel } from "./model";

export interface IRewardsParams {
    add: IRewards
    get: { fid: string; }
}
export interface IRewardsResponse {
    add: IRewards
    get: IRewards
}

export class RewardsService {
    async create(body: IRewardsParams["add"]): Promise<IRewards> {
        try {
            logger.info("add rewards data: " + body)
            const accounts = await RewardsModel.create(body);
            return accounts
        } catch (error: any) {
            logger.error(error)
            throw new Error("User account creation failed")
        }

    }

    async get(p: IRewardsParams["get"]): Promise<IRewards> {
        try {
            logger.info("Get rewards info: " + p.fid)
            const result = await RewardsModel.find({
                fid: p.fid
            });
            return result[0]
        } catch (error: any) {
            logger.error(error)
            throw new Error("Fetch user info failed")
        }
    }

}