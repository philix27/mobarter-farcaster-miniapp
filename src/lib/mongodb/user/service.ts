import { logger } from "../../utils";
import { IUserInfo, UserInfoModel } from "./model";

export interface IUserInfoParams {
    create: IUserInfo
    get: { fid: string; }
}
export interface IUserInfoResponse {
    create: IUserInfo
    get: IUserInfo
}

export class UserInfoService {
    async create(body: IUserInfoParams["create"]): Promise<IUserInfo> {
        try {
            logger.info("Create user: " + body)
            const accounts = await UserInfoModel.create(body);
            return accounts
        } catch (error: any) {
            logger.error(error)
            throw new Error("User account creation failed")
        }

    }

    async get(p: IUserInfoParams["get"]): Promise<IUserInfo> {
        try {
            logger.info("Get user: " + p.fid)
            const result = await UserInfoModel.find({
                fid: p.fid
            });
            return result[0]
        } catch (error: any) {
            logger.error(error)
            throw new Error("Fetch user info failed")
        }
    }

}