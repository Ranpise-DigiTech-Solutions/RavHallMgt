import mongoose from "mongoose";
import dotenv from 'dotenv';
export const Connection = async (username, password) => {

  const databaseName = 'venueMasterDB';
  const URL = `mongodb+srv://${username}:${password}@cluster0.lm1m9er.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    try {
        await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true}); // Remove deprecated options
        console.log("Database connected successfully!");
      } catch (error) {
        console.error("Error while connecting with the database:", error.message);
      }
}
 
export default Connection;