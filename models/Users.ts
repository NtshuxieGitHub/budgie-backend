import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UsersSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 20 },
    surname: { type: String, required: true, minLength: 3, maxLength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6, maxLength: 50 },
  },
  { timestamps: true }
);

const Users = model("Users", UsersSchema);
export default Users;
