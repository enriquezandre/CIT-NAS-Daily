"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ActivitiesSummaryTable } from "../../components/NAS/ActivitiesSummaryTable.jsx";
import { Dropdown } from "../../components/Dropdown.jsx";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils.js";
import { ActivitiesFormModal } from "../../components/NAS/ActivitiesFormModal.jsx";
import { Snackbar } from "../../components/Snackbar.jsx";
import axios from "axios";

const currentYear = calculateSchoolYear();
const currentSem = calculateSemester();
const first_sem = ["All", "August", "September", "October", "November", "December"];
const second_sem = ["All", "January", "February", "March", "April", "May", "June"];
const summer = ["All", "June", "July", "August"];

export const ActivitiesSummary = () => {
  const [selectedSY, setSelectedSY] = useState(currentYear);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const sem_options = ["First", "Second", "Summer"];
  const [selectedSem, setSelectedSem] = useState(currentSem);
  const [monthOptions, setMonthOptions] = useState(first_sem);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { nasId } = useParams();

  const api = useMemo(
    () =>
      axios.create({
        baseURL: "https://localhost:7001/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    []
  );

  //getting school year from the /NAS/sysem
  useEffect(() => {
    const fetchSchoolYearSemesterOptions = async () => {
      try {
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
  }, [api]);

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
  }, [selectedSY, selectedSem, selectedMonth]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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

  const handleSubmit = async (activitiesOfTheDay, skillsLearned, valuesLearned) => {
    try {
      const response = await api.post(
        `https://localhost:7001/api/ActivitiesSummary/${nasId}/${currentYear}/${getSemesterValue(
          selectedSem
        )}`,
        {
          activitiesOfTheDay,
          skillsLearned,
          valuesLearned,
        }
      );

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

  const handleSnackbarClose = () => {
    setSnackbarVisible(false);
  };

  return (
    <>
      <div className="block md:hidden justify-center w-full h-full items-center border border-solid rounded-lg p-3">
        <div className="flex flex-row justify-between items-center mb-4">
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
        <div className="overflow-x-auto">
          <ActivitiesSummaryTable
            selectedMonth={selectedMonthIndex}
            selectedSem={selectedSem}
            selectedSY={selectedSY}
            currentYear={currentYear}
            currentSem={currentSem}
            openModal={openModal}
          />
        </div>
      </div>

      <div className="hidden md:block justify-center w-full h-full items-center border border-solid rounded-lg">
        <div className="m-3">
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
            <div></div>
            <div className="m-5">
              <ActivitiesSummaryTable
                selectedMonth={selectedMonthIndex}
                selectedSem={selectedSem}
                selectedSY={selectedSY}
                currentYear={currentYear}
                currentSem={currentSem}
                openModal={openModal}
              />
            </div>
          </div>
        </div>
      </div>
      <ActivitiesFormModal
        isOpen={isOpen}
        closeModal={closeModal}
        currentYear={currentYear}
        currentSem={currentSem}
        handleSubmit={handleSubmit}
      />
      <Snackbar
        message={snackbarMsg}
        onClose={handleSnackbarClose}
        isSnackbarVisible={isSnackbarVisible}
        isSubmitted={isSubmitted}
      />
    </>
  );
};
