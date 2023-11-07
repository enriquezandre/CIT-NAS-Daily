import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ViewScheduleTable = () => {
  const { nasId } = useParams();
  const [schedule, setSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

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
        const nasData = response.data;

        // Update the schedule state with the fetched data
        const updatedSchedule = {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        };

        nasData.forEach((item) => {
          const dayOfWeek = item.dayOfWeek;
          const dayName = getDayName(dayOfWeek);

          if (updatedSchedule[dayName]) {
            updatedSchedule[dayName].push(item);
          } else {
            console.error(`Invalid day of the week: ${dayOfWeek}`);
          }
        });

        setSchedule(updatedSchedule);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchedule();
  }, [nasId]);

  const getDayName = (dayOfWeek) => {
    switch (dayOfWeek) {
      case 0:
        return "Monday";
      case 1:
        return "Tuesday";
      case 2:
        return "Wednesday";
      case 3:
        return "Thursday";
      case 4:
        return "Friday";
      case 5:
        return "Saturday";
      default:
        return "Unknown";
    }
  };

  // Function to format time in HH:MM AM/PM format
  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const formatTimeSlots = (items) => {
    const timeSlots = items.map((item) => `${formatTime(item.startTime)} - ${formatTime(item.endTime)}`);
    return items.length > 1 ? timeSlots.join('; ') : timeSlots[0];
  };

  const calculateNumOfHours = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.totalHours;
    });
    return total;
  };
  
  const calculateTotalHours = (items) => {
    let total = 0;
  
    if (items) {
      items.forEach((item) => {
        total += item.totalHours;
  
        if (item.brokenSched) {
          total += calculateTotalHours(item.items);
        }
      });
    }
  
    return total;
  };

  console.log(calculateTotalHours());

  return (
    <div>
      <div className="pb-10" style={{ display: 'flex', justifyContent: 'center' }}>
        <table className="w-10/12 border-collapse border">
          <thead>
            <tr>
              <th colSpan="4" className="border p-2 text-center">
                Schedule Table
              </th>
            </tr>
            <tr>
              <th className="border p-2 text-center align-middle">Day of Week</th>
              <th className="border p-2 text-center align-middle">Time</th>
              <th className="border p-2 text-center align-middle">No. of Hours</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(schedule).map((day) => (
              <tr key={day}>
                <td className="border p-2 text-center align-middle">{day}</td>
                <td className="border p-2 text-center align-middle">
                  {formatTimeSlots(schedule[day])}
                </td>
                <td className="border p-2 text-center align-middle">
                  {schedule[day].length > 0 ? (
                    schedule[day][0].brokenSched
                      ? calculateNumOfHours(schedule[day])
                      : schedule[day][0].totalHours
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
            <tr >
              <td className="text-right font-bold p-2" colSpan="2">Number of hours: </td>
              <td className="text-center font-bold p-2" colSpan="1">{calculateTotalHours()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
