import mongoose, { Document, Schema } from "mongoose";

interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<UserInterface>("User", UserSchema);

export default User;
