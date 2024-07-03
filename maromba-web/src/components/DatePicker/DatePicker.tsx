import { useEffect, useState } from "react";
import "./DatePicker.css";
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from "react-hook-form";
import "../ComponentsStyle.css";

registerLocale('ptBR', ptBR);

interface Props {
    control: any;
    label: string;
    name: string;
    error: boolean;
    required?: boolean;
}

export const DatePicker = (({ control, label, name, error, required }: Props) => {
    const [value, setValue] = useState(null);

    const onFocus = () => {
        const elemento = document.getElementById(name + "Label");;

        if (elemento != null) {
            elemento.classList.add("focusLabel");
        }
    };

    const onBlur = () => {
        const elemento = document.getElementById(name + "Label");;

        if (elemento != null) {


            if (value == undefined || value == null) {
                elemento.classList.remove("focusLabel");
            } else {
                elemento.classList.add("focusLabel");
            }
        }

    };

    return (
        <div className={'textbox'}>
            <Controller
                control={control}
                name={name}
                rules={{ required: required }}
                render={({ field }) => (
                    <>
                        <ReactDatePicker
                            showIcon
                            fixedHeight
                            showYearDropdown
                            id={name}
                            dateFormat="dd/MM/yyyy"
                            locale="ptBR"
                            selected={field.value}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onChange={(e: any) => {
                                field.onChange(e);
                            }}
                            className={(value ? ' has-value' : '') + (error ? ' invalid' : '')} />
                        <label
                            htmlFor={name}
                            id={name + "Label"}
                            style={{ left: '0px' }}
                            className={(value ? 'focusLabel' : '')}>
                            {label}
                        </label>
                    </>)}
            />
        </div>
    );
});