import { CompanyModel } from "../models/CompanyModel";
import { Pageable } from "../models/Pageable";
import { api } from "./api";

export class CompanyService {

	async getAll(token: string) {
		try {
			const response = await api
				.get<Pageable<CompanyModel>>('/company-service/getAll', {
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

	async getById(id:string, token: string) {
		try {
			const response = await api
				.get<CompanyModel>(`/company-service/getById/${encodeURIComponent(id)}`, {
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

	async save(user: CompanyService, token: string) {
		try {
			const response = await api
				.post<string>('/company-service/save', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: {
						user
					}
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
