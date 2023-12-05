"use client";
import { useState, useEffect } from "react";
import { DataDisplayBox } from "../../components/DataDisplayBox.jsx";
import { AttendanceSummaryTable } from "../../components/NAS/AttendanceSummaryTable.jsx";
import { useParams } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown.jsx";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils.js";
import { ValidationModal } from "../../components/NAS/ValidationModal.jsx";
import axios from "axios";

const currentYear = calculateSchoolYear();
const currentSem = calculateSemester();
const first_sem = ["All", "August", "September", "October", "November", "December"];
const second_sem = ["All", "January", "February", "March", "April", "May", "June"];
const summer = ["All", "June", "July", "August"];

export const AttendanceSummary = () => {
  const [selectedSY, setSelectedSY] = useState(currentYear);
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  const [monthOptions, setMonthOptions] = useState(first_sem);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(-1);
  const [timekeepingSummaries, setTimekeepingSummaries] = useState([]);
  const sem_options = ["First", "Second", "Summer"];
  const [isOpen, setIsOpen] = useState(false);
  const { nasId } = useParams();

  useEffect(() => {
    const fetchSchoolYearSemesterOptions = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }); // Corrected placement of the comma

        const response = await api.get("/NAS/sysem");
        setSyOptions(response.data);

        // Extract unique years from syOptions
        const years = [...new Set(response.data.map((option) => option.year))];
        setUniqueYears(years);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchoolYearSemesterOptions();
  }, []);

  useEffect(() => {
    let selectedMonthIndex;
    switch (selectedSem) {
      case "First":
        setMonthOptions(first_sem);
        selectedMonthIndex = first_sem.indexOf(selectedMonth) + 7;
        if (selectedMonth === "All") {
          selectedMonthIndex = 0;
        }
        break;
      case "Second":
        setMonthOptions(second_sem);
        selectedMonthIndex = second_sem.indexOf(selectedMonth);
        if (selectedMonth === "All") {
          selectedMonthIndex = 0;
        }
        break;
      case "Summer":
        setMonthOptions(summer);
        selectedMonthIndex = summer.indexOf(selectedMonth) + 5;
        if (selectedMonth === "All") {
          selectedMonthIndex = 0;
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
            excused: 0,
            failedToPunch: 0,
            lateOver10Mins: 0,
            lateOver45Mins: 0,
            makeUpDutyHours: 0,
            schoolYear: 0,
            semester: 0,
            unexcused: 0,
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
          <div className="flex">
            <div className="w-36 z-10 flex">
              <Dropdown
                label="SY"
                options={uniqueYears}
                selectedValue={selectedSY}
                onChange={(e) => handleSelectSY(e)}
              />
            </div>
            <div className="w-48 z-10 flex ml-5">
              <Dropdown
                label="Semester"
                options={sem_options}
                selectedValue={selectedSem}
                onChange={(e) => handleSelectSem(e)}
              />
            </div>
            <div className="w-48 z-10 flex ml-5">
              <Dropdown
                label="Month"
                options={monthOptions}
                selectedValue={selectedMonth}
                onChange={(e) => handleSelectedMonth(e)}
              />
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
