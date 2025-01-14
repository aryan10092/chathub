
import mongoose from "mongoose";

const connectmongo = async () => {
    try {
        await mongoose.connect( process.env.dburl, { dbName: "ChatHub" });
        console.log("MongoDB connected ");
    } catch (error) {
        
        console.log(error)
    }
};

export default connectmongo;
