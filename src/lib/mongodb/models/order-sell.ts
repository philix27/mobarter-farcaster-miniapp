// models/Todo.js
import mongoose, { Model, Schema } from "mongoose";

export interface IOrderSell extends Document {
  amountFiat: string;
  amountCrypto: string;
  fiatCurrency: string;
}


const OrderSellSchema: Schema<IOrderSell> = new mongoose.Schema(
  {
    amountFiat: { type: String, required: true },
    amountCrypto: { type: String, required: true },
    fiatCurrency: { type: String, required: true },
  },
  { timestamps: true }
);


const OrderSell: Model<IOrderSell> =
  mongoose.models.Todo || mongoose.model<IOrderSell>("order_sell", OrderSellSchema);

export default OrderSell;

