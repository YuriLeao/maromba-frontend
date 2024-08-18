import { AuthorizationModel } from "../models/AuthorizationModel";
import { GenderModel } from "../models/GenderModel";
import { Pageable } from "../models/Pageable";
import { UserModel } from "../models/UserModel";
import { api } from "./api";

export class UserService {
	async login(email: string, password: string) {
		try {
			const response = await api
				.get<UserModel>(`/user-service/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`)
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					try {
						throw error.response.data.mensagem;
					} catch (errorGenerico) {
						throw "Erro ao efetuar login, por favor tente novamente mais tarde.";
					}
				});
			return response;
		} catch (error) {
			throw error;
		}
	}

	async getByCompanyIdAuthorization(companyId: string, token: string) {
		try {
			const response = await api
				.get<Pageable<UserModel>>(
					`/user-service/getByCompanyIdAuthorization/${encodeURIComponent(companyId)}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					throw error;
				});
			return response;
		} catch (error) {
			throw error;
		}
	}

	async save(user: UserModel, token: string) {
		try {
			const response = await api
				.post<string>(
					"/user-service/save", user,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						}
					}
				)
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					throw error;
				});
			return response;
		} catch (error) {
			throw error;
		}
	}

	async update(user: UserModel, token: string) {
		try {
			const response = await api
				.put<string>(
					`/user-service/update/${encodeURIComponent(user.id)}`, user,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						}
					}
				)
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					throw error;
				});
			return response;
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string, token: string) {
		try {
			const response = await api
				.delete<string>(
					`/user-service/delete/${encodeURIComponent(id)}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						}
					}
				)
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					throw error;
				});
			return response;
		} catch (error) {
			throw error;
		}
	}


	async getAllGenders(token: string) {
		try {
			const response = await api
				.get<GenderModel[]>("/user-service/getAllGenders", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					throw error;
				});
			return response;
		} catch (error) {
			throw error;
		}
	}

	async getAllAuthorizations(token: string) {
		try {
			const response = await api
				.get<AuthorizationModel[]>("/user-service/getAllAuthorizations", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					throw error;
				});
			return response;
		} catch (error) {
			throw error;
		}
	}
}
