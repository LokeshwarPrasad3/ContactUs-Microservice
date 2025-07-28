import mongoose, { Document, Model, Schema } from "mongoose";

interface LocationsType {
  IP: string;
  country: string;
  state: string;
  city: string; 
  postal: string; 
}

interface UserSchemaType extends Document {
  name: string;
  email: string;
  message: string;
  userLocation: LocationsType;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for embedded location document
const UserLocationSchema = new Schema({
  IP: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  postal: { type: String, required: true }
});

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
    userLocation: {
      type: UserLocationSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel: Model<UserSchemaType> = mongoose.model<UserSchemaType>("User", userSchema);
export default userModel;
