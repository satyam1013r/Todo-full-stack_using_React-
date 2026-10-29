import mongoose from "mongoose";
import config from "./config.js";
import dns from "node:dns"

// Use Google's DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDb=async()=>{
    try {
        await mongoose.connect(config.MONGO_URL)
        console.log("DB connect successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;