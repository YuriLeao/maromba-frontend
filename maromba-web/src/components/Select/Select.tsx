import { useEffect, useRef, useState } from "react";
import "./Select.css";

interface Props {
    register: any;
    label: string;
    name: string;
    erro: boolean;
    list: Item[];
    required?: boolean;
}


interface Item {
    id: string,
    name: string
}

export const Select = (({ register, label, name, erro, required, list }: Props) => {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    let classes: string = "select";
    let divClasses: string = "textbox unIncon";
    let paramRegister = { required: false };

    if (required == true) {
        paramRegister.required = true;
    }

    if (inputValue) {
        classes += " has-value";
    }

    if (erro) {
        classes += " invalid";
    }

    const handleSelectClick = (e: any) => {
        e.stopPropagation();
        setIsOpen(true);
    };

    function handleClickList(value: Item) {
        setInputValue(value.name);
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

    const handleClickOutside = (e: any) => {
        if (inputRef.current &&
            !inputRef.current.contains(e.target) &&
            listRef.current &&
            !listRef.current.contains(e.target)) {
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
        <div className={divClasses}>
            <input
                id={name}
                name={name}
                type="text"
                step="any"
                {...register(name, paramRegister)}
                style={{ padding: '0px 0px 0px 5px' }}
                className={classes}
                value={inputValue}
                ref={inputRef}
                onClick={handleSelectClick} />
            <label
                htmlFor={name}
                style={{ left: '0px' }}
                className={'select'}>
                {label}
            </label>
            <span style={{ display: 'inline-block', right: '-1%', left: 'unset', cursor: 'pointer' }}
                className='material-symbols-outlined'>
                {"keyboard_arrow_down"}
            </span>

            {isOpen &&
                <div className="listResult" ref={listRef} >
                    <div className="listResultScroll" >
                        {
                            list.map(value => {
                                return <div key={value.id} className='listItem' onClick={() => handleClickList(value)}>
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