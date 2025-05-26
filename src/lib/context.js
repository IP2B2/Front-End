'use client';
import { createContext, useContext, useState } from 'react';

const LayoutContentContext = createContext();

export function LayoutContentProvider({ children }) {
  const [extraContent, setExtraContent] = useState({ pageTitle: '' });

  return (
    <LayoutContentContext.Provider value={{ extraContent, setExtraContent }}>
      {children}
    </LayoutContentContext.Provider>
  );
}

export function useLayoutContent() {
  return useContext(LayoutContentContext);
}

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <CalendarContext.Provider value={{ selectedDay, setSelectedDay }}>
      {children}
    </CalendarContext.Provider>
  );
}
export function useSelectedDay() {
  return useContext(CalendarContext);
}

export const RootCalendarContext = createContext();
export function RootCalendarProvider({ children }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [unavailableDates, setUnavailableDates] = useState([]);

  return (
    <RootCalendarContext.Provider value={{ selectedDay, setSelectedDay, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, unavailableDates, setUnavailableDates }}>
      {children}
    </RootCalendarContext.Provider>
  );
}
export function useRootCalendar() {
  return useContext(RootCalendarContext);
}