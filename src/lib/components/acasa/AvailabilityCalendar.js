"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import calStyles from "./AvailabilityCalendar.module.css";

import { getBusyDaysByEquipmentId } from "@/lib/actions/accessRequestsActions";

import { useRootCalendar } from "@/lib/context";

export const AvailabilityCalendar = ({ equipmentId, absolute, className }) => {
	const [showCalendar, setShowCalendar] = useState(false);

	const { setUnavailableDates, unavailableDates } = useRootCalendar();

	useEffect(() => {
		async function fetchEquipment() {

			const busyDaysResolution = await getBusyDaysByEquipmentId(
				equipmentId
			);
			if (!busyDaysResolution.success) {
				console.error("Failed to fetch busy days:", busyDaysResolution);
				return;
			}

			const unavailableDates = busyDaysResolution.payload;
			console.log("Unavailable Dates:", unavailableDates);
			setUnavailableDates(unavailableDates);
		}
		fetchEquipment();
	}, []);

	return (
		<>
			<div className={calStyles.availabilityCalButton + " " + (className ? className : "")}>
				<button
					className={calStyles.calendarButton}
					onClick={(e) => {
						e?.preventDefault();
						setShowCalendar(!showCalendar);
					}}
				>
					Calendar disponibilitate produs
				</button>
			</div>
			{showCalendar && (
				<AbsoluteCalendar
					onClose={() => {
						setShowCalendar(false);
					}}
                    notAbsolute={!absolute}
				/>
			)}
		</>
	);
};

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
