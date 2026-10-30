import mongoose from "mongoose";

const todoSchema= new mongoose.Schema({
    text:{
        type:String,
        required:true,
        trim:true
        
    },
    completed:{
        type:Boolean,
        default:false
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"medium"
    },
    dueDate:{
        type:Date,
        default:null
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }



},{timestamps:true})

const TodoModel=mongoose.model("Task",todoSchema)

export default TodoModel;