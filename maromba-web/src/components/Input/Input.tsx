import { useEffect, useInsertionEffect, useState } from "react";
import { cpfMask, numberMask, phoneMask } from "../../Masks/mask";
import "./Input.css";
import "../ComponentsStyle.css";
import {
	FieldValues,
	UseFormClearErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";

interface Props {
	type:
		| "email"
		| "input"
		| "text"
		| "password"
		| "cpf"
		| "phone"
		| "date"
		| "select"
		| "number"
		| undefined;
	register?: UseFormRegister<any>;
	label: string;
	icon?: string;
	name: string;
	error?: boolean;
	required?: boolean;
	setValue?: UseFormSetValue<any>;
	value?: any;
	clearErrors?: UseFormClearErrors<any>;
	onChangeParent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
	type,
	register,
	label,
	icon,
	name,
	error,
	setValue,
	value,
	required,
	clearErrors,
	onChangeParent,
}: Props) => {
	const [valueInput, setValueInput] = useState(value);

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		name: string,
		type: string | undefined
	) => {
		var value = e.target.value;
		if (type === "phone") {
			value = phoneMask(value);
		} else if (type === "cpf") {
			value = cpfMask(value);
		} else if (type === "number") {
			value = numberMask(value);
		}

		clearErrors?.(name);
		setValueInput(value);
		setValue?.(name, value);

		onChangeParent?.(e);
	};

	return (
		<div className={"text-box" + (icon == undefined ? " unIcon" : "")}>
			<input
				id={name}
				type={type == "number" ? "input" : type}
				{...register?.(
					name,
					required == true ? { required: true } : { required: false }
				)}
				onChange={(e) => onChange(e, name, type)}
				style={
					icon == undefined
						? { padding: "0px 0px 0px 5px" }
						: { padding: "0px 0px 0px 40px" }
				}
				className={(valueInput ? " has-value" : "") + (error ? " invalid" : "")}
			/>
			<span
				style={
					icon == undefined ? { display: "none" } : { display: "inline-block" }
				}
				className="material-symbols-outlined"
			>
				{icon}
			</span>
			<label
				htmlFor={name}
				style={icon == undefined ? { left: "0px" } : { left: "40px" }}
			>
				{label}
			</label>
		</div>
	);
};
