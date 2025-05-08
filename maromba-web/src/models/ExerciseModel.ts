import { MuscleGroupModel } from "./MuscleGroupModel";

export interface ExerciseModel {
	id: string;
	name: string;
	gif: string;
	muscleGroup: MuscleGroupModel;
}
