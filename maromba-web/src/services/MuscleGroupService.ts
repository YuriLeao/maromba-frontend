import { MuscleGroupModel } from "../models/MuscleGroupModel";
import { api } from "./api";

export class MuscleGroupService {
	async getAll(token: string) {
		try {
			const response = await api
				.get<MuscleGroupModel[]>('/muscleGroup-service/getAll', {
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
