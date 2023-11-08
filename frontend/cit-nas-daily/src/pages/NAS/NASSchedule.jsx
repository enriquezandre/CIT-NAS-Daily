"use client"
import React, { useState, useEffect } from "react";
import { Dropdown } from "../../components/Dropdown.jsx";
import { useParams } from "react-router-dom";
import { ScheduleTable } from "../../components/NAS/SetScheduleTable.jsx";
import { ScheduleModal } from "../../components/NAS/ConfirmScheduleModal.jsx";
import { ViewScheduleTable } from "../../components/NAS/ViewScheduleTable.jsx";
import axios from "axios";

export const NASSchedule = () => {
  const { nasId } = useParams();
  const [selectedSem, setSelectedSem] = useState("First");
  const [selectedSY, setSelectedSY] = useState("2324");
  const [isOpen, setIsOpen] = useState(false); // Manage isOpen state here
  const [apiData, setApiData] = useState(null);

  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSelectSem = (value) => {
    setSelectedSem(value);
  };

  const handleSelectSY = (value) => {
    setSelectedSY(value);
  };


  // functions for SetScheduleTable starts here

  const dayOfWeekMap = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
  };

  const [schedule, setSchedule] = useState({
    Monday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Tuesday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Wednesday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Thursday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Friday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
    Saturday: { isBroken: false, items: [{ start: "", end: "", totalHours: 0 }] },
  });

  const [scheduleChanges, setScheduleChanges] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const handleStartTimeChange = (day, index, value) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].items[index].start = value;
    setSchedule(updatedSchedule);

    console.log(`Start Time for ${day}, Row ${index}: ${value}`);
    setScheduleChanges({ ...scheduleChanges, [day]: true });
    
  };

  const handleEndTimeChange = (day, index, value) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[day].items[index].end = value;
    setSchedule(updatedSchedule);

    console.log(`End Time for ${day}, Row ${index}: ${value}`);
    setScheduleChanges({ ...scheduleChanges, [day]: true });
  };

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

            const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
            updatedSchedule[day].items[index].totalHours = totalMinutes / 60;
          } else {
            updatedSchedule[day].items[index].totalHours = 0;
          }
        });

        setSchedule(updatedSchedule);
        setScheduleChanges({ ...scheduleChanges, [day]: false });
      }
    });
  }, [schedule, scheduleChanges]);

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

  const handleSubmit = async () => {
    try {
      const api = axios.create({
        baseURL: "https://localhost:7001/api",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const scheduleData = [];
  
      days.forEach((day) => {
        if (schedule[day].isBroken) {
          schedule[day].items.forEach((scheduleItem) => {
            const dayOfWeek = dayOfWeekMap[day];
            const startTime = new Date().toISOString().split('T')[0] + 'T' + scheduleItem.start + ':00.000Z';
            const endTime = new Date().toISOString().split('T')[0] + 'T' + scheduleItem.end + ':00.000Z';
            const brokenSched = true;
            const totalHours = scheduleItem.totalHours;
  
            scheduleData.push({
              nasId,
              dayOfWeek,
              startTime,
              endTime,
              brokenSched,
              totalHours,
            });
          });
        } else {
          const scheduleItem = schedule[day].items[0];
          const dayOfWeek = dayOfWeekMap[day];
          const startTime = new Date().toISOString().split('T')[0] + 'T' + scheduleItem.start + ':00.000Z';
          const endTime = new Date().toISOString().split('T')[0] + 'T' + scheduleItem.end + ':00.000Z';
          const brokenSched = false;
          const totalHours = scheduleItem.totalHours;
  
          scheduleData.push({
            nasId,
            dayOfWeek,
            startTime,
            endTime,
            brokenSched,
            totalHours,
          });
        }
      });
  
      // Send all schedule data in a single request
      const response = await api.post("Schedule", scheduleData);
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  // functions for SetScheduleTable ends here

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const response = await api.get(`/Schedule/${nasId}`);
        setApiData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchedule();
  }, [nasId]);

  const dataExist = apiData && apiData.length > 0;

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
                disabled
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
                disabled
              >
                {sem_options.map((sem, index) => (
                  <option key={index} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pt-10">
            {dataExist ? (
              <ViewScheduleTable apiData={apiData} />
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
                openModal={openModal}
                overallHours={overallHours}
              />
            )}
          </div>
        </div>
      </div>
      <ScheduleModal isOpen={isOpen} closeModal={closeModal} handleSubmit={handleSubmit} />
    </div>
  );
};