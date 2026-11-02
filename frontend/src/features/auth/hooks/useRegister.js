import { useState } from "react";
import { registerUser } from "../api/auth.api";



function useRegister() {
    const [loading,setLoading]=useState(false)
    const[error,setError]=useState(null)

    const register=async(data)=>{
        try {
            setLoading(true)
            setError(null)
            const response=await registerUser(data)
            return response; // form can use this response 
        } catch (error) {
            const message=error.response?.data?.message|| "Register failed! please try again"
            setError(message)
            return null;// registration failed and there is no successful result to return.
            
        }
        finally{
            setLoading(false)
        }
    }

    const clearError=()=>{
        setError(null)
    }
  return {
    register,loading,error,clearError
  }
}

export default useRegister