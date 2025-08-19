
import mongoose from 'mongoose';
import { serverConfig } from '.';

export async function connectDB(){

    try{
       
        await mongoose.connect(serverConfig.MONGO_URI)
        console.log('Connected to MongoDb');
    }
    catch(error){
          console.log('Error connecting to MongoDb' , error)
          throw error ;
    }
}