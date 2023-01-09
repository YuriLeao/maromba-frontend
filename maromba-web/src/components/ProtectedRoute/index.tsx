import { Navigate } from "react-router-dom";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";


export const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const user = getUserLocalStorage();

    if (!user || (!user.email && !user.token)) {
        return <Navigate to="/" replace/>
    }

    return children;
};