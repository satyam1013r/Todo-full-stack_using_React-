import userModel from "../models/user.model.js";
import config from "../config/config.js"
import bcrypt from "bcrypt"
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken"
import SessionModel from "../models/session.model.js";



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
    // Refresh Token
    const refreshToken=jwt.sign({id:user._id,jti: randomUUID()},config.JWT_SECRET,{expiresIn:"7d"})
    const refreshTokenHash=await bcrypt.hash(refreshToken,10)
    //session 
    const session=await SessionModel.create({
        user:user._id,
        refreshTokenHash,
        ip:req.ip,
        userAgent:req.headers["user-agent"]
    })

    // access token 
        const accessToken=jwt.sign(
            {
                id:user._id,
                sessionId:session._id,
                tokenVersion: session.tokenVersion
            },
            config.JWT_SECRET,
            {
                expiresIn:"10m"
            } 
         )
         // cookies
         res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
         })
         

    // send final response 
    return res.status(200).json({message:"Login successfully",accessToken})
    } catch (error) {
        console.error("Login error:",error)
        return res.status(500).json({message:"Internal Server Error!"})
    }
}
// fetch user info
export async function getMe(req,res){
    res.set("Cache-Control", "no-store");
    try {       
        const user= await userModel.findById(req.user.id) //  <-authcontroller 
        if(!user){
            return res.status(404).json({message:"User Not Found!"})
        }
        return res.status(200).json({message:"user fetch successfully",
            user:{
                username:user.username,
                email:user.email
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
        
    }
}


export async function refreshToken(req,res){
    try {
        const refreshToken=req.cookies.refreshToken
        if(!refreshToken){
            return res.status(401).json({message:"Refresh Token not Found!"})
        }
        const decode=jwt.verify(refreshToken,config.JWT_SECRET)
       
        // fine All session  that has not been  revoked yet(find all user)
        const sessions= await SessionModel.find({
            user:decode.id,
            revoked:false
        })
        let session =null;
        for (const item of sessions){
            // check token match 
          const isValid=await bcrypt.compare(refreshToken,item.refreshTokenHash)
            if(isValid){
            session=item
            break;
        }
        }
        
        if(!session){
            return res.status(401).json({message:"invalid refresh Token"})
        }
        // so keep track of session (when generaete new access token so we know which session a and b session same but have diff version)
        // 0 version old 1 version new so 0 version get rejected and 1 version accepted
        session.tokenVersion += 1;
        await session.save();
      
        // create tokens
        const accessToken=jwt.sign(
            {
                id:decode.id,
                sessionId:session._id,
                tokenVersion: session.tokenVersion
            },
            config.JWT_SECRET,
            {expiresIn:"10m"}
        )

        const newRefreshToken=jwt.sign(
            {
                id: decode.id,
                jti: randomUUID()
            },config.JWT_SECRET,{expiresIn:"7d"}
        )
        const newRefreshTokenHash=await bcrypt.hash(newRefreshToken,10)
        // update session and send cookie with new access and refresh token
        session.refreshTokenHash = newRefreshTokenHash;
        await session.save();

        res.cookie("refreshToken",newRefreshToken,{
             httpOnly: true,
             secure: false,
             sameSite: "strict",
             maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        return res.status(200).json({
            message:"Access token refreshed successfully",
            accessToken
        })


        
    } catch (error) {
       if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError" ||
        error.name === "NotBeforeError"
    ) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }

    console.error(error);

    return res.status(500).json({
        message: "Internal Server Error"
    });    
    }

}

export async function logout(req,res){
    try {
        const refreshToken=req.cookies.refreshToken
        if(!refreshToken){
            return res.status(401).json({message:"Invalid token"})
        }
        const decode=jwt.verify(refreshToken,config.JWT_SECRET)
        const sessions=await SessionModel.find({
            user:decode.id,
            revoked:false
        })
         if(sessions.length===0){// if no session found it return empty error 
            return res.status(401).json({message:"invalid refresh Token"})
        }
        let session =null;
        for (const item of sessions){
            // check token match 
          const isValid=await bcrypt.compare(refreshToken,item.refreshTokenHash)
            if(isValid){
            session=item
            break;
        }
        }
        if (!session) {
            return res.status(401).json({
            message: "Invalid refresh token"
    });
}
        session.revoked=true
        await session.save()
        
        
       res.clearCookie("refreshToken")
       
       return res.status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        console.log(error)
        return res.status(403).json({message:"Failed"})
    }
}
export async function logoutAll(req,res){// use protected routes 
     try {
        await SessionModel.updateMany(
            {
                user: req.user.id,
                revoked: false
            },
            {
                $set: { revoked: true }
            }
        );

        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "Logged out from all devices successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}