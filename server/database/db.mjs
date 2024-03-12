import mongoose from "mongoose";
import dotenv from 'dotenv';
export const Connection = async () => {

    const URL = process.env.MONGO_CONNECTION_KEY;

    try {
        await mongoose.connect(URL); // Remove deprecated options
        console.log("Database connected successfully!");
      } catch (error) {
        console.error("Error while connecting with the database:", error.message);
      }
}
 
export default Connection;