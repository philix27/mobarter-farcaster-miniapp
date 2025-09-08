import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUserInfo {
    fid?: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    bvn: string;
    nin: string;
    phone: string;
    dob: string;

}

interface ISchema extends IUserInfo, Document {
    createdAt: Date;
    updatedAt: Date;
}
const schema: Schema<ISchema> = new Schema(
    {
        fid: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        middle_name: { type: String, required: true },
        bvn: { type: String, required: true },
        nin: { type: String, required: true },
        phone: { type: String, required: true },
        dob: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: "user_info"
    }
);

export const UserInfoModel: Model<ISchema> =
    mongoose.models.user_info || mongoose.model<ISchema>("user_info", schema);



