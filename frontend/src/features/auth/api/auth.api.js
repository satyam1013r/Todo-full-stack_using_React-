import api from "../../../lib/axios";
let refreshPromise = null; // use in refresh token (to solve duplicate problem)

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
    const response=await api.get("/v1/auth/getMe")
    return response.data
}
// refresh token 
export const refreshToken=async()=>{
    if(!refreshPromise){
        refreshPromise=(api.post("/v1/auth/refreshToken")).
        then((response)=>response.data).
        finally(()=>{
            refreshPromise=null;
        })
    }
    return refreshPromise;
}

// Logout 
export const logoutUser=async()=>{
    const response=await api.post("/v1/auth/logout")
    return response.data
}

export const logoutAll=async()=>{
    const response=await api.post("/v1/auth/logoutAll")
    return response.data
}