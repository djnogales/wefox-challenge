import { model, Schema, Document } from "mongoose";

export type UserMongo = {
  _id: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const userModel = model<UserMongo & Document>('User', userSchema);

export default userModel;
