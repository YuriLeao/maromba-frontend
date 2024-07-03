import { useEffect, useRef, useState } from "react";
import "./AutoComplete.css";
import "../ComponentsStyle.css";

interface Props {
    register: any;
    label: string;
    icon?: string;
    name: string;
    error: boolean;
    onChange?: any;
    list: Item[];
    required?: boolean;
}


interface Item {
    id: string,
    name: string
}

export const AutoComplete = (({ register, label, icon, name, error, onChange, required, list }: Props) => {
    const [inputValue, setInputValue] = useState("");
    const [filterSearch, setFilterSearch] = useState<Item[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const handleFilterChange = (event: any) => {
        setInputValue(event.target.value);

        const newFilter: Item[] = list.filter(item => {
            return item.name.toLowerCase().includes(event.target.value.toLowerCase());
        });

        setFilterSearch(newFilter);
    }

    const handleSelectClick = (e: any) => {
        e.stopPropagation();
        setIsOpen(true);
    };

    function handleClickList(value: Item) {
        setInputValue(value.name);
        setFilterSearch([]);
        setIsOpen(false);
    };

    function clear() {
        setInputValue("");
        setFilterSearch([]);
    }

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
            console.log("render");
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
        if (inputValue === "") {
            setFilterSearch([]);
        }

        if (filterSearch.length !== 0) {
            updateOptionsPosition();
        }
    }, [inputValue]);

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
        <div className={'textbox' + (icon == undefined ? ' unIcon' : '')}>
            <input
                id={name}
                name={name}
                type="input"
                step="any"
                {...register(name, (required == true ? { required: true } : { required: false }))}
                onChange={handleFilterChange}
                className={(icon == undefined ? ' inputUnIcon' : ' inputIcon') + (inputValue ? ' has-value' : '') + (error ? ' invalid' : '')}
                value={inputValue}
                ref={inputRef}
                onClick={handleSelectClick} />
            <span style={(icon == undefined) ? { display: 'none' } : { display: 'inline-block' }}
                className='material-symbols-outlined'>
                {icon}
            </span>
            <label
                htmlFor={name}
                style={(icon == undefined) ? { left: '0px' } : { left: '40px' }}>
                {label}
            </label>
            {inputValue !== "" ?
                <span className='material-symbols-outlined rightIcon' onClick={() => clear()}>
                    {"close"}
                </span>
                : ""}

            {isOpen && filterSearch.length !== 0 &&
                <div className="listResult" ref={listRef} >
                    <div className="listResultScroll" >
                        {
                            filterSearch.map(value => {
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