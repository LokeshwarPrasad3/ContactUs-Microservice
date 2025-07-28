import mongoose, { Document, Model, Schema } from "mongoose";

interface UserSchemaType extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<UserSchemaType> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel: Model<UserSchemaType> = mongoose.model<UserSchemaType>("User", userSchema);
export default userModel;
