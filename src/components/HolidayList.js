import React, { useEffect, useState } from "react";
import axios from "axios";

function HolidayList() {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.example.com/holidays") // Replace with the actual API endpoint for fetching holidays
      .then((response) => {
        setHolidays(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Holiday List</h2>
      {holidays.map((holiday) => (
        <div key={holiday.id}>{holiday.name}</div>
      ))}
    </div>
  );
}

export default HolidayList;
