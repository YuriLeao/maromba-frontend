import { AuthorizationModel } from "../models/AuthorizationModel";
import { api } from "./api";

export class AuthorizationService {
	async getAll(token: string) {
		try {
			const response = await api
				.get<AuthorizationModel[]>("/authorization-service/getAll", {
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
