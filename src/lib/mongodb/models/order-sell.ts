// models/Todo.js
import mongoose from "mongoose";

const OrderSellSchema = new mongoose.Schema(
  {
    amountFiat: { type: String, required: true },
    amountCrypto: { type: String, required: true },
    fiatCurrency: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Todo || mongoose.model("OrderSell", OrderSellSchema);
