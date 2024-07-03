import { createContext, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./type";
import { LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();

    async function authenticate(email: string, password: string) {
        const response = await LoginRequest(email, password);

        const payload = { token: response.token, email: response.email, empresaId: response.empresaId };

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