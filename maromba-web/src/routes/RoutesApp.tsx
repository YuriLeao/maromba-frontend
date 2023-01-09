import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { ProtectedRoutes } from "../components/ProtectedRoute";
import { AuthProvider } from "../contexts/AuthProvider";
import { Login } from "../pages/Login/Login";
import { Menu } from "../pages/Menu/Menu";

export function RoutesApp() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/inicial" element={
                        <ProtectedRoutes >
                            <Menu />
                        </ProtectedRoutes>
                    } >
                    </Route>
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}