import axios from "axios"
const api=axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true,
})

//1-    access token 
let accessToken=null
// 2-   update
export const setAccessToken=(token)=>{
    accessToken=token;
}
//3-    attach with response
    api.interceptors.request.use((config)=>{
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`
        }
        return config
    })

export default api 