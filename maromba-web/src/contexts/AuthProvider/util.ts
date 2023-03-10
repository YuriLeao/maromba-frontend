import { api } from "../../services/api";
import { IUser } from "./type";

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
    const json = localStorage.getItem("u");

    if (!json) return null;

    const user = JSON.parse(json);

    return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
    try {
        const request = await api.get(`/login/${email}/${password}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                try {
                    throw error.response.data.mensagem;
                }
                catch (errorGenerico) {
                    throw "Erro ao efetuar login, por favor tente novamente mais tarde";
                }
            });
        return request;
    } catch (error) {
        throw error;
    }
}