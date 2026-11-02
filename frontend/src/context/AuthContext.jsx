import { createContext, useEffect, useState } from "react" // creates a Context object that we can use to share information between components.
import { setAccessToken } from "../lib/axios"
import { refreshToken ,getMe , loginUser , logoutUser,logoutAll as logoutAllApi} from "../features/auth/api/auth.api"



export const AuthContext=createContext(null)
export function AuthProvider({children}){
        const [user,setUser]=useState(null)
        const [loading,setLoading]=useState(true)
        const isAuthenticated=Boolean(user)

        // check authentication when app start
        useEffect(()=>{
            const initializeAuth=async ()=>{
                try {
                    const tokenResponse=await refreshToken()   // 1 new access token
                    setAccessToken(tokenResponse.accessToken)// 2 store  access token
                    const userResponse=await getMe() // 3 get current user
                    setUser(userResponse.user)// 4 store user info 
                } catch (error) {
                    setAccessToken(null)
                    setUser(null)
                    
                }
                finally{
                    setLoading(false)
                }
            }
            initializeAuth()
        },[])
            // login 
        const login =async (data)=>{
            const response =await loginUser(data)// 1-send to backend
            setAccessToken(response.accessToken)// 2- set token
            const userResponse=await getMe() // 3- fetch user
            setUser(userResponse.user) // store Info 
            return userResponse.user
        }
        // logout 
        const logout=async()=>{
            try {
                await logoutUser()          
            }
            finally{
                    // clear frontend authentication 
                    setAccessToken(null)
                    setUser(null)            }
        }
        // logout all
        const logoutAll=async()=>{
            try{
                await logoutAllApi()
            }
            finally{
                setAccessToken(null)
                setUser(null)
            }
        }
         

        const value={
            user,
            isAuthenticated,
            loading,
            login,
            logout,
            logoutAll
        }
        return(
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        )

}