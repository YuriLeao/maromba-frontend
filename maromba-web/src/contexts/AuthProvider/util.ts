import { IUser } from "./type";

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem("u", JSON.stringify(user?.user));
}

export function getUserLocalStorage() {
    const json = localStorage.getItem("u");

    if (!json) return null;

    const user = JSON.parse(json);

    return user ?? null;
}