'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import calStyles from './Calendar.module.css';
import { GetMonthDaysMondayFirst } from '@/lib/logic/CalendarLogic';
import '@/app/globals.css';


export const Calendar = () => {
    const [days, setDays] = useState(GetMonthDaysMondayFirst(2025, 1)?.map((day, index) => ({
        ...day,
        available: index % 3 === 1,
        selected: false
    })));
    const [currentMonth, setCurrentMonth] = useState(1); // January (0-based index)
    const [currentYear, setCurrentYear] = useState(2025);

    useEffect(() => {
        setDays(GetMonthDaysMondayFirst(currentYear, currentMonth)?.map((day, index) => ({
            ...day,
            available: index % 3 === 1,
            selected: false
        })));
    }, [currentYear, currentMonth]);

    const handlePreviousMonth = () => {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const handleNextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    return (
        <div className={calStyles.calendar}>
            <div className={calStyles.calendarHeader}>
                <div onClick={handlePreviousMonth}>
                    <Image
                        src="/icons/back-arrow.svg"
                        width={24}
                        height={24}
                        alt="backArrow"
                    />
                </div>
                <div className={calStyles.calendarMonthPicker}>
                    <div>{new Date(currentYear, currentMonth - 1).toLocaleString('RO', { month: 'long' }).charAt(0).toUpperCase() + new Date(currentYear, currentMonth - 1).toLocaleString('RO', { month: 'long' }).slice(1)}</div>
                    <div>{currentYear}</div>
                </div>
                <div style={{ transform: 'rotate(180deg)' }} onClick={handleNextMonth}>
                    <Image
                        src="/icons/back-arrow.svg"
                        width={24}
                        height={24}
                        alt="forwardArrow"
                    />
                </div>
            </div>
            <div className={calStyles.calendarWeekdays + ' ' + (days.length > 35 ? calStyles.calendarWeekdaysLong : '')}>
                <div>Lu</div>
                <div>Ma</div>
                <div>Mi</div>
                <div>Jo</div>
                <div>Vi</div>
                <div>Sa</div>
                <div>Du</div>
            </div>
            <div className={calStyles.calendarBody + ' ' + (days.length > 35 ? calStyles.calendarBodyLong : '')}>
                {days.map((day, index) => (
                    <div 
                        key={index} 
                        className={`${day.currentMonth ? calStyles.currentMonthDay : ''} ${day.currentMonth && !day.available ? calStyles.busyDay : ''} ${day.selected ? calStyles.selectedDay : ''}`}
                        onClick={() => setDays(days.map((d, i) => i === index ? { ...d, selected: !d.selected } : { ...d, selected: false }))}
                    >
                        <div>{day.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}