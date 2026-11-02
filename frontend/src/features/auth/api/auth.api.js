import api from "../../../lib/axios";

// register
export const registerUser=async (data)=>{
    const response=await api.post("/v1/auth/register",data)
    return response.data;
}
// login 
export const loginUser=async (data)=>{
    const response=await api.post("/v1/auth/login",data)
    return response.data;
}
// get current user
export const getMe=async ()=>{
    const response=await api.get("v1/auth/getMe")
    return response.data
}
// refresh token 
export const refreshToken=async()=>{
    const response=await api.post("v1/auth/refreshToken")
    return response.data
}

// Logout 
export const logoutUser=async()=>{
    const response=await api.post("v1/auth/logout")
    return response.data
}

export const logoutAll=async()=>{
    const response=await api.post("v1/auth/logoutAll")
    return response.data
}