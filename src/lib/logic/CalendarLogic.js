
export const GetMonthDaysMondayFirst = (year, month) => {
    const zeroMonth = month - 1; // Convert to 0-based index
    const firstDay = new Date(year, zeroMonth, 1);
    const lastDay = new Date(year, zeroMonth + 1, 0);
    const days = [];

    if(firstDay.getDay() !== 1) {
        const prevMonday = new Date(firstDay);
        prevMonday.setDate(firstDay.getDate() - (firstDay.getDay() + 6) % 7);
        while (prevMonday < firstDay) {
            days.push({
                date: prevMonday.getDate(),
                dateObject: new Date(prevMonday),
                available: false,
                selected: false,
                currentMonth: false
            });
            prevMonday.setDate(prevMonday.getDate() + 1);
        }
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        const currentDate = new Date(year, zeroMonth, i);
        days.push({
            date: i,
            dateObject: currentDate,
            available: true,
            selected: false,
            currentMonth: true
        });
    }

    if(lastDay.getDay() !== 7) {
        const nextDay = new Date(lastDay);
        nextDay.setDate(lastDay.getDate() + 1);
        while (nextDay.getDay() !== 1) {
            days.push({
                date: nextDay.getDate(),
                dateObject: new Date(nextDay),
                available: false,
                selected: false,
                currentMonth: false
            });
            nextDay.setDate(nextDay.getDate() + 1);
        }
    }

    return days;
};
