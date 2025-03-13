import { MouseEventHandler, useEffect, useRef, useState } from "react";
import "./AutoComplete.css";
import "../ComponentsStyle.css";
import {
	FieldValues,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";

interface Props<T extends Item> {
	register: UseFormRegister<any>;
	label: string;
	icon?: string;
	name: string;
	error: boolean;
	list: Item[];
	required?: boolean;
	setValue: UseFormSetValue<any>;
	value: any;
	clearErrors: UseFormClearErrors<any>;
}

interface Item {
	id: string;
	name: string;
}

export function AutoComplete<T extends Item>({
	register,
	label,
	icon,
	name,
	error,
	required,
	list,
	setValue,
	value,
	clearErrors,
}: Props<T>) {
	const [inputValue, setInputValue] = useState(value?.name || "");
	const [filterSearch, setFilterSearch] = useState<Item[]>(list);
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setInputValue(value?.name || ""); // Atualiza o inputValue corretamente
		setValue(name, value); // Mantém a sincronização com React Hook Form
	}, [value, setValue, name]);

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		clearErrors(name);
		const input = event.target.value;
		setInputValue(input);

		const newFilter: Item[] = list.filter((item) => {
			return item.name.toLowerCase().includes(event.target.value.toLowerCase());
		});

		setFilterSearch(newFilter);
	};

	const handleSelectClick = (e: React.MouseEvent<HTMLInputElement>) => {
		setIsOpen(true);
	};

	function handleClickList(item: Item) {
		clearErrors(name);
		setInputValue(item.name);
		setValue(name, item);
		setFilterSearch([]);
		setIsOpen(false);
	}

	function clear() {
		setInputValue("");
		setFilterSearch([]);
		setValue(name, "");
	}

	function updateOptionsPosition() {
		if (listRef.current != null && inputRef.current != null) {
			var inputRect = inputRef.current.getBoundingClientRect();
			var optionsHeight = listRef.current.offsetHeight;
			var viewportHeight = window.innerHeight;
			if (viewportHeight - inputRect.bottom >= optionsHeight) {
				listRef.current.style.top = inputRect.bottom + "px";
			} else {
				listRef.current.style.top =
					inputRect.top - listRef.current.offsetHeight - 15 + "px";
			}
			listRef.current.style.left = inputRect.left + "px";
			listRef.current.style.width = inputRect.width + "px";
		}
	}

	const handleClickOutside = (e: MouseEvent) => {
		if (
			inputRef.current &&
			!inputRef.current.contains(e.target as Node) &&
			listRef.current &&
			!listRef.current.contains(e.target as Node)
		) {
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
		if (
			inputRef.current != null &&
			inputRef.current.parentElement != null &&
			inputRef.current.parentElement.parentElement != null
		) {
			if (isOpen) {
				updateOptionsPosition();
				inputRef.current.parentElement.parentElement.addEventListener(
					"scroll",
					updateOptionsPosition
				);
				inputRef.current.parentElement.parentElement.addEventListener(
					"resize",
					updateOptionsPosition
				);
				window.addEventListener("scroll", updateOptionsPosition);
				window.addEventListener("resize", updateOptionsPosition);
				document.addEventListener("click", handleClickOutside);
			} else {
				inputRef.current.parentElement.parentElement.removeEventListener(
					"scroll",
					updateOptionsPosition
				);
				inputRef.current.parentElement.parentElement.removeEventListener(
					"resize",
					updateOptionsPosition
				);
				window.removeEventListener("scroll", updateOptionsPosition);
				window.removeEventListener("resize", updateOptionsPosition);
				document.removeEventListener("click", handleClickOutside);
			}
		}

		return () => {
			if (
				inputRef.current != null &&
				inputRef.current.parentElement != null &&
				inputRef.current.parentElement.parentElement != null
			) {
				inputRef.current.parentElement.parentElement.removeEventListener(
					"scroll",
					updateOptionsPosition
				);
				inputRef.current.parentElement.parentElement.removeEventListener(
					"resize",
					updateOptionsPosition
				);
			}
			window.removeEventListener("scroll", updateOptionsPosition);
			window.removeEventListener("resize", updateOptionsPosition);
			document.removeEventListener("click", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className={"text-box" + (icon == undefined ? " unIcon" : "")}>
			<input
				id={name}
				type="input"
				{...register(
					name,
					required == true ? { required: true } : { required: false }
				)}
				onChange={handleFilterChange}
				className={(inputValue ? " has-value" : "") + (error ? " invalid" : "")}
				style={{ padding: "0px 25px 0px 5px" }}
				value={inputValue}
				ref={inputRef}
				onClick={handleSelectClick}
			/>

			<label
				htmlFor={name}
				style={{ left: "5px", maxWidth: "calc(100% - 30px)" }}
			>
				{label}
			</label>
			{inputValue !== "" ? (
				<span className="material-symbols-outlined" onClick={() => clear()}>
					{"close"}
				</span>
			) : (
				<span className="material-symbols-outlined" style={{cursor: "auto"}}>{"search"}</span>
			)}

			{isOpen && filterSearch.length !== 0 && (
				<div className="list-result" ref={listRef}>
					<div className="list-result-scroll">
						{filterSearch.map((value) => {
							return (
								<div
									key={value.id}
									className="list-item"
									onClick={() => handleClickList(value)}
								>
									<p className="ml5">{value.name}</p>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
