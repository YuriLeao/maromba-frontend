import { ChangeEvent, useState } from "react";
import "../assets/styles/Input.css";

interface Props {
    type: 'email' | 'input' | 'text' | 'password' | undefined;
    label: string;
    icon?: string;
    id?: string;
}

export function Input({type, label, icon, id} :Props) {
    const [value, setValue] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="textbox">
            <input id={id} type={type} onChange={handleChange} className={value ? 'has-value' : ''} />
            <span className='material-symbols-outlined'>{icon}</span>
            <label htmlFor={id} className={value ? 'roxo' : ''}>{label}</label>
        </div>
    );
}