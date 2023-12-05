"use client";
import { useState, useEffect } from "react";
import { ActivitiesSummaryTable } from "../../components/NAS/ActivitiesSummaryTable.jsx";

const first_sem = [
  "All",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const second_sem = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
];

const summer = ["All", "June", "July", "August"];

export const ActivitiesSummary = () => {
  const [selectedSY, setSelectedSY] = useState(2324);
  const [selectedSem, setSelectedSem] = useState("First");
  const [monthOptions, setMonthOptions] = useState(first_sem);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(-1);

  const sy_options = [2324, 2223, 2122, 2021]; //TO BE CHANGED
  const sem_options = ["First", "Second", "Summer"];

  useEffect(() => {
    let selectedMonthIndex;
    switch (selectedSem) {
      case "First":
        setMonthOptions(first_sem);
        selectedMonthIndex = first_sem.indexOf(selectedMonth) + 6;
        if (selectedMonth === "All") {
          selectedMonthIndex = -1;
        }
        break;
      case "Second":
        setMonthOptions(second_sem);
        selectedMonthIndex = second_sem.indexOf(selectedMonth) - 1;
        if (selectedMonth === "All") {
          selectedMonthIndex = -2;
        }
        break;
      case "Summer":
        setMonthOptions(summer);
        selectedMonthIndex = summer.indexOf(selectedMonth) + 5;
        if (selectedMonth === "All") {
          selectedMonthIndex = -3;
        }
        break;
      default:
        break;
    }

    setSelectedMonthIndex(selectedMonthIndex);
    console.log("Selected Sem:", selectedSem);
    console.log("Selected Month Index:", selectedMonthIndex);
  }, [selectedSY, selectedSem, selectedMonth]);

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
    setSelectedMonth("All");
  };

  const handleSelectedMonth = (event) => {
    const value = event.target.value;
    if (value === "All") {
      setSelectedMonth("All");
    } else {
      setSelectedMonth(value);
    }
    console.log("Selected Month:", value);
  };

  return (
    <div className="justify-center w-full h-full items-center border border-solid rounded-lg">
      <div className="m-3">
        <div className="m-2">
          <div className="flex mt-2">
            <div className="w-36 z-10 flex">
              <div className="mr-2">SY:</div>
              <select
                id="sy"
                name="sy"
                value={selectedSY}
                onChange={handleSelectSY}
                className=" w-full text-base border rounded-md"
              >
                {Array.isArray(sy_options) &&
                  sy_options.map((sy, index) => (
                    <option key={index} value={sy}>
                      {sy}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-48 z-10 flex ml-5">
              <div className="mr-2">SEMESTER:</div>
              <select
                id="sem"
                name="sem"
                value={selectedSem}
                onChange={handleSelectSem}
                className=" w-full text-base border rounded-md"
              >
                {sem_options.map((sem, index) => (
                  <option key={index} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-48 z-10 flex ml-5">
              <div className="mr-2">MONTH:</div>
              <select
                id="month"
                name="month"
                value={selectedMonth}
                onChange={handleSelectedMonth}
                className=" w-full text-base border rounded-md"
              >
                {Array.isArray(monthOptions) &&
                  monthOptions.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div></div>
          <div className="m-5">
            <ActivitiesSummaryTable
              selectedMonth={selectedMonthIndex}
              selectedSem={selectedSem}
              selectedSY={selectedSY}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
