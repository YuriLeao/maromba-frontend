import { createContext, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./type";
import { setUserLocalStorage } from "./util";
import { UserService } from "../../services/UserService";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();
    const userService = new UserService();

    async function authenticate(email: string, password: string) {
        const response = await userService.login(email, password);

        const payload = { token: response.token, email: response.email, empresaId: response.companyId, authorizations: response.authorizations};

        setUser(payload);
        setUserLocalStorage(payload);
    }

    function logout() {
        setUser(null);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}