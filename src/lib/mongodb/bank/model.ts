import mongoose, { Schema, Model, Document } from "mongoose";

export interface IBankAccount extends Document {
    user_id: string;
    account_name: string;
    account_no: string;
    bank_name: string;
    bank_code: string;
    createdAt: Date;
    updatedAt: Date;
}

const BankAccountSchema: Schema<IBankAccount> = new Schema(
    {
        user_id: { type: String, required: true },
        account_name: { type: String, required: true },
        account_no: { type: String, required: true },
        bank_name: { type: String, required: true },
        bank_code: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: "bank_accounts"
    }
);

const BankAccountModel: Model<IBankAccount> =
    mongoose.models.Todo || mongoose.model<IBankAccount>("bank_accounts", BankAccountSchema);

export default BankAccountModel;

