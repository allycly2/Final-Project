import React, { useState, useEffect } from "react";
import fetchHolidays from "./holiday";
import "./Calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidaysData, setHolidaysData] = useState([]);
  const holidays2024 = [
    { name: "The first day of January", date: new Date(2024, 0, 1) },
    { name: "Lunar New Year’s Day", date: new Date(2024, 1, 10) },
    { name: "The third day of Lunar New Year", date: new Date(2024, 1, 12) },
    { name: "The fourth day of Lunar New Year", date: new Date(2024, 1, 13) },
    { name: "Good Friday", date: new Date(2024, 2, 29) },
    { name: "The day following Good Friday", date: new Date(2024, 2, 30) },
    { name: "Easter Monday", date: new Date(2024, 3, 1) },
    { name: "Ching Ming Festival", date: new Date(2024, 3, 4) },
    { name: "Labour Day", date: new Date(2024, 4, 1) },
    { name: "The Birthday of the Buddha", date: new Date(2024, 4, 15) },
    { name: "Tuen Ng Festival", date: new Date(2024, 5, 10) },
    {
      name: "Hong Kong Special Administrative Region Establishment Day",
      date: new Date(2024, 6, 1),
    },
    {
      name: "The day following the Chinese Mid-Autumn Festival",
      date: new Date(2024, 8, 18),
    },
    { name: "National Day", date: new Date(2024, 9, 1) },
    { name: "Chung Yeung Festival", date: new Date(2024, 9, 11) },
    { name: "Christmas Day", date: new Date(2024, 11, 25) },
    {
      name: "The first weekday after Christmas Day",
      date: new Date(2024, 11, 26),
    },
  ];

  useEffect(() => {
    const fetchHolidaysData = async () => {
      const data = await fetchHolidays();
      setHolidaysData(data);
    };

    fetchHolidaysData();
  }, []);

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

  const handleDateClick = (date) => {
    console.log("Clicked date:", date);
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
      const holiday = holidaysData.find(
        (holiday) =>
          new Date(holiday.date).toDateString() === startDate.toDateString()
      );
      const holiday2024 = holidays2024.find(
        (holiday) => holiday.date.toDateString() === startDate.toDateString()
      );

      const tooltipContent = holiday
        ? holiday.name
        : holiday2024
        ? holiday2024.name
        : "";

      const calendarCell = (
        <td
          key={currentDate}
          className={`${isCurrentDate ? "selected" : ""} ${
            holiday || holiday2024 ? "holiday" : ""
          }`}
        >
          <div className="date-box" onClick={() => handleDateClick(startDate)}>
            {currentDate}
          </div>
          {tooltipContent && (
            <div className="holiday-tooltip">
              <div
                className="holiday-name"
                onClick={(e) => e.stopPropagation()} // Prevent the click event from bubbling to the parent div
              >
                <span>{tooltipContent}</span>
              </div>
              <div className="tooltip-content">{tooltipContent}</div>
            </div>
          )}
        </td>
      );

      calendarCells.push(calendarCell);

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
            <th className="weekend">Sun</th>
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
        <button onClick={handlePrevMonth}>‹</button>
        <span>{getMonthName(selectedDate)}</span>
        <button onClick={handleNextMonth}>›</button>
      </div>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
