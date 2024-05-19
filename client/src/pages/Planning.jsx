import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Planning = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <Calendar
        onChange={setStartDate}
        value={startDate}
        // events={myEventsList} // find meetings from database
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="w-full "
      />
    </div>
  );
};

export default Planning;
