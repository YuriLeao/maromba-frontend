import { ExerciseModel } from "../models/ExerciseModel";
import { Pageable } from "../models/Pageable";
import { api } from "./api";

export class ExerciseService {
	async getAllByCompanyId(token: string, companyId: string | null) {
		try {

			const params: Record<string, string> = {};
		
			if (companyId != null) {
				params['companyId'] = companyId;
			}
	
			const response = await api
				.get<Pageable<ExerciseModel>>('/exercise-service/getAllByCompanyId', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: params,
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
				.get<ExerciseModel>(`/exercise-service/getById/${encodeURIComponent(id)}`, {
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

	async save(exercise: ExerciseModel, token: string) {
		try {
			const response = await api
				.post<string>('/exercise-service/save', exercise,
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

	async update(exercise: ExerciseModel, token: string) {
		try {
			const response = await api
				.put<string>(
					`/exercise-service/update/${encodeURIComponent(exercise.id)}`, exercise,
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
					`/exercise-service/delete/${encodeURIComponent(id)}`,
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
