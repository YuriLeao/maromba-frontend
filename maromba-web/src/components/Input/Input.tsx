import { useState } from "react";
import "./Input.css";

interface Props {
    type: 'email' | 'input' | 'text' | 'password' | 'cpf' | 'phone' | 'date' | 'select' | 'number' | undefined;
    register: any;
    label: string;
    icon?: string;
    name: string;
    erro: boolean;
    onChange?: any;
    required?: boolean;
}

export const Input = (({ type, register, label, icon, name, erro, onChange,required }: Props) => {
    const [value, setValue] = useState("");

    let classes: string = "";
    let divClasses: string = "textbox";
    let paramRegister = {required: false};

    if (required == true) {
        paramRegister.required =  true;
    }

    if (icon == undefined) {
        divClasses += " unIncon";
    }

    if (value) {
        classes += " has-value";
    }

    if (erro) {
        classes += " invalid";
    }

    return (
        <div className={divClasses}>
            <input
                id={name}
                name={name}
                type={type}
                step="any"
                {...register(name, paramRegister)}
                onChange={(e) => { setValue(e.target.value); onChange(e, name, type)}}
                style={(icon == undefined) ? { padding: '0px 0px 0px 5px' } : { padding: '0px 0px 0px 40px' }}
                className={classes} />
            <span style={(icon == undefined) ? { display: 'none' } : { display: 'inline-block' }}
                className='material-symbols-outlined'>
                {icon}
            </span>
            <label
                htmlFor={name}
                style={(icon == undefined) ? { left: '0px' } : { left: '40px' }}
                className={value ? 'roxo' : ''}>
                {label}
            </label>
        </div>
    );
});