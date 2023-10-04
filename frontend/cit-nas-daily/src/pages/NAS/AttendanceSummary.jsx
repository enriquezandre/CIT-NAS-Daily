"use client";
import { useState } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";

export const AttendanceSummary = () => {
  const [selectedSY, setSelectedSY] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];
  const month_options = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSelectSY = (value) => {
    setSelectedSY(value);
  };

  const handleSelectSem = (value) => {
    setSelectedSem(value);
  };

  const handleSelectedMonth = (value) => {
    setSelectedMonth(value);
  };

  return (
    <div className="justify-center w-full h-full items-center border border-solid">
      <div className="font-bold border border-solid ml-2 mt-2">NAS Name</div>
      <div className="flex mt-2 ml-2">
        <div className="w-48">
          SY: <Dropdown options={sy_options} onSelect={handleSelectSY} />
          <p className="mt-4">Selected Value: {selectedSY}</p>
        </div>
        <div className="w-56">
          SEMESTER:{" "}
          <Dropdown options={sem_options} onSelect={handleSelectSem} />
          <p className="mt-4">Selected Value: {selectedSem}</p>
        </div>
        <div className="w-48">
          MONTH:{" "}
          <Dropdown options={month_options} onSelect={handleSelectedMonth} />
          <p className="mt-4">Selected Value: {selectedMonth}</p>
        </div>
      </div>
    </div>
  );
};
