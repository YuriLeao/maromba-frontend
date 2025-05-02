import "./Exercise.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { AutoComplete } from "../../components/AutoComplete/AutoComplete";
import { Select } from "../../components/Select/Select";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { ExerciseModel } from "../../models/ExerciseModel";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";
import { ExerciseService } from "../../services/ExerciseService";
import { useEffect, useState } from "react";
import { cnpjMask, phoneMask } from "../../Masks/mask";
import { MuscleGroupModel } from "../../models/MuscleGroupModel";
import { MuscleGroupService } from "../../services/MuscleGroupService";

export function Exercise() {
	const [muscleGroups, setMuscleGroups] = useState<MuscleGroupModel[]>(
		new Array<MuscleGroupModel>()
	);

	const navigate = useNavigate();
	const location = useLocation();
	const userLocal = getUserLocalStorage();
	const exerciseService = new ExerciseService();
	const muscleGroupService = new MuscleGroupService();
	const titlePage = location.state.titlePage;
	const labelButton = location.state.labelButton;
	const exerciseEdit = location.state.exerciseEdit;
	const disableBack = location.state.disableBack || false;

	let defaultValues: ExerciseModel | undefined;
	if (exerciseEdit !== undefined) {
		defaultValues = {
			id: exerciseEdit.id,
			name: exerciseEdit.name,
			gif: exerciseEdit.gif,
			muscleGroup: exerciseEdit.muscleGroup,
		};
	}

	const {
		register,
		handleSubmit,
		clearErrors,
		setValue,
		reset,
		getValues,
		formState: { errors },
	} = useForm<ExerciseModel>({ defaultValues });

	useEffect(() => {
		if (exerciseEdit) {
			reset(defaultValues);
		}
	}, [exerciseEdit, reset]);

	useEffect(() => {
		const getAllMuscleGroup = async () => {
			if (userLocal) {
				await muscleGroupService
					.getAll(userLocal.token)
					.then((response) => {
						setMuscleGroups(response);
					})
					.catch((error) => {
						try {
							if (error.response.status === 403) {
								navigate("/");
							}
							throw error.response.data.error_message;
						} catch (error) {
							throw (
								"Erro ao buscar grupos muscular, por favor tente novamente mais tarde. \n" +
								error
							);
						}
					});
			} else {
				navigate("/");
			}
		};

		getAllMuscleGroup();
	}, []);

	const onSubmit = async (form: ExerciseModel) => {
		const exercise: ExerciseModel = {
			id: form.id,
			name: form.name,
			gif: form.gif,
			muscleGroup: form.muscleGroup,
		};

		if (exerciseEdit !== undefined) {
			update(exercise);
		} else {
			save(exercise);
		}
	};

	const update = async (exercise: ExerciseModel) => {
		if (userLocal) {
			await exerciseService
				.update(exercise, userLocal.token)
				.then((response) => {
					navigate("/menu/exercises");
				})
				.catch((error) => {
					try {
						if (error.response.status === 403) {
							navigate("/");
						}
						throw error.response.data.error_message;
					} catch (error) {
						throw (
							"Erro ao atualizar exercício, por favor tente novamente mais tarde. \n" +
							error
						);
					}
				});
		} else {
			navigate("/");
		}
	};

	const save = async (exercise: ExerciseModel) => {
		if (userLocal) {
			await exerciseService
				.save(exercise, userLocal.token)
				.then((response) => {
					navigate("/menu/exercises");
				})
				.catch((error) => {
					try {
						if (error.response.status === 403) {
							navigate("/");
						}
						throw error.response.data.error_message;
					} catch (error) {
						throw (
							"Erro ao salvar exercício, por favor tente novamente mais tarde. \n" +
							error
						);
					}
				});
		} else {
			navigate("/");
		}
	};

	return (
		<>
			<div className="panel">
				<form className="form-container" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-content">
						<h1>{titlePage}</h1>
						<Input
							name="name"
							register={register}
							type="input"
							label="Nome"
							setValue={setValue}
							value={getValues("name")}
							clearErrors={clearErrors}
							required={true}
							error={errors.name ? true : false}
						/>
						<Input
							name="gif"
							register={register}
							type="text"
							label="GIF"
							minLength={5}
							setValue={setValue}
							value={getValues("gif")}
							clearErrors={clearErrors}
							required={true}
							error={errors.gif ? true : false}
						/>
						<Select
							name="muscleGroup"
							register={register}
							setValue={setValue}
							value={getValues("muscleGroup")}
							clearErrors={clearErrors}
							label="Grupo Muscular"
							list={muscleGroups}
							required={true}
							error={errors.muscleGroup ? true : false}
						/>
					</div>
					<div className="buttons-div">
						{!disableBack && (
							<button
								className="second-button"
								title="Voltar"
								onClick={() => navigate("/menu/exercises")}
							>
								Voltar
							</button>
						)}
						<button type="submit" className="main-button">
							{labelButton}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
