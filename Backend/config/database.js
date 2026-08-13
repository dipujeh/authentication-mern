import mongoose, { connect } from "mongoose";

const connectDB = async() => {
  try {
   await mongoose.connect(process.env.MONGODB_URI);
   console.log("Database connected");
   
  } catch (error) {
    console.log(`database_${error}`);
  }
};


export default connectDB;