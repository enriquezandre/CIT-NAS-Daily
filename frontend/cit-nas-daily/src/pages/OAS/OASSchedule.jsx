import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Dropdown } from "../../components/Dropdown";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils";
import { ScheduleTable } from "../../components/NAS/SetScheduleTable.jsx";
import { ScheduleModal } from "../../components/NAS/ConfirmScheduleModal.jsx";
import { ViewScheduleTable } from "../../components/NAS/ViewScheduleTable.jsx";
import { ConfirmAddScheduleModal } from "../../components/NAS/ConfirmAddScheduleModal.jsx";

import axios from "axios";
const url = import.meta.env.VITE_APP_API_URL;

const currentSchoolYear = calculateSchoolYear();
const currentSemester = calculateSemester();

export const OASSchedule = () => {
  const [nasId, setNasId] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [office, setOffice] = useState("");
  const [nasArray, setNasArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxNasId, setMaxNasId] = useState(1);
  const [selectedSem, setSelectedSem] = useState(currentSemester);
  const [selectedSY, setSelectedSY] = useState(currentSchoolYear);
  const [apiData, setApiData] = useState(null);
  const [dataExist, setDataExist] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const sem_options = ["First", "Second", "Summer"];
  const [isDelSchedModalOpen, setDelSchedModalOpen] = useState(false);
  const [isSchedModalOpen, setSchedModalOpen] = useState(false);

  const api = useMemo(
    () =>
      axios.create({
        baseURL: `${url}/api`,
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

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const openSetSchedModal = () => {
    setSchedModalOpen(true);
  };

  const closeSetSchedModal = () => {
    setSchedModalOpen(false);
  };

  const openDelSchedModal = () => {
    setDelSchedModalOpen(true);
  };

  const closeAddSchedModal = () => {
    setDelSchedModalOpen(false);
  };

  // ------------ functions for SetScheduleTable starts here
  const days = useMemo(
    () => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    []
  );

  const [schedule, setSchedule] = useState({
    Monday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Tuesday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Wednesday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Thursday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Friday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Saturday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Sunday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
  });

  const [scheduleChanges, setScheduleChanges] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const handleStartTimeChange = useCallback(
    (day, index, value) => {
      const updatedSchedule = { ...schedule };
      updatedSchedule[day].items[index].start = value;
      setSchedule(updatedSchedule);

      setScheduleChanges((prevChanges) => ({ ...prevChanges, [day]: true }));
    },
    [schedule]
  );

  const handleEndTimeChange = useCallback(
    (day, index, value) => {
      const updatedSchedule = { ...schedule };
      updatedSchedule[day].items[index].end = value;
      setSchedule(updatedSchedule);

      setScheduleChanges((prevChanges) => ({ ...prevChanges, [day]: true }));
    },
    [schedule]
  );

  const handleToggleBrokenSchedule = (day, isBroken) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].isBroken = isBroken;
    setSchedule(updatedSchedule);

    setScheduleChanges({ ...scheduleChanges, [day]: true });
  };

  const handleAddScheduleRow = (day) => {
    if (schedule[day].isBroken) {
      const updatedSchedule = { ...schedule };
      updatedSchedule[day].items.push({ start: "", end: "", totalHours: 0 });
      setSchedule(updatedSchedule);

      setScheduleChanges({ ...scheduleChanges, [day]: true });
    }
  };

  const handleRemoveScheduleRow = (day, index) => {
    if (index === 0) {
      return;
    }
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].items.splice(index, 1);
    setSchedule(updatedSchedule);

    setScheduleChanges({ ...scheduleChanges, [day]: true });
  };

  useEffect(() => {
    days.forEach((day) => {
      if (scheduleChanges[day]) {
        const updatedSchedule = { ...schedule };
        updatedSchedule[day].items.forEach((scheduleItem, index) => {
          const startTime = scheduleItem.start;
          const endTime = scheduleItem.end;

          if (startTime && endTime) {
            const startHour = parseInt(startTime.split(":")[0]);
            const startMinute = parseInt(startTime.split(":")[1]);
            const endHour = parseInt(endTime.split(":")[0]);
            const endMinute = parseInt(endTime.split(":")[1]);

            const totalMinutes = endHour * 60 + endMinute - (startHour * 60 + startMinute);
            updatedSchedule[day].items[index].totalHours = totalMinutes / 60;
          } else {
            updatedSchedule[day].items[index].totalHours = 0;
          }
        });

        setSchedule(updatedSchedule);
        setScheduleChanges({ ...scheduleChanges, [day]: false });
      }
    });
  }, [schedule, scheduleChanges, days]);

  const calculateOverallTotalHours = () => {
    let totalHours = 0;
    days.forEach((day) => {
      schedule[day].items.forEach((scheduleItem) => {
        totalHours += scheduleItem.totalHours;
      });
    });
    return totalHours;
  };

  const overallHours = calculateOverallTotalHours();

  const handleSubmit = useCallback(async () => {
    try {
      // Loop through days and send each day's schedule to the backend
      days.forEach(async (day) => {
        if (schedule[day].isBroken) {
          schedule[day].items.forEach(async (scheduleItem) => {
            const dayOfWeek = day; // Assuming the day matches your enum
            const startTime =
              new Date().toISOString().split("T")[0] + "T" + scheduleItem.start + ":00.000Z";
            const endTime =
              new Date().toISOString().split("T")[0] + "T" + scheduleItem.end + ":00.000Z";
            const brokenSched = true;
            const totalHours = scheduleItem.totalHours;
            const semester = getSemesterValue(selectedSem);
            const schoolYear = selectedSY;

            // Send the schedule data for each row
            await api.post(`${url}/api/Schedule`, {
              nasId,
              dayOfWeek,
              startTime,
              endTime,
              brokenSched,
              totalHours,
              semester,
              schoolYear,
            });
          });
        } else {
          const scheduleItem = schedule[day].items[0];
          const dayOfWeek = day; // Assuming the day matches your enum
          const startTime =
            new Date().toISOString().split("T")[0] + "T" + scheduleItem.start + ":00.000Z";
          const endTime =
            new Date().toISOString().split("T")[0] + "T" + scheduleItem.end + ":00.000Z";
          const brokenSched = false;
          const totalHours = scheduleItem.totalHours;
          const semester = getSemesterValue(selectedSem);
          const schoolYear = selectedSY;

          // Send the schedule data for the single row
          await api.post(`${url}/api/Schedule`, {
            nasId,
            dayOfWeek,
            startTime,
            endTime,
            brokenSched,
            totalHours,
            semester,
            schoolYear,
          });

          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [days, schedule, selectedSem, selectedSY, api, nasId, url]);
  // -------- functions for SetScheduleTable ends here

  useEffect(() => {
    const fetchNasData = async () => {
      try {
        const response = await api.get(`/NAS/${selectedSY}/${getSemesterValue(selectedSem)}/noimg`);
        setNasArray(response.data);

        setNasId(response.data[currentIndex].id);
        setFirstname(response.data[currentIndex].firstName);
        setMiddlename(response.data[currentIndex].middleName);
        setLastname(response.data[currentIndex].lastName);
        setOffice(response.data[currentIndex].officeName);
        setMaxNasId(response.data.length - 1);
      } catch (error) {
        console.error(error);
        if (error.response.status === 404) {
          setNasArray([]);
          setMaxNasId(0);
          setFirstname(null);
          setMiddlename(null);
          setLastname(null);
          setOffice(null);
        }
      }
    };

    fetchNasData();
  }, [api, selectedSY, selectedSem, currentIndex, getSemesterValue]);

  useEffect(() => {
    if (searchInput.trim() !== "") {
      const results = nasArray.filter((data) =>
        data.fullName.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (results[0]) {
        setCurrentIndex(nasArray.indexOf(results[0]));
      }
    }
  }, [searchInput, nasArray]);

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

  //fetch schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await api.get(
          `/Schedule/${nasId}/${selectedSY}/${getSemesterValue(selectedSem)}`
        );
        setApiData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchedule();
  }, [nasId, selectedSY, selectedSem, api]);

  //check if there is schedule
  useEffect(() => {
    const isDataExist =
      apiData &&
      apiData.schedules &&
      Array.isArray(apiData.schedules) &&
      apiData.schedules.length > 0;

    setDataExist(isDataExist);
  }, [apiData]);

  //delete schedule
  const deleteSchedule = async (nasId, selectedSY, selectedSem) => {
    try {
      //Make delete request
      await api.delete(`/Schedule/${nasId}/${selectedSY}/${getSemesterValue(selectedSem)}`);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleDelSched = () => {
    deleteSchedule(nasId, selectedSY, selectedSem);
  };

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
    setCurrentIndex(0);
    setMaxNasId(0);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
    setCurrentIndex(0);
    setMaxNasId(0);
  };

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md flex-col w-9/10 mb-10">
        <div className="flex h-full flex-col">
          <ul className="text-sm md:text-base lg:text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid max-[450px]:grid-cols-1 grid-cols-2 overflow-x-auto">
            <div className="flex w-auto mb-3 ml-5 min-[450px]:mb-0">
              <div className="flex flex-col lg:flex-row justify-start lg:items-center gap-3 lg:gap-10">
                {currentIndex != 0 ? (
                  <button
                    className="text-black"
                    onClick={() => {
                      setCurrentIndex((currentIndex - 1) % nasArray.length);
                    }}
                  >
                    <HiOutlineArrowLeft className="h-6 w-6" />
                  </button>
                ) : (
                  ""
                )}
                <div>
                  <Dropdown
                    label="SY"
                    options={uniqueYears}
                    selectedValue={selectedSY}
                    onChange={(e) => handleSelectSY(e)}
                  />
                </div>
                <div>
                  <Dropdown
                    label="Semester"
                    options={sem_options}
                    selectedValue={selectedSem}
                    onChange={(e) => handleSelectSem(e)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end lg:items-center ml-5">
              <div className="relative w-auto">
                <input
                  type="search"
                  className="block p-2.5 w-full z-20 text-xs md:p-2 md:text-sm lg:text-base text-gray-900 rounded border"
                  placeholder="Search NAS..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-xs md:text-base lg:text-lg font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
              {currentIndex != maxNasId ? (
                <Button
                  className="text-black items-start py-0 lg:items-center"
                  onClick={() => {
                    setCurrentIndex((currentIndex + 1) % nasArray.length);
                  }}
                >
                  <HiOutlineArrowRight className="h-6 w-6" />
                </Button>
              ) : (
                ""
              )}
            </div>
          </ul>
          <div className="px-5 md:px-9 py-4">
            <div className="flex gap-10 mb-7 text-xs md:text-base lg:text-lg overflow-x-auto">
              <div className="font-bold" style={{ textTransform: "uppercase" }}>
                NAS NAME: {lastName}, {firstName} {middleName}
              </div>
              <div>
                <p className="font-bold" style={{ textTransform: "uppercase" }}>
                  DEPT/OFFICE: {office}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 md:gap-4">
              <div className="overflow-x-auto">
                {dataExist ? (
                  <div>
                    <ViewScheduleTable
                      nasId={nasId}
                      schoolYear={selectedSY}
                      semester={getSemesterValue(selectedSem)}
                    />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="btn btn-secondary bg-primary text-white min-[450px]:justify-start flex items-center px-3 py-1 md:px-4 md:py-2 rounded-lg md:m-1 text-sm md:text-base hover:bg-secondary hover:text-black font-normal mr-3"
                        onClick={openDelSchedModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span>Delete schedule</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <ScheduleTable
                    days={days}
                    schedule={schedule}
                    scheduleChanges={scheduleChanges}
                    handleToggleBrokenSchedule={handleToggleBrokenSchedule}
                    handleAddScheduleRow={handleAddScheduleRow}
                    handleRemoveScheduleRow={handleRemoveScheduleRow}
                    handleStartTimeChange={handleStartTimeChange}
                    handleEndTimeChange={handleEndTimeChange}
                    openModal={openSetSchedModal}
                    overallHours={overallHours}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ScheduleModal
          isOpen={isSchedModalOpen}
          closeModal={closeSetSchedModal}
          handleSubmit={handleSubmit}
        />
        <ConfirmAddScheduleModal //Confirm Delete schedule
          isOpen={isDelSchedModalOpen}
          closeModal={closeAddSchedModal}
          handleSubmit={handleDelSched}
        />
      </div>
    </>
  );
};
