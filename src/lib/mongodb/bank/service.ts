import { logger } from "../../utils";
import BankAccountModel, { IBankAccount } from "./model";

export interface IBankAccountParams {
    create: IBankAccount
    getAll: { user_id: string; }
    getOne: { user_id: string; id: string }
    delete: { user_id: string; id: string }
}

interface GetAll extends IBankAccount {
     _id:string
}
export interface IBankAccountResponse {
    create: IBankAccount
    getAll: GetAll[]
    getOne: IBankAccount
    delete: IBankAccount
}

export class BankAccountService {
    async create(body: IBankAccountParams["create"]): Promise<IBankAccount> {
        try {
            logger.info("Add bank account: " + body)
            const accounts = await BankAccountModel.create(body);
            return accounts
        } catch (error: any) {
            logger.error(error)
            throw new Error("Account creation failed")
        }

    }

    async getAll(p: IBankAccountParams["getAll"]): Promise<IBankAccount[]> {
        try {
            logger.info("Get all bank accounts: " + p.user_id)
            const accounts = await BankAccountModel.find({
                user_id: p.user_id
            });
            return accounts
        } catch (error: any) {
            logger.error(error)
            throw new Error("Account creation failed")
        }
    }

    async getOne(p: IBankAccountParams["getOne"]) {
        try {
            logger.info("Get one bank accounts: " + p.user_id)
            const account = await BankAccountModel.find({
                _id: p.id,
                user_id: p.user_id
            });
            return account
        } catch (error: any) {
            logger.error(error)
            throw new Error("Fetch account failed")
        }
    }
    async delete(p: IBankAccountParams["delete"]) {
        try {
            const account = await BankAccountModel.deleteOne({ _id: p.id });
            // if (!account.deletedCount)
            return account

        } catch (error) {
            logger.error(error)
            throw new Error("Delete Account Failed")
        }
    }
}