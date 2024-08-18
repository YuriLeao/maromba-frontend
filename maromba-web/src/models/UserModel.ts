import { AuthorizationModel } from "./AuthorizationModel";
import { CompanyModel } from "./CompanyModel";
import { GenderModel } from "./GenderModel";

export interface UserModel {
	id: string;
	email: string;
	name: string;
	cpf: string;
	gender: GenderModel
	phoneNumber: string;
	weight: number;
	authorization: AuthorizationModel;
	companyId: string;
	company: CompanyModel;
	birthDate: string;
	token: string;
}