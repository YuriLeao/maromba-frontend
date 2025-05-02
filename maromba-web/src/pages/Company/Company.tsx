import "./Company.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { AutoComplete } from "../../components/AutoComplete/AutoComplete";
import { Select } from "../../components/Select/Select";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { CompanyModel } from "../../models/CompanyModel";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";
import { CompanyService } from "../../services/CompanyService";
import { useEffect, useState } from "react";
import { cnpjMask, phoneMask } from "../../Masks/mask";

export function Company() {
	const navigate = useNavigate();
	const location = useLocation();
	const userLocal = getUserLocalStorage();
	const companyService = new CompanyService();
	const titlePage = location.state.titlePage;
	const labelButton = location.state.labelButton;
	const companyEdit = location.state.companyEdit;
	const disableBack = location.state.disableBack || false;

	let defaultValues: CompanyModel | undefined;
	if (companyEdit !== undefined) {
		defaultValues = {
			id: companyEdit.id,
			name: companyEdit.name,
			cnpj: cnpjMask(companyEdit.cnpj),
			email: companyEdit.email,
			stateRegistration: companyEdit.stateRegistration,
			phoneNumber: phoneMask(companyEdit.phoneNumber),
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
	} = useForm<CompanyModel>({ defaultValues });

	useEffect(() => {
		if (companyEdit) {
			reset(defaultValues);
		}
	}, [companyEdit, reset]);

	const onSubmit = async (form: CompanyModel) => {
		const company: CompanyModel = {
			id: form.id,
			name: form.name,
			cnpj: form.cnpj
				.replaceAll(".", "")
				.replaceAll("-", "")
				.replaceAll("/", ""),
			email: form.email,
			stateRegistration: form.stateRegistration,
			phoneNumber: form.phoneNumber
				.replaceAll("(", "")
				.replaceAll(")", "")
				.replaceAll("-", "")
				.replaceAll(" ", ""),
		};

		if (companyEdit !== undefined) {
			update(company);
		} else {
			save(company);
		}
	};

	const update = async (company: CompanyModel) => {
		if (userLocal) {
			await companyService
				.update(company, userLocal.token)
				.then((response) => {
					navigate("/menu/companies");
				})
				.catch((error) => {
					try {
						if (error.response.status === 403) {
							navigate("/");
						}
						throw error.response.data.error_message;
					} catch (error) {
						throw (
							"Erro ao atualizar empresa, por favor tente novamente mais tarde. \n" +
							error
						);
					}
				});
		} else {
			navigate("/");
		}
	};

	const save = async (company: CompanyModel) => {
		if (userLocal) {
			await companyService
				.save(company, userLocal.token)
				.then((response) => {
					navigate("/menu/companies");
				})
				.catch((error) => {
					try {
						if (error.response.status === 403) {
							navigate("/");
						}
						throw error.response.data.error_message;
					} catch (error) {
						throw (
							"Erro ao salvar empresa, por favor tente novamente mais tarde. \n" +
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
							name="cnpj"
							register={register}
							type="cnpj"
							label="CNPJ"
							minLength={14}
							setValue={setValue}
							value={getValues("cnpj")}
							clearErrors={clearErrors}
							required={true}
							error={errors.cnpj ? true : false}
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
						<Input
							name="stateRegistration"
							register={register}
							type="input"
							label="Inscrição Estadual"
							setValue={setValue}
							value={getValues("stateRegistration")}
							clearErrors={clearErrors}
							required={true}
							error={errors.stateRegistration ? true : false}
						/>
					</div>
					<div className="buttons-div">
						{!disableBack && (
							<button
								className="second-button"
								title="Voltar"
								onClick={() => navigate("/menu/companies")}
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
