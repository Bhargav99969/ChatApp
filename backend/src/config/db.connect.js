import mongoose from "mongoose";

export const connectDb = async () => {
  try {
  const conn=await  mongoose.connect(process.env.MONGO);
    console.log("connected mongo");
  } catch (erro) {
    console.log(erro);
  }
};
export default connectDb
