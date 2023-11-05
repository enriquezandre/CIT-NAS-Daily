"use client";
import { useState } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";
import { ActivitiesSummaryTable } from "../../components/NAS/ActivitiesSummaryTable.jsx";

export const ActivitiesSummary = () => {
  const [selectedSY, setSelectedSY] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];
  const month_options = [
    "All",
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
      <div className="m-3">
        <div className="m-2">
          <div className="flex mt-2 ml-2">
            <div className="w-48 z-10">
              SY: <Dropdown options={sy_options} onSelect={handleSelectSY} />
              <p className="mt-4">Selected Value: {selectedSY}</p>
            </div>
            <div className="w-56 z-10">
              SEMESTER:{" "}
              <Dropdown options={sem_options} onSelect={handleSelectSem} />
              <p className="mt-4">Selected Value: {selectedSem}</p>
            </div>
            <div className="w-48 z-10">
              MONTH:{" "}
              <Dropdown
                options={month_options}
                onSelect={handleSelectedMonth}
              />
            </div>
          </div>
          <div></div>
          <div className="m-5">
            <ActivitiesSummaryTable
              selectedMonth={month_options.indexOf(selectedMonth) - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
