import mongoose from "mongoose";
declare const Loans: mongoose.Model<{
    user_id: mongoose.Types.ObjectId;
    payday: number;
    loan_name: string;
    principal_amount: number;
    interest_rate: number;
    min_payment: number;
    remaining_amount: number;
    original_term: number;
    extra_payment?: number | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    user_id: mongoose.Types.ObjectId;
    payday: number;
    loan_name: string;
    principal_amount: number;
    interest_rate: number;
    min_payment: number;
    remaining_amount: number;
    original_term: number;
    extra_payment?: number | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    user_id: mongoose.Types.ObjectId;
    payday: number;
    loan_name: string;
    principal_amount: number;
    interest_rate: number;
    min_payment: number;
    remaining_amount: number;
    original_term: number;
    extra_payment?: number | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user_id: mongoose.Types.ObjectId;
    payday: number;
    loan_name: string;
    principal_amount: number;
    interest_rate: number;
    min_payment: number;
    remaining_amount: number;
    original_term: number;
    extra_payment?: number | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    payday: number;
    loan_name: string;
    principal_amount: number;
    interest_rate: number;
    min_payment: number;
    remaining_amount: number;
    original_term: number;
    extra_payment?: number | null | undefined;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    payday: number;
    loan_name: string;
    principal_amount: number;
    interest_rate: number;
    min_payment: number;
    remaining_amount: number;
    original_term: number;
    extra_payment?: number | null | undefined;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Loans;
