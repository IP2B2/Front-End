
import Image from 'next/image';
import { useState } from 'react';

import calStyles from './Calendar.module.css';
import { GetMonthDaysMondayFirst } from '@/lib/logic/CalendarLogic';
import '@/app/globals.css';


export const Calendar = () => {
    const [days, setDays] = useState(GetMonthDaysMondayFirst(2025, 7)?.map((day, index) => ({
        ...day,
        available: index % 3 === 1,
        selected: false
    })));
    return (
        <div className={calStyles.calendar}>
            <div className={calStyles.calendarHeader}>
                <div>
                    <Image
                        src="/icons/back-arrow.svg"
                        width={24}
                        height={24}
                        alt="backArrow"
                    />
                </div>
                <div className={calStyles.calendarMonthPicker}>
                    <div>Mai</div>
                    <div>2025</div>
                </div>
                <div style={{ transform: 'rotate(180deg)' }}>
                    <Image
                        src="/icons/back-arrow.svg"
                        width={24}
                        height={24}
                        alt="forwardArrow"
                    />
                </div>
            </div>
            <div className={calStyles.calendarWeekdays}>
                <div>Lu</div>
                <div>Ma</div>
                <div>Mi</div>
                <div>Jo</div>
                <div>Vi</div>
                <div>Sa</div>
                <div>Du</div>
            </div>
            <div className={calStyles.calendarBody}>
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