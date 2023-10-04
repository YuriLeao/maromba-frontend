import React, { useState } from "react";
import "./Select.css";

interface Props {
    register: any;
    label: string;
    icon?: string;
    name: string;
    erro: boolean;
    list: Item[];
    required?: boolean;
}

interface Item {
    id: string,
    name: string
}

export const Select = (({ register, label, icon, name, erro, list, required }: Props) => {
    const [value, setValue] = useState('');

    let classes: string = "";
    let divClasses: string = "textbox";
    let paramRegister = { required: false };

    if (required == true) {
        paramRegister.required = true;
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
            <select
                id={name}
                name={name}
                {...register(name, paramRegister)}
                value={value}
                onChange={(e) => { setValue(e.target.value); }}
                style={(icon == undefined) ? { padding: '0px' } : { padding: '0px 0px 0px 50px' }}
                className={classes} >
                    <option style={{display: "none"}}></option>
                {list.map((item, index) => (
                    (<React.Fragment key={item.id}>
                        <option value={item.id}>{item.name}</option>
                    </React.Fragment>)
                ))}
            </select>
            <span style={(icon == undefined) ? { display: 'none' } : { display: 'inline-block' }}
                className='material-symbols-outlined'>
                {icon}
            </span>
            <label
                htmlFor={name}
                style={(icon == undefined) ? { left: '0px' } : { left: '50px' }}
                className={value ? 'roxo' : ''}>
                {label}
            </label>
        </div>
    );
});