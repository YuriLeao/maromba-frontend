import { useState } from "react";
import "./Input.css";

interface Props {
    type: 'email' | 'input' | 'text' | 'password' | undefined;
    register: any;
    label: string;
    icon?: string;
    name: string;
}

export const Input = (({ type, register, label, icon, name }: Props) => {
    const [value, setValue] = useState("");

    return (
        <div className="textbox">
            <input
                name={name}
                type={type}
                {...register(name, { required: true })}
                onChange={(e) => setValue(e.target.value)}
                className={value ? 'has-value' : ''} />
            <span
                className='material-symbols-outlined'>
                {icon}
            </span>
            <label
                htmlFor={name}
                className={value ? 'roxo' : ''}>
                {label}
            </label>
        </div>
    );
});