import mongoose from "mongoose";
declare const ExpenseItems: mongoose.Model<{
    user_id: mongoose.Types.ObjectId;
    subcategory_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    expense_amount?: number | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    user_id: mongoose.Types.ObjectId;
    subcategory_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    expense_amount?: number | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    user_id: mongoose.Types.ObjectId;
    subcategory_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    expense_amount?: number | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user_id: mongoose.Types.ObjectId;
    subcategory_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    expense_amount?: number | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    subcategory_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    expense_amount?: number | null | undefined;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    subcategory_id: mongoose.Types.ObjectId;
    payday: number;
    paid: boolean;
    expense_amount?: number | null | undefined;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default ExpenseItems;
