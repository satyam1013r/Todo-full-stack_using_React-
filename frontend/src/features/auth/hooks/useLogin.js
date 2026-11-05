import { useAuth } from "../../../hooks/useAuth.js";
import { useState } from "react";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {login}=useAuth();
  const handleLogin=async(data)=>{
    try{
        setLoading(true)
        setError(null)
        const user=await login(data)
        return user;
    }
    catch(error){
         const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

      setError(message);

      return null;
    }
    finally{
        setLoading(false)
    }
  }
  return {
    handleLogin,
    loading,
    error,
  };
}

export default useLogin;
