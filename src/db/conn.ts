import mongoose, { mongo } from "mongoose";
const MONGO_URL = process.env.MONGO_URL as string;

if (!MONGO_URL) {
  throw new Error("Please add MONGO_URL to .env file");
}

const connectToDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(MONGO_URL);
    console.log(`Mongodb Connected Successfully : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Mongodb Connection Failed : ", error);
    process.exit(0);
  }
};

export default connectToDB;
