"use client";
import { useState } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";
import { DataDisplayBox } from "../../components/DataDisplayBox.jsx";

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
    <div className="justify-center w-full h-full items-center border border-solid rounded-lg">
      <div className="text-primary text-xl font-bold ml-2 my-4">
        Scholar&rsquo;s Name: NAS Name Here
      </div>
      <div className="m-2">
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
        <div>
          <div className="m-2">
            <div className="flex">
              <DataDisplayBox label="Number of Lates" data="20" />
              <DataDisplayBox label="Number of Excused Absences" data="20" />
              <DataDisplayBox label="Late > 45 Minutes" data="20" />
            </div>
            <div className="flex">
              <DataDisplayBox label="Number of Unexcused Absences" data="20" />
              <DataDisplayBox label="Late > 10 Minutes" data="20" />
              <DataDisplayBox label="FTP - Failure to Punch IN/OUT" data="20" />
            </div>
          </div>
        </div>
        <div className="m-2">Attendance Summary:</div>
      </div>
    </div>
  );
};
