import mongoose from "mongoose";
declare const Salary: mongoose.Model<{
    user_id: mongoose.Types.ObjectId;
    salary_amount: number;
    currency: string;
    payday?: number | null | undefined;
    bank?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    user_id: mongoose.Types.ObjectId;
    salary_amount: number;
    currency: string;
    payday?: number | null | undefined;
    bank?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    user_id: mongoose.Types.ObjectId;
    salary_amount: number;
    currency: string;
    payday?: number | null | undefined;
    bank?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user_id: mongoose.Types.ObjectId;
    salary_amount: number;
    currency: string;
    payday?: number | null | undefined;
    bank?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    salary_amount: number;
    currency: string;
    payday?: number | null | undefined;
    bank?: string | null | undefined;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    salary_amount: number;
    currency: string;
    payday?: number | null | undefined;
    bank?: string | null | undefined;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Salary;
