import { logger } from "../../utils";
import { IOrder, OrdersModel } from "./model";

export interface IOrderParams {
    create: IOrder
    getForUser: { fid: string; }
}
export interface IOrderResponse {
    create: IOrder
    getForUser: IOrder[]
    getForAgent: IOrder[]
}

export class OrdersService {
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

    async getForUser(p: IOrderParams["getForUser"]): Promise<IOrderResponse["getForUser"]> {
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
    async getForAgent(): Promise<IOrderResponse["getForAgent"]> {
        try {
            logger.info("Get orders: ")
            const result = await OrdersModel.find();
            return result
        } catch (error: any) {
            logger.error(error)
            throw new Error("Fetch orders failed")
        }
    }

}