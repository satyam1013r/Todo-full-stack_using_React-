import { createBrowserRouter , Navigate} from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import TodoPage from "../features/todos/pages/TodoPage";

import ProtectedRoute from "../components/ProtectedRoute";
const router=createBrowserRouter([
    {
        path:"/",
        element:<Navigate to="/login" replace />// redirect to / to /login  (replace keep history)
    },
    {
        path:  "/login",
        element:<LoginPage/>
    },
    {
        path:  "/register",
        element:<RegisterPage/>
    },
    {
        element:<ProtectedRoute/>,
        children:[
            {
                path:"/todos",
                element:<TodoPage/>
            }
        ]
    }
    
])

export default router;