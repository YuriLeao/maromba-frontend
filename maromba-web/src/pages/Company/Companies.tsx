import "./Company.css";
import "./companies.css";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table/Table";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import { CompanyService } from "../../services/CompanyService";
import { CompanyModel } from "../../models/CompanyModel";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";

interface Column {
	key: string;
	label: string;
}

export function Companies() {
	const navigate = useNavigate();
	const userLocal = getUserLocalStorage();
	const companyService = new CompanyService();

	const columns: Column[] = [
		{ key: "name", label: "Nome" },
		{ key: "cnpj", label: "CNPJ" },
		{ key: "email", label: "Email" },
	];

	const [companies, setCompanies] = useState<CompanyModel[]>([]);

	useEffect(() => {
		const getAll = async () => {
			if (userLocal) {
				await companyService
					.getAll(userLocal.token)
					.then((response) => {
						setCompanies(response.content);
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
								"Erro ao buscar empresas, por favor tente novamente mais tarde. \n" +
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

	const [filterSearch, setFilterSearch] = useState<CompanyModel[]>(companies);

	const handleEdit = (id: string) => {
		const companyEdit = companies.find(item => item.id === id);

		navigate("/menu/company", {
			state: { titlePage: "Editar empresa", labelButton: "Editar", companyEdit: companyEdit },
		});
	};

	const handleDelete = (id: string) => {
		deleteCompany(id);
	};

	const deleteCompany = async (id: string) => {
		if (userLocal) {
			await companyService
				.delete(id, userLocal.token)
				.then((response) => {
					setCompanies((prevData) => prevData.filter((item) => item.id !== id));
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
		const newFilter: CompanyModel[] = companies.filter((item) => {
			return (item.name as string)
				.toLowerCase()
				.includes(e.target.value.toLowerCase());
		});

		setFilterSearch(newFilter);
	};

	const handleNew = () => {
		navigate("/menu/company", {
			state: { titlePage: "Criar empresa", labelButton: "Criar" },
		});
	};

	return (
		<>
			<div className="panel">
				<div className="companies-form" style={{ overflow: "unset" }}>
					<h1>Empresas</h1>
					<div className="search-new-div">
						<Input
							name="searchInput"
							type="input"
							label="Filtrar"
							onChangeParent={handleFilterChange}
						/>
						<button
							className="material-symbols-outlined pointer new-button"
							title="Criar empresa"
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
