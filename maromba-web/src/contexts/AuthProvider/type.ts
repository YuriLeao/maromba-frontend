import { UserModel } from "../../models/UserModel";

export interface IUser {
    user?: UserModel | undefined;
}

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}