import React, { useState } from "react";
// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Calendar from "../components/Calendar";

const Planning = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <Calendar />
    </div>
  );
};

export default Planning;
