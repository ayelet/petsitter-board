import "./FilterByDate.css";

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const FilterByDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div>
      <label>From:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <label>until </label>
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
    </div>
  );
};

export default FilterByDate;
