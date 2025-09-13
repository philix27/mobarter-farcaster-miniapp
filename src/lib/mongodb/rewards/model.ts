import mongoose, { Schema, Model, Document } from "mongoose";

export interface IRewards {
    fid?: string;
    email?: string;
    twitter_handle?: string;
    whatsapp_no?: string;
    telegram_handle?: string;
}

interface ISchema extends IRewards, Document {
    createdAt: Date;
    updatedAt: Date;
}
const schema: Schema<ISchema> = new Schema(
    {
        fid: { type: String, required: true },
        email: { type: String, required: false },
        twitter_handle: { type: String, required: false },
        telegram_handle: { type: String, required: false },
        whatsapp_no: { type: String, required: false },
    },
    {
        timestamps: true,
        collection: "rewards"
    }
);

export const RewardsModel: Model<ISchema> =
    mongoose.models.user_info || mongoose.model<ISchema>("rewards", schema);



