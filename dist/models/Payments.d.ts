import mongoose from "mongoose";
declare const Payments: mongoose.Model<{
    user_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    loan_id: mongoose.Types.ObjectId;
    payment_amount: number;
    latest_balance: number;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    user_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    loan_id: mongoose.Types.ObjectId;
    payment_amount: number;
    latest_balance: number;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    user_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    loan_id: mongoose.Types.ObjectId;
    payment_amount: number;
    latest_balance: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    loan_id: mongoose.Types.ObjectId;
    payment_amount: number;
    latest_balance: number;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    loan_id: mongoose.Types.ObjectId;
    payment_amount: number;
    latest_balance: number;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    loan_id: mongoose.Types.ObjectId;
    payment_amount: number;
    latest_balance: number;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Payments;
