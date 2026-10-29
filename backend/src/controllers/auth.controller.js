import userModel from "../models/user.model.js";
import config from "../config/config.js"
import bcrypt from "bcrypt"




export async function register(req,res) {
   try {
     // recieve info 
    const {username,email,password}=req.body
    const isAlreadyRegister=await userModel.findOne({
        $or:[{username},{email}]
    })
    if(isAlreadyRegister){
        return res.status(409).json({
            message:"Email or username already exist"
        })
    }
    
    // hash password
    const hashedPassword=await bcrypt.hash(password,10)

    // create user
    const user=await userModel.create({
        username,
        email,
        password:hashedPassword
    })

    return res.status(201).json({
        message:"user create successfully",
            user:{
                username:user.username,
                email:user.email
            }
        
    })
   } catch (error) {
    return res.status(500).json({
        message:"Internal Server Error!"
    })
   }
}

export async function login(req,res){
    try {
        const {email,password}=req.body
        const user= await userModel.findOne({email})
    if(!user){
        return res.status(401).json({message:"Invalid Email or username"})
    }
    // hash the password 
   const isValidPassword = await bcrypt.compare(
    password,
    user.password
);
    if(!isValidPassword){
        return res.status(401).json({message:"Invalid Password"})
    }

    return res.status(200).json({message:"Login successfully"})
    } catch (error) {
        console.error("Login error:",error)
        return res.status(500).json({message:"Internal Server Error!"})
    }
}