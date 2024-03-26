import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const ViewScheduleTable = ({ nasId, schoolYear, semester }) => {
  const [totalHours, setTotalHours] = useState(0);
  const [schedule, setSchedule] = useState({
    Monday: { items: [], hasSchedule: false },
    Tuesday: { items: [], hasSchedule: false },
    Wednesday: { items: [], hasSchedule: false },
    Thursday: { items: [], hasSchedule: false },
    Friday: { items: [], hasSchedule: false },
    Saturday: { items: [], hasSchedule: false },
    Sunday: { items: [], hasSchedule: false },
  });

  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const api = axios.create({
          baseURL: `${url}/api`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(`/Schedule/${nasId}/${schoolYear}/${semester}`);
        const nasData = response.data;

        // Update the schedule state with the fetched data
        if (Array.isArray(nasData.schedules)) {
          const updatedSchedule = {
            Monday: { items: [], hasSchedule: false },
            Tuesday: { items: [], hasSchedule: false },
            Wednesday: { items: [], hasSchedule: false },
            Thursday: { items: [], hasSchedule: false },
            Friday: { items: [], hasSchedule: false },
            Saturday: { items: [], hasSchedule: false },
            Sunday: { items: [], hasSchedule: false },
          };

          nasData.schedules.forEach((item) => {
            const dayOfWeek = item.dayOfWeek;
            const dayName = getDayName(dayOfWeek);

            if (updatedSchedule[dayName]) {
              updatedSchedule[dayName].hasSchedule = true;
              updatedSchedule[dayName].items.push(item);
            } else {
              console.error(`Invalid day of the week: ${dayOfWeek}`);
            }
          });

          setSchedule(updatedSchedule);
        } else {
          console.error("Invalid data structure received from the API");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchedule();
  }, [nasId, schoolYear, semester, url]);

  useEffect(() => {
    calculateOverallTotal();
  }, [schedule]);

  const calculateOverallTotal = () => {
    let total = 0;
    Object.values(schedule).forEach((daySchedule) => {
      total += calculateNumOfHours(daySchedule.items);
    });
    setTotalHours(total);
  };

  const calculateNumOfHours = (items) => {
    let total = 0;
    if (Array.isArray(items)) {
      items.forEach((item) => {
        total += item.totalHours;
      });
    }
    return total;
  };

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
      case 6:
        return "Sunday";
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
    const formattedHours = hours % 12 || 12;
    return `${formattedHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  //if broken sched, separate sched with ";"
  const formatTimeSlots = (items) => {
    const timeSlots = items.map(
      (item) => `${formatTime(item.startTime)} - ${formatTime(item.endTime)}`
    );
    return items.length > 1 ? timeSlots.join("; ") : timeSlots[0];
  };

  return (
    <div>
      <div className="pb-5 flex justify-center">
        <table className="md:w-10/12 border-collapse border">
          <thead>
            <tr className="bg-primary text-white">
              <th colSpan="4" className="border p-2 text-center">
                Schedule of Duty
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
                  {schedule[day].hasSchedule ? formatTimeSlots(schedule[day].items) : "NO DUTY"}
                </td>
                <td className="border p-2 text-center align-middle">
                  {schedule[day].hasSchedule ? calculateNumOfHours(schedule[day].items) : ""}
                </td>
              </tr>
            ))}
            <tr>
              <td className="text-right font-bold p-2" colSpan="2">
                Total no. of hours:
              </td>
              <td className="text-center font-bold p-2" colSpan="1">
                {totalHours}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

ViewScheduleTable.propTypes = {
  currentMonth: PropTypes.string.isRequired,
  schoolYear: PropTypes.string.isRequired,
  semester: PropTypes.string.isRequired,
  nasId: PropTypes.string.isRequired,
};
