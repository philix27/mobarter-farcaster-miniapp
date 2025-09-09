import mongoose, { Schema, Model, Document } from "mongoose";

type OrderType = "BUY" | "SELL"
type OrderStatus = "PENDING" | "COMPLETED" | "CANCELED"
type FiatCurrency = "NGN"
export interface IOrder {
    fid?: string;
    type: OrderType
    status: OrderStatus
    fiat_currency: FiatCurrency
    amount_in_fiat: number;
    crypto_currency: string;
    amount_in_crypto: number;
    txn_hash: string;
    bank_name: string;
    account_name: string;
    account_number: string;
    bank_code: string;
    token_name: string
    token_address: string
    chain_name: string
    note?: string
}

interface ISchema extends IOrder, Document {
    createdAt: Date;
    updatedAt: Date;
}
const schema: Schema<ISchema> = new Schema(
    {
        fid: { type: String, required: true },
        type: { type: String, required: true },
        status: { type: String, required: true },
        fiat_currency: { type: String, required: true },
        amount_in_fiat: { type: Number, required: true },
        crypto_currency: { type: String, required: true },
        amount_in_crypto: { type: Number, required: true },
        txn_hash: { type: String, required: true },
        bank_name: { type: String, required: true },
        bank_code: { type: String, required: true },
        token_name: { type: String, required: true },
        token_address: { type: String, required: true },
        chain_name: { type: String, required: true },
        note: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: "orders"
    }
);

export const OrdersModel: Model<ISchema> =
    mongoose.models.orders || mongoose.model<ISchema>("orders", schema);



