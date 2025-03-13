import React, { useState, useRef, useEffect, useCallback } from "react";
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
	currentDay?: number;
	currentMonth: number;
	currentYear: number;
	onNextMonth: VoidFunction;
	onPrevMonth: VoidFunction;
	onYearSelect: (year: number) => void;
	yearPage: number;
	onNextYearPage: () => void;
	onPrevYearPage: () => void;
	isYearListOpen: boolean;
	toggleYearList: () => void;
	yearsDivRef: React.RefObject<HTMLDivElement>;
	closeYearList: () => void;
}
const MONTHS = [
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
const DAYSOFWEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const Calendar = ({
	onDateClick,
	currentDay,
	currentMonth,
	currentYear,
	onNextMonth,
	onPrevMonth,
	onYearSelect,
	yearPage,
	onNextYearPage,
	onPrevYearPage,
	isYearListOpen,
	toggleYearList,
	yearsDivRef,
	closeYearList,
}: CalendarProps) => {
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

	useEffect(() => {
		const handleYearListClick = (e: MouseEvent) => {
			if (
				yearsDivRef.current &&
				!yearsDivRef.current.contains(e.target as Node)
			) {
				closeYearList();
			}
		};

		if (isYearListOpen) {
			document.addEventListener("mousedown", handleYearListClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleYearListClick);
		};
	}, [isYearListOpen, closeYearList]);

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
					className={`calendar-day ${day == currentDay ? "day-selected" : ""}`}
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
				<span>{MONTHS[currentMonth]?.value || ""}</span>
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
				{DAYSOFWEEK.map((day, index) => (
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
	value: Date | string | undefined;
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
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [currentDay, setCurrentDay] = useState<number>();
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
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
	const [inputValue, setInputValue] = useState<string>('');

	useEffect(() => {
		let newDate: Date | null = null;
		let newDateFake = "";
	  
		if (value instanceof Date && !isNaN(value.getTime())) {
		  newDate = value;
		  newDateFake = value.toLocaleDateString("pt-BR");
		} else if (typeof value === "string" && value) {
		  const [day, month, year] = value.split("/");
		  const parsedDay = parseInt(day, 10);
		  const parsedMonth = parseInt(month, 10) - 1;
		  const parsedYear = parseInt(year, 10);
	  
		  newDate = new Date(parsedYear, parsedMonth, parsedDay);
		  newDateFake = !isNaN(newDate.getTime()) ? value : "";
		} else {
		  newDateFake = "";
		}
	  
		setInputValue(newDateFake || ''); 

		if (newDate && !isNaN(newDate.getTime())) {
			setCurrentDay(newDate.getDate());
			setCurrentMonth(newDate.getMonth());
			setCurrentYear(newDate.getFullYear());
		} else {
			const currentDate = new Date();
			setCurrentDay(currentDate.getDate());
			setCurrentMonth(currentDate.getMonth());
			setCurrentYear(currentDate.getFullYear());
		}
	}, [value]);

	const handleCloseYearList = useCallback(() => {
		setIsYearListOpen(false);
	}, []);

	const effectiveDay =
		inputValue &&
		parseInt(inputValue.split("/")[1]) - 1 === currentMonth &&
		parseInt(inputValue.split("/")[2]) === currentYear
			? parseInt(inputValue.split("/")[0])
			: new Date().getMonth() === currentMonth &&
			  new Date().getFullYear() === currentYear
			? new Date().getDate()
			: undefined;

	const toggleCalendar = () => {
		setIsCalendarOpen((prev) => {
			const willOpen = !prev;

			if (willOpen) {
				let currentDate;
				if (value instanceof Date) {
					currentDate = value;
				} else if (typeof value === "string" && value !== "") {
					const [day, month, year] = value.split("/");
					const parsedDay = parseInt(day, 10);
					const parsedMonth = parseInt(month, 10) - 1;
					const parsedYear = parseInt(year, 10);

					currentDate = new Date(parsedYear, parsedMonth, parsedDay);
				} else {
					currentDate = new Date();
				}
				setCurrentDay(currentDate.getDate());
				setCurrentMonth(currentDate.getMonth());
				setCurrentYear(currentDate.getFullYear());
				setYearPage(Math.floor((currentDate.getFullYear() - 1950) / 8));
			}

			return willOpen;
		});
	};

	const handleDateClick = (date: Date) => {
		clearErrors(name);
		const formattedDate = date.toLocaleDateString("pt-BR");
		setInputValue(formattedDate);
		setIsCalendarOpen(false);
		setValue(name, date);
		setCurrentDay(date.getDate());
		setCurrentMonth(date.getMonth());
		setCurrentYear(date.getFullYear());
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
			let day = dateParts[0];
			let month = dateParts[1] ? dateParts[1] - 1 : new Date().getMonth();
			let year = dateParts[2];

			const date = new Date();

			if (!isNaN(day)) {
				date.setDate(day);
				setCurrentDay(day);
			}

			if (!isNaN(month)) {
				date.setMonth(month);
				setCurrentMonth(month);
			}

			if (!isNaN(year)) {
				date.setFullYear(year);
				setCurrentYear(year);
			}

			if (input.length === 10) {
				setValue(name, date);
			} else {
				setValue(name, undefined);
			}

			setIsCalendarOpen(true);
			setYearPage(Math.floor((date.getFullYear() - 1950) / 8));
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
		const target = event.target as Node;

		if (
			!inputRef.current?.contains(target) &&
			!calendarRef.current?.contains(target) &&
			!iconRef.current?.contains(target)
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

	useEffect(() => {
		if (!isCalendarOpen || !calendarRef.current) return;
	  
		const updatePosition = () => {
		  const inputRect = inputRef.current?.getBoundingClientRect();
		  if (!inputRect || !calendarRef.current) return;
	  
		  const viewportHeight = window.innerHeight;
		  const calendarHeight = calendarRef.current.offsetHeight;
	  
		  const newTopPosition = 
			viewportHeight - inputRect.bottom >= calendarHeight
			  ? inputRect.bottom
			  : inputRect.top - calendarHeight - 20;
	  
		  calendarRef.current.style.top = `${newTopPosition}px`;
		  calendarRef.current.style.left = `${inputRect.left}px`;
		};
	  
		window.addEventListener("scroll", updatePosition, true);
		window.addEventListener("resize", updatePosition);
		updatePosition();
	  
		return () => {
		  window.removeEventListener("scroll", updatePosition, true);
		  window.removeEventListener("resize", updatePosition);
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
						(inputValue ? " has-value" : "") + (error ? " invalid" : "")
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
						currentDay={effectiveDay}
						onNextMonth={handleNextMonth}
						onPrevMonth={handlePrevMonth}
						onYearSelect={handleYearSelect}
						yearPage={yearPage}
						onNextYearPage={handleNextYearPage}
						onPrevYearPage={handlePrevYearPage}
						isYearListOpen={isYearListOpen}
						toggleYearList={toggleYearList}
						yearsDivRef={yearsDivRef}
						closeYearList={handleCloseYearList}
					/>
				</div>
			)}
		</>
	);
};
