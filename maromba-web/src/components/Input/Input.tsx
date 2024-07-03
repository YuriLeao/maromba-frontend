import { useState } from "react";
import "./Input.css";
import "../ComponentsStyle.css";

interface Props {
    type: 'email' | 'input' | 'text' | 'password' | 'cpf' | 'phone' | 'date' | 'select' | 'number' | undefined;
    register: any;
    label: string;
    icon?: string;
    name: string;
    error: boolean;
    onChange?: any;
    required?: boolean;
}

export const Input = (({ type, register, label, icon, name, error, onChange,required }: Props) => {
    const [value, setValue] = useState("");

    return (
        <div className={'textbox' + (icon == undefined ? ' unIcon' : '')}>
            <input
                id={name}
                name={name}
                type={type}
                step="any"
                {...register(name, (required == true ? { required: true } : { required: false }))}
                onChange={(e) => { setValue(e.target.value); onChange(e, name, type)}}
                style={(icon == undefined) ? { padding: '0px 0px 0px 5px' } : { padding: '0px 0px 0px 40px' }}
                className={(value ? ' has-value' : '') + (error ? ' invalid' : '')} />
            <span style={(icon == undefined) ? { display: 'none' } : { display: 'inline-block' }}
                className='material-symbols-outlined'>
                {icon}
            </span>
            <label
                htmlFor={name}
                style={(icon == undefined) ? { left: '0px' } : { left: '40px' }}>
                {label}
            </label>
        </div>
    );
});