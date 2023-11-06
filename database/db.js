import mongoose from "mongoose";
import dotenv from 'dotenv';

 
   const Connection = async () => {
        const URL =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pn9ukdy.mongodb.net/?retryWrites=true&w=majority`;
  
    
    try{
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    }catch(error){
        console.log('Error while connecting to the database ', error);
    }
}
export default Connection;      