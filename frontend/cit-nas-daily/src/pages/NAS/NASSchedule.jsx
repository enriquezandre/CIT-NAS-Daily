import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ScheduleTable } from "../../components/NAS/SetScheduleTable.jsx";
import { ScheduleModal } from "../../components/NAS/ConfirmScheduleModal.jsx";
import { ViewScheduleTable } from "../../components/NAS/ViewScheduleTable.jsx";
import { calculateSchoolYear } from "../../components/SySemUtils.js";
import axios from "axios";

export const NASSchedule = () => {
  const { nasId } = useParams();
  const [selectedSem, setSelectedSem] = useState(0);
  const [isSchedModalOpen, setSchedModalOpen] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [dataExist, setDataExist] = useState(false);
  const url = import.meta.env.VITE_APP_API_URL;

  const openSetSchedModal = () => {
    setSchedModalOpen(true);
  };

  const closeSetSchedModal = () => {
    setSchedModalOpen(false);
  };

  const handleSelectedSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

  useEffect(() => {
    const currentYearValue = calculateSchoolYear();

    // Set the values to state
    setCurrentYear(currentYearValue);
  }, []);

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

  const api = useMemo(() => {
    return axios.create({
      baseURL: `${url}/api`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }, [url]);

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
            const semester = selectedSem;
            const schoolYear = currentYear;

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
          const semester = selectedSem;
          const schoolYear = currentYear;

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
  }, [days, schedule, selectedSem, currentYear, api, nasId, url]);
  // -------- functions for SetScheduleTable ends here

  //fetch schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await api.get(`/Schedule/${nasId}/${currentYear}/${selectedSem}`);
        setApiData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchedule();
  }, [nasId, currentYear, selectedSem, api]);

  //check if there is schedule
  useEffect(() => {
    const isDataExist =
      apiData &&
      apiData.schedules &&
      Array.isArray(apiData.schedules) &&
      apiData.schedules.length > 0;

    setDataExist(isDataExist);
  }, [apiData]);

  return (
    <div className="justify-center w-full h-full ite  ms-center border border-solid rounded-lg">
      <div className="m-3">
        <div className="md:m-2">
          <div className="flex flex-row justify-center md:justify-start items-center gap-8 md:gap-10 mt-6 mb-6">
            <div className="flex flex-row md:gap-2 items-center">
              <div className="mr-2">SY:</div>
              <select id="sy" name="sy" className="md:w-28 text-base border rounded-md" disabled>
                <option>{currentYear}</option>
              </select>
            </div>
            <div className="flex flex-row md:gap-2 items-center">
              <div className="mr-2">SEMESTER:</div>
              <select
                id="sem"
                name="sem"
                onChange={handleSelectedSem}
                className="md:w-28 text-base border rounded-md"
              >
                <option value={0}>First</option>
                <option value={1}>Second</option>
                <option value={2}>Summer</option>
              </select>
            </div>
          </div>
          <div className="pt-1">
            {dataExist ? (
              <ViewScheduleTable nasId={nasId} schoolYear={currentYear} semester={selectedSem} />
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
      <ScheduleModal
        isOpen={isSchedModalOpen}
        closeModal={closeSetSchedModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
