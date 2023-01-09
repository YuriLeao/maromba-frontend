import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/useAuth";

export function Menu() {
    const auth = useAuth();
    const navigate = useNavigate();

    const loggout = () => {
        auth.logout();
        navigate("/");
    };

    return (
    <><h1>Menu</h1><button onClick={loggout}>Logout</button></>
    );
};