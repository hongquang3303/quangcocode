import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://hqtd3303:2200004519@cluster0.jg2we.mongodb.net/food-demo').then(()=>console.log("DB Connected"));

}