import mongoose from "mongoose";

const sessionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user is required"]
    },
    refreshTokenHash:{
        type:String,
        required:[true,"refresh token hash required!"]
    },
    ip:{
        type:String,
        required:[true,"Ip is required!"]
    },
    userAgent:{
        type:String,
        required:[true,"UserAgent is required!"]
    },
    tokenVersion: {
    type: Number,
    default: 0
},
    revoked:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})

const SessionModel=mongoose.model("sessions",sessionSchema)

export default SessionModel;