"use client";
import { useState, useEffect } from "react";
import { DataDisplayBox } from "../../components/DataDisplayBox.jsx";
import { AttendanceSummaryTable } from "../../components/NAS/AttendanceSummaryTable.jsx";
import { useParams } from "react-router-dom";
import { ValidationModal } from "../../components/NAS/ValidationModal.jsx";
import axios from "axios";

const first_sem = ["All", "August", "September", "October", "November", "December"];

const second_sem = ["All", "January", "February", "March", "April", "May", "June"];

const summer = ["All", "June", "July", "August"];

export const AttendanceSummary = () => {
  const [selectedSY, setSelectedSY] = useState("2324");
  const [selectedSem, setSelectedSem] = useState("First");
  const [monthOptions, setMonthOptions] = useState(first_sem);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(-1);
  const [timekeepingSummaries, setTimekeepingSummaries] = useState([]);
  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];
  const [isOpen, setIsOpen] = useState(false);
  const { nasId } = useParams();

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
    console.log("Selected SY:", selectedSY);
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (base64String) => {
    const api = axios.create({
      baseURL: "https://localhost:7001/api",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    try {
      const requestData = {
        nasId: nasId,
        nasLetter: base64String,
      };

      const response = await api.post("/Validation", requestData);

      if (response.status === 200 || response.status === 201) {
        console.log("Submitted successfully");
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  useEffect(() => {
    const fetchNas = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const timekeepingresponse = await api.get(`/TimekeepingSummary/${nasId}`);
        let timekeepingdata = timekeepingresponse.data[0];
        console.log(timekeepingdata);

        if (!timekeepingdata) {
          // If there's no record
          timekeepingdata = {
            excused: "NR",
            failedToPunch: "NR",
            lateOver10Mins: "NR",
            lateOver45Mins: "NR",
            makeUpDutyHours: "NR",
            schoolYear: "NR",
            semester: "NR",
            unexcused: "NR",
          };
        }
        console.log(timekeepingdata);
        setTimekeepingSummaries(timekeepingdata);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNas();
  }, [selectedSY, selectedSem, selectedMonth, nasId]);

  return (
    <div className="justify-center w-full h-full items-center border border-solid rounded-lg">
      <div className="m-3">
        <div className="m-2">
          <div className="flex mt-2 ml-2">
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
          <div>
            <div className="m-2">
              <div className="flex">
                <DataDisplayBox
                  label="Make-up Duty Hours"
                  data={timekeepingSummaries.makeUpDutyHours}
                />
                <DataDisplayBox
                  label="Number of Excused Absences"
                  data={timekeepingSummaries.excused}
                />
                <DataDisplayBox
                  label="Late > 45 Minutes"
                  data={timekeepingSummaries.lateOver45Mins}
                />
              </div>
              <div className="flex">
                <DataDisplayBox
                  label="Number of Unexcused Absences"
                  data={timekeepingSummaries.unexcused}
                />
                <DataDisplayBox
                  label="Late > 10 Minutes"
                  data={timekeepingSummaries.lateOver10Mins}
                />
                <DataDisplayBox
                  label="FTP - Failure to Punch IN/OUT"
                  data={timekeepingSummaries.failedToPunch}
                />
              </div>
            </div>
          </div>
          <div className="m-5">
            <AttendanceSummaryTable
              selectedMonth={selectedMonthIndex}
              selectedSem={selectedSem}
              selectedSY={selectedSY}
              openModal={openModal}
            />
          </div>
        </div>
      </div>
      <ValidationModal isOpen={isOpen} closeModal={closeModal} handleSubmit={handleSubmit} />
    </div>
  );
};
