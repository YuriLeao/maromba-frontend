import "./User.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { AutoComplete } from "../../components/AutoComplete/AutoComplete";
import { Select } from "../../components/Select/Select";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { UserModel } from "../../models/UserModel";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";
import { UserService } from "../../services/UserService";
import { useEffect, useState } from "react";
import { GenderModel } from "../../models/GenderModel";
import { AuthorizationModel } from "../../models/AuthorizationModel";
import { CompanyService } from "../../services/CompanyService";
import { CompanyModel } from "../../models/CompanyModel";
import { cpfMask, phoneMask } from "../../Masks/mask";
import { GenderService } from "../../services/GenderService";
import { AuthorizationService } from "../../services/AuthorizationService";

export function User() {
	const [genders, setGenders] = useState<GenderModel[]>(
		new Array<GenderModel>()
	);
	const [authorizations, setAuthorizations] = useState<AuthorizationModel[]>(
		new Array<AuthorizationModel>()
	);
	const [companys, setCompanys] = useState<CompanyModel[]>(
		new Array<CompanyModel>()
	);

	const navigate = useNavigate();
	const location = useLocation();
	const userLocal = getUserLocalStorage();
	const userService = new UserService();
	const genderService = new GenderService();
	const authorizationService = new AuthorizationService();
	const companyService = new CompanyService();
	const titlePage = location.state.titlePage;
	const labelButton = location.state.labelButton;
	const userEdit = location.state.userEdit;
	const disableBack = location.state.disableBack || false;

	let defaultValues: UserModel | undefined;
	if (userEdit !== undefined) {
		defaultValues = {
			id: userEdit.id,
			name: userEdit.name,
			cpf: cpfMask(userEdit.cpf),
			gender: userEdit.gender,
			phoneNumber: phoneMask(userEdit.phoneNumber),
			weight: userEdit.weight.toString().replaceAll(".", ","),
			companyId: userEdit.companyId,
			company: userEdit.company,
			authorization: userEdit.authorization,
			birthDate: userEdit.birthDate,
			email: userEdit.email,
			token: "",
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
	} = useForm<UserModel>({ defaultValues });

	useEffect(() => {
		if (userEdit) {
			reset(defaultValues);
		}
	}, [userEdit, reset]);

	useEffect(() => {
		const getAllGenders = async () => {
			if (userLocal) {
				await genderService
					.getAll(userLocal.token)
					.then((response) => {
						setGenders(response);
					})
					.catch((error) => {
						try {
							if (error.response.status === 403) {
								navigate("/");
							}
							throw error.response.data.error_message;
						} catch (error) {
							throw (
								"Erro ao buscar genêros, por favor tente novamente mais tarde. \n" +
								error
							);
						}
					});
			} else {
				navigate("/");
			}
		};

		const getAllAuthorizations = async () => {
			if (userLocal) {
				await authorizationService
					.getAll(userLocal.token)
					.then((response) => {
						setAuthorizations(response);
					})
					.catch((error) => {
						try {
							throw error.response.data.error_message;
						} catch (error) {
							throw (
								"Erro ao buscar autorizações, por favor tente novamente mais tarde. \n" +
								error
							);
						}
					});
			} else {
				navigate("/");
			}
		};

		const getAllCompanys = async () => {
			if (userLocal) {
				await companyService
					.getAll(userLocal.token)
					.then((response) => {
						setCompanys(response.content);
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

		getAllAuthorizations();
		getAllGenders();
		getAllCompanys();
	}, []);

	const onSubmit = async (form: UserModel) => {
		const user: UserModel = {
			id: form.id,
			name: form.name,
			cpf: form.cpf.replaceAll(".", "").replaceAll("-", ""),
			gender: form.gender,
			phoneNumber: form.phoneNumber
				.replaceAll("(", "")
				.replaceAll(")", "")
				.replaceAll("-", "")
				.replaceAll(" ", ""),
			weight: Number.parseFloat(form.weight.toString().replaceAll(",", ".")),
			companyId: form.company.id,
			company: form.company,
			authorization: form.authorization,
			birthDate:
				typeof form.birthDate === "string"
					? form.birthDate
					: (() => {
							const date = new Date(form.birthDate);
							return `${date.getDate().toString().padStart(2, "0")}/${(
								date.getMonth() + 1
							)
								.toString()
								.padStart(2, "0")}/${date.getFullYear()}`;
					  })(),
			email: form.email,
			token: "",
		};

		if (userEdit !== undefined) {
			console.log(user);
			update(user);
		} else {
			save(user);
		}
	};

	const update = async (user: UserModel) => {
		if (userLocal) {
			await userService
				.update(user, userLocal.token)
				.then((response) => {
					navigate("/menu/users");
				})
				.catch((error) => {
					try {
						if (error.response.status === 403) {
							navigate("/");
						}
						throw error.response.data.error_message;
					} catch (error) {
						throw (
							"Erro ao atualizar usuário, por favor tente novamente mais tarde. \n" +
							error
						);
					}
				});
		} else {
			navigate("/");
		}
	};

	const save = async (user: UserModel) => {
		if (userLocal) {
			await userService
				.save(user, userLocal.token)
				.then((response) => {
					navigate("/menu/users");
				})
				.catch((error) => {
					try {
						if (error.response.status === 403) {
							navigate("/");
						}
						throw error.response.data.error_message;
					} catch (error) {
						throw (
							"Erro ao salvar usuário, por favor tente novamente mais tarde. \n" +
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
							name="cpf"
							register={register}
							type="cpf"
							label="CPF"
							minLength={14}
							setValue={setValue}
							value={getValues("cpf")}
							clearErrors={clearErrors}
							required={true}
							error={errors.cpf ? true : false}
						/>
						<Input
							name="email"
							register={register}
							type="email"
							label="Email"
							setValue={setValue}
							value={getValues("email")}
							clearErrors={clearErrors}
							required={true}
							error={errors.email ? true : false}
						/>
						<Input
							name="phoneNumber"
							register={register}
							type="phone"
							label="Celular"
							minLength={15}
							setValue={setValue}
							value={getValues("phoneNumber")}
							clearErrors={clearErrors}
							required={true}
							error={errors.phoneNumber ? true : false}
						/>
						<Select
							name="gender"
							register={register}
							setValue={setValue}
							value={getValues("gender")}
							clearErrors={clearErrors}
							label="Gênero"
							list={genders}
							required={true}
							error={errors.gender ? true : false}
						/>
						<Input
							name="weight"
							register={register}
							type="number"
							label="Peso"
							minLength={2}
							setValue={setValue}
							value={getValues("weight")}
							clearErrors={clearErrors}
							required={true}
							error={errors.weight ? true : false}
						/>
						<DatePicker
							name="birthDate"
							register={register}
							setValue={setValue}
							value={getValues("birthDate")}
							clearErrors={clearErrors}
							label="Data de nascimento"
							required={true}
							error={errors.birthDate ? true : false}
						/>
						<Select
							name="authorization"
							register={register}
							setValue={setValue}
							value={getValues("authorization")}
							clearErrors={clearErrors}
							label="Autorização"
							list={authorizations}
							required={true}
							error={errors.authorization ? true : false}
						/>
						<AutoComplete
							name="company"
							register={register}
							setValue={setValue}
							value={getValues("company")}
							clearErrors={clearErrors}
							label="Empresa"
							list={companys}
							required={true}
							icon="search"
							error={errors.company ? true : false}
						/>
					</div>
					<div className="buttons-div">
						{!disableBack && (
							<button
								className="second-button"
								title="Voltar"
								onClick={() => navigate("/menu/users")}
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
