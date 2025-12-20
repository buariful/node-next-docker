import mongoose, { Model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new mongoose.Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<TUser, Model<TUser>>("User", userSchema);

export const UserModel = User;
