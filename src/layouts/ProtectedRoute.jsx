import { Navigate, Outlet } from "react-router-dom"



const ProtectedRoute = ({ isAuthenticated, children, adminRoute, isAdmin, redirect = "/login" }) => {


    if (!isAuthenticated) {
        return <Navigate to={redirect} />
    }

    return children ? children : <Outlet />



}

export default ProtectedRoute