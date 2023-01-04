import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Menu } from "./pages/Menu";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/inicial" element={<Menu />} />
            </Routes>
        </Router>
    )
}