import mongoose, { Schema, Model, Document } from "mongoose";

export interface IBankAccount {
    user_id: string;
    account_name: string;
    account_no: string;
    bank_name: string;
    bank_code: string;

}

interface ISchema extends IBankAccount, Document {
    createdAt: Date;
    updatedAt: Date;
}
const BankAccountSchema: Schema<ISchema> = new Schema(
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

const BankAccountModel: Model<ISchema> =
    mongoose.models.Todo || mongoose.model<ISchema>("bank_accounts", BankAccountSchema);

export default BankAccountModel;

