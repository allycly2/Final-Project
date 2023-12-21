import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => {
      const prevMonth = prevDate.getMonth();
      const prevYear = prevDate.getFullYear();
      const newDate = new Date(prevYear, prevMonth - 1, 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 2;
      const nextYear = prevDate.getFullYear();
      const newDate = new Date(nextYear, nextMonth - 1, 1);
      return newDate;
    });
  };

  const getMonthName = (date) => {
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const renderCalendar = () => {
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const lastDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    const endDay = lastDay.getDay();

    const calendarCells = [];
    const startDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const endDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      daysInMonth
    );

    while (startDate <= endDate) {
      const currentDate = startDate.getDate();
      const isCurrentDate =
        startDate.toDateString() === selectedDate.toDateString();

      calendarCells.push(
        <td key={currentDate} className={isCurrentDate ? "selected" : ""}>
          {currentDate}
        </td>
      );

      startDate.setDate(startDate.getDate() + 1);
    }

    const emptyCellsBefore = [...Array(startDay)].map((_, index) => (
      <td key={`empty-${index}`} className="empty"></td>
    ));
    const emptyCellsAfter = [...Array(6 - endDay)].map((_, index) => (
      <td key={`empty-${index}`} className="empty"></td>
    ));

    const calendarRows = [];
    let calendarWeek = [
      ...emptyCellsBefore,
      ...calendarCells,
      ...emptyCellsAfter,
    ];

    while (calendarWeek.length) {
      calendarRows.push(
        <tr key={Math.random()} className="week">
          {calendarWeek.splice(0, 7)}
        </tr>
      );
    }

    return (
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </table>
    );
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&#8249;</button>
        <span>{getMonthName(selectedDate)}</span>
        <button onClick={handleNextMonth}>&#8250;</button>
      </div>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
