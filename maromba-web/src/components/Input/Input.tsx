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
	const [visible, setVisible] = useState(false);

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

	const passwordVisibilityChange = () => {
		setVisible(!visible);
	};

	return (
		<div className={"text-box" + (icon == undefined ? " unIcon" : "")}>
			<input
				id={name}
				type={type == "number" ? "input" : type == "password" && visible ? "text" : type}
				{...register?.(
					name,
					required == true ? { required: true } : { required: false }
				)}
				onChange={(e) => onChange(e, name, type)}
				style={
					icon == undefined
						? { padding: "0px 0px 0px 5px" }
						: { padding: "0px 25px 0px 5px" }
				}
				className={(valueInput ? " has-value" : "") + (error ? " invalid" : "")}
			/>
			{type !== "password" ? (
				<span className="material-symbols-outlined">{icon}</span>
			) : (
				<span className="material-symbols-outlined" onClick={passwordVisibilityChange}>
					{visible ? "visibility" : "visibility_off"}
				</span>
			)}
			<label htmlFor={name} style={{ left: "5px" }}>
				{label}
			</label>
		</div>
	);
};
