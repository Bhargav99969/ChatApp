import mongoose from "mongoose";

export const connectDb = async () => {
  try {
  const conn=await  mongoose.connect("mongodb+srv://bhanu:Bhargav@cluster0.xqvzyr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("connected mongo");
  } catch (erro) {
    console.log(erro);
  }
};
export default connectDb
