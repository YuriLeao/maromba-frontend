import "./Exercise.css";
import "./exercises.css";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table/Table";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import { ExerciseService } from "../../services/ExerciseService";
import { ExerciseModel } from "../../models/ExerciseModel";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";

interface Column {
	key: string;
	label: string;
}

export function Exercises() {
	const navigate = useNavigate();
	const userLocal = getUserLocalStorage();
	const exerciseService = new ExerciseService();

	const columns: Column[] = [
		{ key: "name", label: "Nome" },
		{ key: "muscleGroup", label: "Grupo Muscular" },
	];

	const [exercises, setExercises] = useState<ExerciseModel[]>([]);

	useEffect(() => {
		const getAll = async () => {
			if (userLocal) {
				await exerciseService
					.getAll(userLocal.token)
					.then((response) => {
						setExercises(response.content);
						setFilterSearch(response.content);
					})
					.catch((error) => {
						try {
							if (error.response.status === 403) {
								navigate("/");
							}
							throw error.response.data.error_message;
						} catch (error) {
							throw (
								"Erro ao buscar exercícios, por favor tente novamente mais tarde. \n" +
								error
							);
						}
					});
			} else {
				navigate("/");
			}
		};

		getAll();
	}, []);

	const [filterSearch, setFilterSearch] = useState<ExerciseModel[]>(exercises);

	const handleEdit = (id: string) => {
		const exerciseEdit = exercises.find(item => item.id === id);

		navigate("/menu/exercise", {
			state: { titlePage: "Editar exercício", labelButton: "Editar", exerciseEdit: exerciseEdit },
		});
	};

	const handleDelete = (id: string) => {
		deleteExercise(id);
	};

	const deleteExercise = async (id: string) => {
		if (userLocal) {
			await exerciseService
				.delete(id, userLocal.token)
				.then((response) => {
					setExercises((prevData) => prevData.filter((item) => item.id !== id));
					setFilterSearch((prevData) => prevData.filter((item) => item.id !== id));
				})
				.catch((error) => {
					try {
						if (error.response.status === 403) {
							navigate("/");
						}
						throw error.response.data.error_message;
					} catch (error) {
						throw (
							"Erro ao deletar usuário, por favor tente novamente mais tarde. \n" +
							error
						);
					}
				});
		} else {
			navigate("/");
		}
	}

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: ExerciseModel[] = exercises.filter((item) => {
			return (item.name as string)
				.toLowerCase()
				.includes(e.target.value.toLowerCase());
		});

		setFilterSearch(newFilter);
	};

	const handleNew = () => {
		navigate("/menu/exercise", {
			state: { titlePage: "Criar exercício", labelButton: "Criar" },
		});
	};

	return (
		<>
			<div className="panel">
				<div className="exercises-form" style={{ overflow: "unset" }}>
					<h1>Exercícios</h1>
					<div className="search-new-div">
						<Input
							name="searchInput"
							type="input"
							label="Filtrar"
							onChangeParent={handleFilterChange}
						/>
						<button
							className="material-symbols-outlined pointer new-button"
							title="Criar exercício"
							onClick={handleNew}
						>
							{"add"}
						</button>
					</div>
					<Table
						columns={columns}
						data={filterSearch}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				</div>
			</div>
		</>
	);
}
