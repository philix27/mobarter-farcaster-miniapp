import { logger } from "../../utils";
import { IOrder, OrdersModel } from "./model";

export interface IOrderParams {
    create: IOrder
    getAll: { fid: string; }
}
export interface IOrderResponse {
    create: IOrder
    getAll: IOrder[]
}

export class UserInfoService {
    async create(body: IOrderParams["create"]): Promise<IOrder> {
        try {
            logger.info("Create order: " + body)
            const accounts = await OrdersModel.create({
                ...body,
                "type": "SELL",
                fiat_currency: "NGN"
            });
            return accounts
        } catch (error: any) {
            logger.error(error)
            throw new Error("Create order failed")
        }

    }

    async get(p: IOrderParams["getAll"]): Promise<IOrderResponse["getAll"]> {
        try {
            logger.info("Get orders: " + p.fid)
            const result = await OrdersModel.find({
                fid: p.fid
            });
            return result
        } catch (error: any) {
            logger.error(error)
            throw new Error("Fetch orders failed")
        }
    }

}