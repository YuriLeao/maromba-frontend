import { GenderModel } from "../models/GenderModel";
import { api } from "./api";

export class GenderService {
	async getAll(token: string) {
		try {
			const response = await api
				.get<GenderModel[]>("/gender-service/getAll", {
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
