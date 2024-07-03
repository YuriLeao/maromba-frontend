import { useEffect, useState } from "react";
import "./DatePicker.css";
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from "react-hook-form";

registerLocale('ptBR', ptBR);

interface Props {
    control: any;
    label: string;
    name: string;
    erro: boolean;
    required?: boolean;
}

export const DatePicker = (({ control, label, name, erro, required }: Props) => {
    const [value, setValue] = useState(null);

    let classes: string = "";
    let divClasses: string = "databox";

    let classesLabel: string = "";


    if (value) {
        classes += " has-value";
        classesLabel = "focusLabel";
    }

    if (erro) {
        classes += " invalid";
    }

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
        <div className={divClasses}>
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
                            className={classes} />

                        <label
                            htmlFor={name}
                            id={name + "Label"}
                            style={{ left: '0px' }}
                            className={classesLabel}>
                            {label}
                        </label>
                    </>)}
            />
        </div>
    );
});