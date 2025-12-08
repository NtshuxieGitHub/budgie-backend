import mongoose from "mongoose";
declare const Reports: mongoose.Model<{
    user_id: mongoose.Types.ObjectId;
    month: string;
    year: number;
    reportpath: string;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    user_id: mongoose.Types.ObjectId;
    month: string;
    year: number;
    reportpath: string;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    user_id: mongoose.Types.ObjectId;
    month: string;
    year: number;
    reportpath: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user_id: mongoose.Types.ObjectId;
    month: string;
    year: number;
    reportpath: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    month: string;
    year: number;
    reportpath: string;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    user_id: mongoose.Types.ObjectId;
    month: string;
    year: number;
    reportpath: string;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Reports;
