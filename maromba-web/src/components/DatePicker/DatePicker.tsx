import React, { useState, useRef, useEffect } from "react";
import "./DatePicker.css";
import "../ComponentsStyle.css";
import { validateDate } from "../Validate";
import {
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";

interface CalendarProps {
	onDateClick: (date: Date) => void;
	currentMonth: number;
	currentYear: number;
	selectedFakeDate: Date | null;
	onNextMonth: () => void;
	onPrevMonth: () => void;
	onYearSelect: (year: number) => void;
	yearPage: number;
	onNextYearPage: () => void;
	onPrevYearPage: () => void;
	isYearListOpen: boolean;
	toggleYearList: () => void;
	yearsDivRef: React.RefObject<HTMLDivElement>;
}

const Calendar = ({
	onDateClick,
	currentMonth,
	currentYear,
	selectedFakeDate,
	onNextMonth,
	onPrevMonth,
	onYearSelect,
	yearPage,
	onNextYearPage,
	onPrevYearPage,
	isYearListOpen,
	toggleYearList,
	yearsDivRef,
}: CalendarProps) => {
	const months = [
		{ id: 1, value: "Janeiro" },
		{ id: 2, value: "Fevereiro" },
		{ id: 3, value: "Março" },
		{ id: 4, value: "Abril" },
		{ id: 5, value: "Maio" },
		{ id: 6, value: "Junho" },
		{ id: 7, value: "Julho" },
		{ id: 8, value: "Agosto" },
		{ id: 9, value: "Setembro" },
		{ id: 10, value: "Outubro" },
		{ id: 11, value: "Novembro" },
		{ id: 12, value: "Dezembro" },
	];
	const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

	const generateCalendar = () => {
		const calendarDays = [];
		let dayOfMonth = 1;

		for (let i = 0; i < firstDayOfMonth; i++) {
			calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			calendarDays.push(
				<div
					key={`day-${currentYear}-${currentMonth}-${day}`}
					className={`calendar-day ${
						day == selectedFakeDate?.getDate() ? " day-selected" : ""
					}`}
					onClick={() => onDateClick(new Date(currentYear, currentMonth, day))}
				>
					{day}
				</div>
			);
			dayOfMonth++;
		}

		return calendarDays;
	};

	const generateYearOptions = () => {
		const startYear = 1950 + yearPage * 8;
		const years = [];
		for (let i = 0; i < 8; i++) {
			years.push(startYear + i);
		}
		return years.sort((a, b) => {
			return b - a;
		});
	};

	return (
		<div className="calendar-container">
			<div className="calendar-header">
				<div className="calendar-year">
					<span
						className="pointer calendar-current-year"
						onClick={toggleYearList}
					>
						{currentYear}
					</span>
					<span
						className="material-symbols-outlined pointer"
						onClick={toggleYearList}
					>
						{isYearListOpen == true
							? "keyboard_arrow_down"
							: "keyboard_arrow_up"}
					</span>
				</div>
				{isYearListOpen && (
					<div className="calendar-years" ref={yearsDivRef}>
						<div className="calendar-years-up-down">
							<span
								className="material-symbols-outlined up pointer"
								onClick={onNextYearPage}
							>
								{"keyboard_double_arrow_up"}
							</span>
						</div>
						{generateYearOptions().map((year) => (
							<span
								onClick={() => onYearSelect(year)}
								key={year}
								className={`calendar-year-select pointer ${
									year == currentYear ? "year-selected" : ""
								}`}
							>
								{year}
							</span>
						))}
						<div className="calendar-years-up-down">
							<span
								className="material-symbols-outlined down pointer"
								onClick={onPrevYearPage}
							>
								{"keyboard_double_arrow_down"}
							</span>
						</div>
					</div>
				)}
			</div>
			<div className="calendar-month">
				<div className="calendar-years-left-right">
					<span
						className="material-symbols-outlined left pointer"
						onClick={onPrevMonth}
					>
						{"keyboard_arrow_left"}
					</span>
				</div>
				<span>{`${
					months[currentMonth] ? months[currentMonth].value : ""
				}`}</span>
				<div className="calendar-years-left-right">
					<span
						className="material-symbols-outlined right pointer"
						onClick={onNextMonth}
					>
						{"keyboard_arrow_right"}
					</span>
				</div>
			</div>
			<div className="calendar-grid">
				{daysOfWeek.map((day, index) => (
					<div key={index} className="calendar-day-name">
						{day}
					</div>
				))}
				{generateCalendar()}
			</div>
		</div>
	);
};

interface Props {
	register: UseFormRegister<any>;
	label: string;
	name: string;
	error: boolean;
	required?: boolean;
	setValue: UseFormSetValue<any>;
	value: any;
	clearErrors: UseFormClearErrors<any>;
}

export const DatePicker = ({
	label,
	name,
	register,
	error,
	required,
	setValue,
	value,
	clearErrors,
}: Props) => {
	let date;
	let dateFake = "";
	if (value instanceof Date) {
		date = value;
		dateFake = value.toLocaleDateString("pt-BR");
	} else {
		const dateNow = new Date();
		dateFake = value === undefined ? "" : value;
		const [day, month, year] =
			value === undefined
				? (
						dateNow.getDate() +
						"/" +
						dateNow.getMonth() +
						"/" +
						dateNow.getFullYear()
				  ).split("/")
				: value.split("/");
		const formattedDate = `${Number.parseInt(year)}-${Number.parseInt(
			month
		)}-${Number.parseInt(day)}`;
		date = value == undefined || value === "" ? null : new Date(formattedDate);
	}

	const [selectedDate, setSelectedDate] = useState<Date | null>(date);
	const [selectedFakeDate, setSelectedFakeDate] = useState<Date | null>(
		date ?? new Date()
	);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(
		date?.getMonth() ?? new Date().getMonth()
	);
	const [currentYear, setCurrentYear] = useState(
		date?.getFullYear() ?? new Date().getFullYear()
	);
	const [yearPage, setYearPage] = useState(
		Math.floor((new Date().getFullYear() - 1900) / 8)
	);
	const [isYearListOpen, setIsYearListOpen] = useState(false);
	const [isClickingInsideYearList, setIsClickingInsideYearList] =
		useState(false);
	const calendarRef = useRef<HTMLDivElement>(null);
	const yearsDivRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const iconRef = useRef<HTMLSpanElement>(null);
	const [inputValue, setInputValue] = useState(dateFake);

	useEffect(() => {
		if (date) {
			setValue(name, date);
		}
	}, [date, setValue, name]);

	const toggleCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
		setYearPage(
			Math.floor((selectedFakeDate ?? new Date()).getFullYear() - 1950) / 8
		);
	};

	const handleDateClick = (date: Date) => {
		clearErrors(name);
		setSelectedDate(date);
		setSelectedFakeDate(date);
		setInputValue(date.toLocaleDateString("pt-BR"));
		setIsCalendarOpen(false);
		setValue(name, date);
	};

	const validateInput = (input: string): string => {
		let sanitized = input.replace(/[^0-9/]/g, "");

		const parts = sanitized.split("/");
		if (parts[0] && parts[0] != "0") {
			parts[0] = parts[0].replace(
				/-?\b(?:00|-(0|[1-9]\d*)|(32|3[3-9]|[4-9]\d|\d{3,}))\b/g,
				""
			);
		}
		if (parts[1] && parts[1] != "0") {
			parts[1] = parts[1].replace(
				/-?\b(?:00|-(0|[1-9]\d*)|(1[3-9]|[2-9]\d|\d{3,}))\b/g,
				""
			);
		}

		switch (parts.length) {
			case 1: {
				sanitized = parts[0];
				break;
			}
			case 2: {
				sanitized = parts.slice(0, 2).join("/");
				break;
			}
			case 3: {
				sanitized = parts.slice(0, 3).join("/");
				break;
			}
			default: {
				sanitized = "";
				break;
			}
		}
		return sanitized;
	};

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dateChange(event.target.value);
	};

	const dateChange = (val: string) => {
		clearErrors(name);
		let input = validateInput(val);
		const dateParts = input.split("/").map((part) => parseInt(part, 10));

		if (input.length >= 1) {
			const [day, month, year] = dateParts;

			const date = new Date();

			if (!isNaN(day)) {
				date.setDate(day);
			}

			if (!isNaN(month)) {
				let monthUpdate = 0;
				if (month > 0) {
					monthUpdate = month - 1;
				}
				date.setMonth(monthUpdate);
				setCurrentMonth(monthUpdate);
			}

			if (!isNaN(year)) {
				date.setFullYear(year);
				setCurrentYear(year);
			}

			if (input.length == 10) {
				setValue(name, date);
			} else {
				setValue(name, undefined);
			}
			setSelectedDate(date);
			setSelectedFakeDate(date ? date : new Date());
			setIsCalendarOpen(true);
			setYearPage(Math.floor((date.getFullYear() - 1950) / 9));
		}

		setInputValue(input);
	};

	const handleNextMonth = () => {
		setCurrentMonth((prevMonth) => {
			if (prevMonth === 11) {
				const nextYear = currentYear + 1;
				setCurrentYear(nextYear);
				return 0;
			} else {
				return prevMonth + 1;
			}
		});
	};

	const handlePrevMonth = () => {
		setCurrentMonth((prevMonth) => {
			if (prevMonth === 0) {
				const prevYear = currentYear - 1;
				setCurrentYear(prevYear);
				return 11;
			} else {
				return prevMonth - 1;
			}
		});
	};

	const handleYearSelect = (year: number) => {
		setCurrentYear(year);
		setIsYearListOpen(false);
		setIsClickingInsideYearList(false);
	};

	const handleNextYearPage = () => {
		setYearPage((prevPage) => prevPage + 1);
	};

	const handlePrevYearPage = () => {
		setYearPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const toggleYearList = () => {
		setIsYearListOpen((prev) => !prev);
		setIsClickingInsideYearList(true);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (isClickingInsideYearList) {
			setIsClickingInsideYearList(false);
			return;
		}

		if (
			inputRef.current &&
			!inputRef.current.contains(event.target as Node) &&
			calendarRef.current &&
			!calendarRef.current.contains(event.target as Node) &&
			iconRef.current &&
			!iconRef.current.contains(event.target as Node)
		) {
			setIsCalendarOpen(false);
			setIsYearListOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isClickingInsideYearList]);

	function updateOptionsPosition() {
		if (calendarRef.current != null && inputRef.current != null) {
			var inputRect = inputRef.current.getBoundingClientRect();
			var optionsHeight = calendarRef.current.offsetHeight;
			var viewportHeight = window.innerHeight;
			if (viewportHeight - inputRect.bottom >= optionsHeight) {
				calendarRef.current.style.top = inputRect.bottom + "px";
			} else {
				calendarRef.current.style.top =
					inputRect.top - calendarRef.current.offsetHeight - 20 + "px";
			}

			let marginLeft = 5;
			if (inputRect.width < 150) {
				marginLeft = 55;
			}
			calendarRef.current.style.left = inputRect.left - marginLeft + "px";
		}
	}

	useEffect(() => {
		if (
			inputRef.current != null &&
			inputRef.current.parentElement != null &&
			inputRef.current.parentElement.parentElement != null
		) {
			if (isCalendarOpen) {
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
			}
		}
		return () => {
			{
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
			}
		};
	}, [isCalendarOpen]);

	return (
		<>
			<div className={"text-box unIcon"}>
				<input
					id={name}
					type="input"
					{...register(name, {
						required: required === true ? true : false,
						minLength: 10,
						validate: validateDate,
					})}
					onChange={handleDateChange}
					className={
						(selectedDate ? " has-value" : "") + (error ? " invalid" : "")
					}
					style={{ padding: "0px 25px 0px 5px" }}
					value={inputValue}
					ref={inputRef}
					onClick={toggleCalendar}
				/>
				<label
					htmlFor={name}
					style={{ left: "5px", maxWidth: "calc(100% - 30px)" }}
				>
					{label}
				</label>
				<span
					ref={iconRef}
					className="material-symbols-outlined"
					onClick={toggleCalendar}
				>
					{"calendar_today"}
				</span>
			</div>
			{isCalendarOpen && (
				<div className="calendar" ref={calendarRef}>
					<Calendar
						onDateClick={handleDateClick}
						currentMonth={currentMonth}
						currentYear={currentYear}
						selectedFakeDate={selectedFakeDate}
						onNextMonth={handleNextMonth}
						onPrevMonth={handlePrevMonth}
						onYearSelect={handleYearSelect}
						yearPage={yearPage}
						onNextYearPage={handleNextYearPage}
						onPrevYearPage={handlePrevYearPage}
						isYearListOpen={isYearListOpen}
						toggleYearList={toggleYearList}
						yearsDivRef={yearsDivRef}
					/>
				</div>
			)}
		</>
	);
};
