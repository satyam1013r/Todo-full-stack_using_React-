import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//insted of writing useContext(AuthContext) in every component , we can used useAuth()

export function useAuth(){
    const context=useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context;
}