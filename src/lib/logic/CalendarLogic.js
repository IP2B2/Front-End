


export const GetMonthDaysMondayFirst = (year, month) => {
    const date = new Date(year, month, 0);
    var days = [];
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const lastDayOfMonth = new Date(year, month, 0).getDay();
    const totalDaysInMonth = date.getDate();

    // Add days from the previous month if the 1st is not a Monday
    if (firstDayOfMonth !== 1) {
        const prevMonthDays = new Date(year, month - 1, 0).getDate();
        for (let i = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; i > 0; i--) {
            const dayDate = new Date(year, month - 2, prevMonthDays - i + 1);
            days.push({
                date: prevMonthDays - i + 1,
                currentMonth: false,
                dateObject: dayDate,
            });
        }
    }

    // Add all days of the current month
    for (let i = 1; i <= totalDaysInMonth; i++) {
        const dayDate = new Date(year, month - 1, i);
        days.push({
            date: i,
            currentMonth: true,
            dateObject: dayDate,
        });
    }

    // Add days from the next month if the last day is not a Sunday
    if (lastDayOfMonth !== 0) {
        for (let i = 1; i <= 7 - lastDayOfMonth; i++) {
            const dayDate = new Date(year, month, i);
            days.push({
                date: i,
                currentMonth: false,
                dateObject: dayDate,
            });
        }
    }

    return days;
};