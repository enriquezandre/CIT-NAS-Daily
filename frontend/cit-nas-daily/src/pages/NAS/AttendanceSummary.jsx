"use client";
import { useState, useEffect, useMemo } from "react";
import { DataDisplayBox } from "../../components/DataDisplayBox.jsx";
import { AttendanceSummaryTable } from "../../components/NAS/AttendanceSummaryTable.jsx";
import { useParams } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown.jsx";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils.js";
import { ValidationModal } from "../../components/NAS/ValidationModal.jsx";
import { Snackbar } from "../../components/Snackbar.jsx";
import axios from "axios";

const currentYear = calculateSchoolYear();
const currentSem = calculateSemester();
const first_sem = ["All", "August", "September", "October", "November", "December"];
const second_sem = ["All", "January", "February", "March", "April", "May", "June"];
const summer = ["All", "June", "July", "August"];
const sem_options = ["First", "Second", "Summer"];

export const AttendanceSummary = () => {
  const [selectedSY, setSelectedSY] = useState(currentYear);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  const [monthOptions, setMonthOptions] = useState(first_sem);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(-1);
  const [timekeepingSummaries, setTimekeepingSummaries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAbsentDate, setSelectedAbsentDate] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const { nasId } = useParams();
  const url = import.meta.env.VITE_APP_API_URL;

  const api = useMemo(
    () =>
      axios.create({
        baseURL: `${url}/api`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    [url]
  );

  const handleSnackbarClose = () => {
    setSnackbarVisible(false);
  };

  const getSemesterValue = useMemo(() => {
    return (sem) => {
      switch (sem) {
        case "First":
          return 0;
        case "Second":
          return 1;
        case "Summer":
          return 2;
        default:
          return "Invalid semester";
      }
    };
  }, []);

  useEffect(() => {
    const fetchSchoolYearSemesterOptions = async () => {
      try {
        const api = axios.create({
          baseURL: `${url}/api`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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
  }, [url]);

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
        selectedMonthIndex = summer.indexOf(selectedMonth) + 4;
        if (selectedMonth === "All") {
          selectedMonthIndex = -3;
        }
        break;
      default:
        break;
    }

    setSelectedMonthIndex(selectedMonthIndex);
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
  };

  const openModal = (date) => {
    setIsOpen(true);
    setSelectedAbsentDate(date);
    setIsSubmitted(false);
    //set to false when modal is opened para ig sunod submit mu true nasad siya ug mutrigger nasad ang fetchValidation function
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (base64String) => {
    const api = axios.create({
      baseURL: `${url}/api`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    try {
      const requestData = {
        nasId: nasId,
        absenceDate: selectedAbsentDate,
        nasLetter: base64String,
        semester: getSemesterValue(selectedSem), //selectedSem removed to view the error snackbar
        schoolYear: selectedSY,
      };

      const response = await api.post("/Validation", requestData);

      if (response.status === 200 || response.status === 201) {
        setIsSubmitted(true);
        setSnackbarVisible(true); // Show the success snackbar
        setSnackbarMsg("Submitted successfully!");
      } else {
        setSnackbarVisible(true); // Show the error snackbar
        setSnackbarMsg("Submission failed.");
      }
    } catch (error) {
      setSnackbarVisible(true);
      setSnackbarMsg("An error occurred.");
    }
  };

  useEffect(() => {
    const fetchTimekeepingSummary = async () => {
      try {
        const timekeepingresponse = await api.get(
          `/TimekeepingSummary/${nasId}/${selectedSY}/${getSemesterValue(selectedSem)}`
        );
        const timekeepingdata = timekeepingresponse.data;
        setTimekeepingSummaries(timekeepingdata);
      } catch (error) {
        console.error(error);
        if (error.response.status === 404) {
          setTimekeepingSummaries([]);
        }
      }
    };

    fetchTimekeepingSummary();
  }, [api, nasId, selectedSY, selectedSem, getSemesterValue]);

  return (
    <>
      <div className="block md:hidden justify-center w-full h-full items-center border border-solid rounded-lg p-3">
        <div className="flex flex-col gap-2 items-start justify-between mb-4 md:flex-row lg:flex-row lg:items-center">
          <Dropdown
            label="SY"
            options={uniqueYears}
            selectedValue={selectedSY}
            onChange={(e) => handleSelectSY(e)}
          />
          <Dropdown
            label="SEMESTER"
            options={sem_options}
            selectedValue={selectedSem}
            onChange={(e) => handleSelectSem(e)}
          />
          <Dropdown
            label="MONTH"
            options={monthOptions}
            selectedValue={selectedMonth}
            onChange={(e) => handleSelectedMonth(e)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <DataDisplayBox
            label="Make-up Duty Hours"
            data={
              timekeepingSummaries.makeUpDutyHours !== null
                ? timekeepingSummaries.makeUpDutyHours
                : 0
            }
          />
          <DataDisplayBox
            label="Number of Unexcused Absences"
            data={timekeepingSummaries.unexcused !== null ? timekeepingSummaries.unexcused : 0}
          />
          <DataDisplayBox
            label="Number of Excused Absences"
            data={timekeepingSummaries.excused !== null ? timekeepingSummaries.excused : 0}
          />
          <DataDisplayBox
            label="Late > 10 Minutes"
            data={
              timekeepingSummaries.lateOver10Mins !== null ? timekeepingSummaries.lateOver10Mins : 0
            }
          />
          <DataDisplayBox
            label="Late > 45 Minutes"
            data={
              timekeepingSummaries.lateOver45Mins !== null ? timekeepingSummaries.lateOver45Mins : 0
            }
          />
          <DataDisplayBox
            label="FTP - Failure to Punch IN/OUT"
            data={
              timekeepingSummaries.failedToPunch !== null ? timekeepingSummaries.failedToPunch : 0
            }
          />
        </div>
        <div className="overflow-x-auto">
          <AttendanceSummaryTable
            selectedMonth={selectedMonthIndex}
            selectedSem={selectedSem}
            selectedSY={selectedSY}
            openModal={openModal}
          />
        </div>
      </div>

      <div className="hidden md:block justify-center w-full h-full items-center border border-solid rounded-lg">
        <div className="m-3 mb-10">
          <div className="m-2">
            <div className="flex flex-row justify-start items-center gap-10 mt-6 mb-6">
              <div className="flex flex-row gap-2 items-center">
                <Dropdown
                  label="SY"
                  options={uniqueYears}
                  selectedValue={selectedSY}
                  onChange={(e) => handleSelectSY(e)}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Dropdown
                  label="SEMESTER"
                  options={sem_options}
                  selectedValue={selectedSem}
                  onChange={(e) => handleSelectSem(e)}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Dropdown
                  label="MONTH"
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
                    data={
                      timekeepingSummaries.makeUpDutyHours !== null
                        ? timekeepingSummaries.makeUpDutyHours
                        : 0
                    }
                  />
                  <DataDisplayBox
                    label="Number of Excused Absences"
                    data={timekeepingSummaries.excused !== null ? timekeepingSummaries.excused : 0}
                  />
                  <DataDisplayBox
                    label="Late > 45 Minutes"
                    data={
                      timekeepingSummaries.lateOver45Mins !== null
                        ? timekeepingSummaries.lateOver45Mins
                        : 0
                    }
                  />
                </div>
                <div className="flex">
                  <DataDisplayBox
                    label="Number of Unexcused Absences"
                    data={
                      timekeepingSummaries.unexcused !== null ? timekeepingSummaries.unexcused : 0
                    }
                  />
                  <DataDisplayBox
                    label="Late > 10 Minutes"
                    data={
                      timekeepingSummaries.lateOver10Mins !== null
                        ? timekeepingSummaries.lateOver10Mins
                        : 0
                    }
                  />
                  <DataDisplayBox
                    label="FTP - Failure to Punch IN/OUT"
                    data={
                      timekeepingSummaries.failedToPunch !== null
                        ? timekeepingSummaries.failedToPunch
                        : 0
                    }
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
                isSubmitted={isSubmitted}
              />
            </div>
          </div>
        </div>
        <ValidationModal isOpen={isOpen} closeModal={closeModal} handleSubmit={handleSubmit} />
        <Snackbar
          message={snackbarMsg}
          onClose={handleSnackbarClose}
          isSnackbarVisible={isSnackbarVisible}
          isSubmitted={isSubmitted}
        />
      </div>
    </>
  );
};
