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

	async save(company: CompanyModel, token: string) {
		try {
			const response = await api
				.post<string>('/company-service/save', company,
				{
					headers: {
						Authorization: `Bearer ${token}`,
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

	async update(company: CompanyModel, token: string) {
		try {
			const response = await api
				.put<string>(
					`/company-service/update/${encodeURIComponent(company.id)}`, company,
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
					`/company-service/delete/${encodeURIComponent(id)}`,
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

}
