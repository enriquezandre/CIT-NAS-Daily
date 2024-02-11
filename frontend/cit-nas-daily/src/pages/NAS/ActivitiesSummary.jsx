"use client";
import { Table } from "flowbite-react";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
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
  const [activitySummaries, setActivitySummaries] = useState([]);

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
    const fetchNASActivitiesSummary = async () => {
      try {
        const response = await api.get(
          `/ActivitiesSummary/${nasId}/${selectedSY}/${getSemesterValue(selectedSem)}`
        );
        const data = response.data;

        const filteredData = data.filter((item) => {
          const date = new Date(item.dateOfEntry);
          const month = date.getMonth();
          const year = date.getFullYear();
          const first = parseInt(
            year.toString().substring(0, 2) + selectedSY.toString().substring(0, 2)
          );
          const second = parseInt(
            year.toString().substring(0, 2) + selectedSY.toString().substring(2)
          );
          switch (selectedMonthIndex) {
            case -1:
              return month >= 7 && month <= 11 && year === first;
            case -2:
              return month >= 0 && month <= 5 && year === second;
            case -3:
              return month >= 5 && month <= 7 && year === second;
          }

          switch (selectedSem) {
            case "First":
              return month === selectedMonthIndex && year === first;
            case "Second":
              return month === selectedMonthIndex && year === second;
            case "Summer":
              return month === selectedMonthIndex && year === second;
          }
        });
        setActivitySummaries((prevActivitySummaries) => {
          if (JSON.stringify(prevActivitySummaries) !== JSON.stringify(filteredData)) {
            return filteredData;
          } else {
            return prevActivitySummaries;
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchNASActivitiesSummary();
  }, [
    nasId,
    selectedMonthIndex,
    selectedSem,
    selectedSY,
    activitySummaries,
    getSemesterValue,
    api,
    isSubmitted,
  ]);

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
    setIsSubmitted(false);
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
      <div className="justify-center w-full h-full items-center border border-solid rounded-lg">
        <div className="m-3">
          <div className="m-2">
            <div className="flex flex-col justify-start items-start gap-2 mt-6 mb-6 md:gap-10 md:flex-row lg:gap-10 lg:flex-row lg:items-center">
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
            <div className="m-5 overflow-x-auto">
              <div>
                <Table hoverable className="border">
                  <Table.Head className="border">
                    <Table.HeadCell className="text-center border">DATE</Table.HeadCell>
                    <Table.HeadCell className="text-center border">
                      Activities of the Day
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center border">Skills Learned</Table.HeadCell>
                    <Table.HeadCell className="text-center border">Values Learned</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {activitySummaries.map((summary) => (
                      <Table.Row key={summary.id}>
                        <Table.Cell
                          className="text-center border"
                          style={{ overflowWrap: "break-word", maxWidth: "100px" }}
                        >
                          {new Date(summary.dateOfEntry).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell
                          className="text-center border"
                          style={{ overflowWrap: "break-word", maxWidth: "100px" }}
                        >
                          {summary.activitiesOfTheDay}
                        </Table.Cell>
                        <Table.Cell
                          className="text-center border"
                          style={{ overflowWrap: "break-word", maxWidth: "100px" }}
                        >
                          {summary.skillsLearned}
                        </Table.Cell>
                        <Table.Cell
                          className="text-center border"
                          style={{ overflowWrap: "break-word", maxWidth: "100px" }}
                        >
                          {summary.valuesLearned}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                    <Table.Row>
                      <Table.Cell colSpan={4} className="text-center border">
                        <button
                          className="btn btn-primary bg-secondary px-4 py-2 rounded-lg m-1 text-sm hover:bg-primary hover:text-white"
                          onClick={openModal}
                        >
                          Add an entry
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <ActivitiesFormModal
                  isOpen={isOpen}
                  closeModal={closeModal}
                  currentYear={currentYear}
                  currentSem={currentSem}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        message={snackbarMsg}
        onClose={handleSnackbarClose}
        isSnackbarVisible={isSnackbarVisible}
        isSubmitted={isSubmitted}
      />
    </>
  );
};
