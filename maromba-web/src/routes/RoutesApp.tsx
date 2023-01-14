import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { ProtectedRoutes } from "../components/ProtectedRoute";
import { AuthProvider } from "../contexts/AuthProvider";
import { Login } from "../pages/Login/Login";
import { Menu } from "../pages/Menu/Menu";
import { User } from "../pages/User/User";

export function RoutesApp() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/menu" element={
                        <ProtectedRoutes >
                            <Menu />
                        </ProtectedRoutes>
                    } >
                        <Route path="/menu/user" element={
                            <ProtectedRoutes >
                                <User />
                            </ProtectedRoutes>
                        } ></Route>
                    </Route>
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}