"use client";
import { useEffect, useState, useRef, use } from "react";
import Image from "next/image";

import { ProductImageCarousel } from "../apage";
import { getEquipmentById } from "@/lib/actions/equipmentActions";

import styles from "../Echipament.module.css";
import calStyles from "./AbsoluteCalendar.module.css";

import { Inter500 } from "@/lib/fonts/Inter";
import "@/app/globals.css";
import { BackArrow } from "@/lib/components/globals/NavArrows";

import { useParams, useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/getAuthToken";

import { useRootCalendar } from "@/lib/context";

export default function EchipamentPage() {
	const { equipmentId } = useParams();
	const router = useRouter();

	const images = [
		"/icons/Frame 1000005448.svg",
		"/icons/Frame 1000005450.svg",
		"/icons/Frame 1000005450.svg",
		"/icons/Frame 1000005450.svg",
	];

	const [equipment, setEquipment] = useState({});

	const { setUnavailableDates, unavailableDates } = useRootCalendar();

	useEffect(() => {
		async function fetchEquipment() {
			const authToken = getAuthToken();

			const resolution = await getEquipmentById(equipmentId);
			if (!resolution.success) {
				console.error("Failed to fetch equipment:", resolution);
				return;
			}
			setEquipment({
				...resolution.payload,
				photo: resolution.payload.photo
					? JSON.parse(resolution.payload.photo)
					: [],
			});
			console.log("Fetched Equipment:", resolution.payload);

			// const accData = await getAccessRequestsByEquipmentId(authToken, equipmentId);
			// console.log("Fetched Access Requests:", accData);

			// const unavailableDates = accData.map((request) => {
			//     if (request.status === "APPROVED") {
			//         return getDaysBetweenDates(
			//             new Date(request.requestDate),
			//             new Date(request.expectedReturnDate)
			//         );
			//     }
			// }).flat().filter(date => date !== undefined);
			// console.log("Unavailable Dates:", unavailableDates);
			// setUnavailableDates(unavailableDates);
		}
		fetchEquipment();
	}, []);

	useEffect(() => {
		console.log("unavailableDates:", unavailableDates);
	}, [unavailableDates]);

	const [showCalendar, setShowCalendar] = useState(false);
	const buttonRef = useRef(null);
	const calRef = useRef(null);

	const handleClickCalShow = (event) => {
		setShowCalendar(!showCalendar);
	};

	return (
		<div className={styles.layout}>
			<div className={styles.backButtonWrapper}>
				<BackArrow arrowSize={20} />
			</div>
			<ProductImageCarousel imageLinkArray={equipment?.photo} />

			<div className={styles.descriptionContainer}>
				<h1 className={styles.productTitle}>{equipment?.name}</h1>
				<div className={styles.pageDescription}>
					{equipment?.description}
				</div>
				<div className={styles.buttonGroup}>
					<button
						className={`${styles.actionButton} ${Inter500.className}`}
						onClick={handleClickCalShow}
						ref={buttonRef}
					>
						<div>Vezi disponibilitate</div>
					</button>
					<button
						className={`${styles.actionButton} ${Inter500.className}`}
						onClick={() =>
							router.push(
								`/home/echipamente/echipament/${equipmentId}/inchiriere`
							)
						}
                        >
						Închiriază
					</button>
				</div>
						{showCalendar ? (
							<AbsoluteCalendar
								ref={calRef}
								onClose={() => {
                                    setShowCalendar(false);
                                }}
                                notAbsolute={true}
							/>
						) : null}
				<div className={styles.dropdownsContainer}>
					<details className={styles.dropdown}>
						<summary
							className={`${styles.dropdownHeader} ${Inter500.className}`}
						>
							Mod de utilizare
						</summary>
						<div className={styles.dropdownContent}>
							{equipment?.usage}
						</div>
					</details>

					<details className={styles.dropdown}>
						<summary
							className={`${styles.dropdownHeader} ${Inter500.className}`}
						>
							Material si intretinere
						</summary>
						<div className={styles.dropdownContent}>
							{equipment?.material}
						</div>
					</details>
				</div>
			</div>
		</div>
	);
}

export const AbsoluteCalendar = ({ children, notAbsolute, onClose }) => {
	const {
		selectedDay,
		setSelectedDay,
		selectedMonth,
		setSelectedMonth,
		selectedYear,
		setSelectedYear,
		unavailableDates,
	} = useRootCalendar();

	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	const handlePrevMonth = () => {
		if (currentMonth == 0) {
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
			return;
		}
		setCurrentMonth(currentMonth - 1);
	};

	const handleNextMonth = () => {
		if (currentMonth == 11) {
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
			return;
		}
		setCurrentMonth(currentMonth + 1);
	};

	const [days, setDays] = useState([]);

	useEffect(() => {
		const newDays = getCalendarDays(currentYear, currentMonth);
		const calendarDays = newDays.map((day) => {
			const isUnavailable = unavailableDates.some(
				(unavailableDay) =>
					unavailableDay.dateObject.toDateString() ===
					day.dateObject.toDateString()
			);
			return {
				...day,
				unavailable: isUnavailable,
				selected:
					selectedDay &&
					day.dateObject.toDateString() ===
						selectedDay.toDateString(),
			};
		});
		setDays(calendarDays);
	}, [currentYear, currentMonth]);

	return (
		<div
			className={`${calStyles.absoluteCalendar} ${
				notAbsolute ? calStyles.notAbsolute : ""
			}`}
		>
			<div className={calStyles.calendarHeader}>
				<div onClick={handlePrevMonth}>
					<Image
						src="/icons/back-arrow.svg"
						width={24}
						height={24}
						alt="backArrow"
					/>
				</div>
				<div className={calStyles.calendarMonthPicker}>
					<div>
						{new Date(currentYear, currentMonth - 1)
							.toLocaleString("RO", { month: "long" })
							.charAt(0)
							.toUpperCase() +
							new Date(currentYear, currentMonth - 1)
								.toLocaleString("RO", { month: "long" })
								.slice(1)}
					</div>
					<div>{currentYear}</div>
				</div>
				<div
					style={{ transform: "rotate(180deg)" }}
					onClick={handleNextMonth}
				>
					<Image
						src="/icons/back-arrow.svg"
						width={24}
						height={24}
						alt="forwardArrow"
					/>
				</div>
				<div
					className={calStyles.calendarCloseButton}
					onClick={onClose}
				>
					&times;
				</div>
			</div>
			<div
				className={
					calStyles.calendarWeekdays +
					" " +
					(days.length > 35 ? calStyles.calendarWeekdaysLong : "")
				}
			>
				<div>Lu</div>
				<div>Ma</div>
				<div>Mi</div>
				<div>Jo</div>
				<div>Vi</div>
				<div>Sa</div>
				<div>Du</div>
			</div>
			<div
				className={
					calStyles.calendarBody +
					" " +
					(days.length > 35 ? calStyles.calendarBodyLong : "")
				}
			>
				{days.map((day, idx) => (
					<div
						key={idx}
						className={`${calStyles.calendarDay} ${
							day.currentMonth ? calStyles.currentMonthDay : ""
						} ${day.unavailable ? calStyles.busyDay : ""}`}
					>
						{day.date}
					</div>
				))}
			</div>
		</div>
	);
};

export function getDaysBetweenDates(startDate, endDate) {
	const days = [];

	for (
		let dt = new Date(startDate);
		dt <= endDate;
		dt.setDate(dt.getDate() + 1)
	) {
		days.push({
			date: dt.getDate(),
			dateObject: new Date(dt),
		});
	}

	return days;
}

function getCalendarDays(year, month) {
	return [
		...getPrevMonthDaysToMonday(year, month).map((day) => ({
			...day,
			currentMonth: false,
		})),
		...getMonthDays(year, month).map((day) => ({
			...day,
			currentMonth: true,
		})),
		...getNextMonthDaysToSunday(year, month).map((day) => ({
			...day,
			currentMonth: false,
		})),
	];
}

function getPrevMonthDaysToMonday(year, month) {
	const firstDay = new Date(year, month, 1);
	const days = [];
	const firstDayOfWeek = firstDay.getDay();
	const daysToPrevMonday = (firstDayOfWeek + 6) % 7; // Calculate how many days to go back to the previous Monday

	if (daysToPrevMonday > 0) {
		const prevMonday = new Date(firstDay);
		prevMonday.setDate(firstDay.getDate() - daysToPrevMonday);

		for (let i = 0; i < daysToPrevMonday; i++) {
			days.push({
				date: prevMonday.getDate(),
				dateObject: new Date(prevMonday),
			});
			prevMonday.setDate(prevMonday.getDate() + 1);
		}
	}

	return days;
}

function getNextMonthDaysToSunday(year, month) {
	const lastDay = new Date(year, month + 1, 0);
	const days = [];
	const lastDayOfWeek = lastDay.getDay();
	const daysToNextSunday = (7 - lastDayOfWeek) % 7; // Calculate how many days to go forward to the next Sunday

	if (daysToNextSunday > 0) {
		const nextSunday = new Date(lastDay);
		nextSunday.setDate(lastDay.getDate() + daysToNextSunday);

		for (let i = 0; i < daysToNextSunday; i++) {
			days.push({
				date: nextSunday.getDate(),
				dateObject: new Date(nextSunday),
			});
			nextSunday.setDate(nextSunday.getDate() + 1);
		}
	}

	return days;
}

function getMonthDays(year, month) {
	return Array.from(
		{ length: new Date(year, month + 1, 0).getDate() },
		(_, idx) => {
			const date = new Date(year, month, idx + 1);
			return {
				date: idx + 1,
				dateObject: date,
			};
		}
	);
}
