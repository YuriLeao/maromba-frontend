import "./User.css";
import "./Users.css";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table/Table";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import { UserService } from "../../services/UserService";
import { UserModel } from "../../models/UserModel";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";

interface Column {
	key: string;
	label: string;
}

export function Users() {
	const navigate = useNavigate();
	const userLocal = getUserLocalStorage();
	const userService = new UserService();

	const columns: Column[] = [
		{ key: "name", label: "Nome" },
		{ key: "cpf", label: "CPF" },
		{ key: "birthDate", label: "Data de nascimento" },
	];

	const [users, setUsers] = useState<UserModel[]>([]);

	useEffect(() => {
		const getUsersByCompanyIdAuthorization = async () => {
			if (userLocal) {
				await userService
					.getByCompanyIdAuthorization(userLocal.companyId, userLocal.token)
					.then((response) => {
						setUsers(response.content);
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
								"Erro ao buscar usuários, por favor tente novamente mais tarde. \n" +
								error
							);
						}
					});
			} else {
				navigate("/");
			}
		};

		getUsersByCompanyIdAuthorization();
	}, []);

	const [filterSearch, setFilterSearch] = useState<UserModel[]>(users);

	const handleEdit = (id: string) => {
		const userEdit = users.find(item => item.id === id);

		navigate("/menu/user", {
			state: { titlePage: "Editar usuário", labelButton: "Editar", userEdit: userEdit },
		});
	};

	const handleDelete = (id: string) => {
		deleteUser(id);
	};

	const deleteUser = async (id: string) => {
		if (userLocal) {
			await userService
				.delete(id, userLocal.token)
				.then((response) => {
					setUsers((prevData) => prevData.filter((item) => item.id !== id));
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
		const newFilter: UserModel[] = users.filter((item) => {
			return (item.name as string)
				.toLowerCase()
				.includes(e.target.value.toLowerCase());
		});

		setFilterSearch(newFilter);
	};

	const handleNew = () => {
		navigate("/menu/user", {
			state: { titlePage: "Criar usuário", labelButton: "Criar" },
		});
	};

	return (
		<>
			<div className="panel">
				<div className="users-form" style={{ overflow: "unset" }}>
					<h1>Usuários</h1>
					<div className="search-new-div">
						<Input
							name="searchInput"
							type="input"
							label="Filtrar"
							onChangeParent={handleFilterChange}
						/>
						<button
							className="material-symbols-outlined pointer new-button"
							title="Criar usuário"
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
