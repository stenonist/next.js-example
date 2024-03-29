import mongoose from "mongoose";
 let isConnected = false;

 export const connectToDB = async ()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "nextjs-test"
        })

        isConnected = true;
        console.log("connected");
    } catch (error) {
        console.log(error);
    }
 }