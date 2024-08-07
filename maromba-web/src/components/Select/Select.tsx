import { useEffect, useRef, useState } from "react";
import "./Select.css";
import "../ComponentsStyle.css";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
    register: UseFormRegister<FieldValues>;
    label: string;
    name: string;
    error: boolean;
    list: Item[];
    required?: boolean;
    setValue: (name: string, value: any) => void;
    clearErrors: (name: string) => void; 
}


interface Item {
    id: string,
    name: string
}

export const Select = (({ register, label, name, error, required, list, setValue, clearErrors }: Props) => {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const handleSelectClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setIsOpen(true);
    };

    function handleClickList(value: Item) {
        clearErrors(name);
        setInputValue(value.name);
        setValue(name, value);
        setIsOpen(false);
    };

    function updateOptionsPosition() {
        if (listRef.current != null && inputRef.current != null) {
            var inputRect = inputRef.current.getBoundingClientRect();
            var optionsHeight = listRef.current.offsetHeight;
            var viewportHeight = window.innerHeight;
            if (viewportHeight - inputRect.bottom >= optionsHeight) {
                listRef.current.style.top = inputRect.bottom + 'px';
            } else {
                listRef.current.style.top = (inputRect.top - listRef.current.offsetHeight - 15) + 'px';
            }
            listRef.current.style.left = inputRect.left + 'px';
            listRef.current.style.width = inputRect.width + 'px';
        }
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current &&
            !inputRef.current.contains(e.target as Node) &&
            listRef.current &&
            !listRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (inputRef.current != null && inputRef.current.parentElement != null
            && inputRef.current.parentElement.parentElement != null) {
            if (isOpen) {
                updateOptionsPosition();
                inputRef.current.parentElement.parentElement.addEventListener('scroll', updateOptionsPosition);
                inputRef.current.parentElement.parentElement.addEventListener('resize', updateOptionsPosition);
                window.addEventListener('scroll', updateOptionsPosition);
                window.addEventListener('resize', updateOptionsPosition);
                document.addEventListener('click', handleClickOutside);
            } else {
                inputRef.current.parentElement.parentElement.removeEventListener('scroll', updateOptionsPosition);
                inputRef.current.parentElement.parentElement.removeEventListener('resize', updateOptionsPosition);
                window.removeEventListener('scroll', updateOptionsPosition);
                window.removeEventListener('resize', updateOptionsPosition);
                document.removeEventListener('click', handleClickOutside);
            }
        }

        return () => {
            if (inputRef.current != null && inputRef.current.parentElement != null
                && inputRef.current.parentElement.parentElement != null) {
                inputRef.current.parentElement.parentElement.removeEventListener('scroll', updateOptionsPosition);
                inputRef.current.parentElement.parentElement.removeEventListener('resize', updateOptionsPosition);
            }
            window.removeEventListener('scroll', updateOptionsPosition);
            window.removeEventListener('resize', updateOptionsPosition);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className='text-box unIcon'>
            <input
                id={name}
                type="text"
                {...register(name, (required == true ? { required: true } : { required: false }))}
                style={{ padding: '0px 30px 0px 5px' }}
                className={'pointer' + (inputValue ? ' has-value' : '') + (error ? ' invalid' : '')}
                value={inputValue}
                ref={inputRef}
                onClick={handleSelectClick} />
            <label
                htmlFor={name}
                style={{ left: '0px' }}
                className={'pointer'}>
                {label}
            </label>
            <span className='material-symbols-outlined right-icon' >
                {isOpen == true ? "keyboard_arrow_down" : "keyboard_arrow_up"}
            </span>

            {isOpen &&
                <div className="list-result" ref={listRef} >
                    <div className="list-result-scroll" >
                        {
                            list.map(value => {
                                return <div key={value.id} className='list-item' onClick={() => handleClickList(value)}>
                                    <p className="ml5">{value.name}</p>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
        </div>


    );
});