import {Navigate , Outlet} from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function ProtectedRoute(){
    const {isAuthenticated,loading} = useAuth()
    if(loading){
        return <p>Checking Authentication......</p>
    }
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}

export default ProtectedRoute