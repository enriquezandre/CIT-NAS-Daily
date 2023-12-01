import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const WeeklyAttendance = ({
  firstName,
  lastName,
  middleName,
  selectedMonth,
  selectedSem,
  selectedSY,
}) => {
  const [attendanceSummaries, setAttendanceSummaries] = useState([]);

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

  const formatTime = (timeStr) => {
    if (timeStr) {
      const [hours, minutes] = timeStr.split(":");
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      return date.toLocaleTimeString("en-US", options);
    }
    return null;
  };

  const getSemesterValue = useMemo(() => {
    return (sem) => {
      switch (sem) {
        case "First":
          return 0;
        case "Second":
          return 1;
        case "Summer":
          return 3;
        default:
          return "Invalid semester";
      }
    };
  }, []);

  useEffect(() => {
    const fetchNas = async () => {
      try {
        const dtrresponse = await api.get(
          `DTR/${selectedSY}/${getSemesterValue(
            selectedSem
          )}/${firstName}/${lastName}?middleName=${middleName}`
        );
        const dtrdata = dtrresponse.data;

        const filteredData = dtrdata.dailyTimeRecords.filter((summary) => {
          if (selectedMonth === 0) {
            return true;
          } else {
            const summaryMonth = parseInt(summary.date.split("-")[1], 10);
            return summaryMonth === selectedMonth;
          }
        });
        console.log("SELECTED MONTH", selectedMonth);
        setAttendanceSummaries(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNas();
  }, [
    selectedMonth,
    selectedSem,
    selectedSY,
    api,
    firstName,
    middleName,
    lastName,
    getSemesterValue,
  ]);

  return (
    <table className="w-4/5 mx-auto mb-8">
      <thead>
        <tr>
          <th className="border px-4 py-2 w-1/5">DATE</th>
          <th className="border px-4 py-2 w-1/5">TIME-IN</th>
          <th className="border px-4 py-2 w-1/5">TIMEOUT</th>
          <th className="border px-4 py-2 w-1/5">OVERTIME IN</th>
          <th className="border px-4 py-2 w-1/5">OVERTIME OUT</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(attendanceSummaries) &&
          attendanceSummaries.map((summary) => (
            <tr key={summary.id}>
              <td className="border px-4 py-8 w-1/5 text-center">{summary.date}</td>
              <td className="border px-4 py-2 w-1/5 text-center">
                {summary.timeIn === "FTP IN" ? "FTP IN" : formatTime(summary.timeIn)}
              </td>
              <td className="border px-4 py-2 w-1/5 text-center">
                {summary.timeOut === "FTP OUT" ? "FTP OUT" : formatTime(summary.timeOut)}
              </td>
              <td className="border px-4 py-2 w-1/5 text-center">
                {formatTime(summary.overtimeIn)}
              </td>
              <td className="border px-4 py-2 w-1/5 text-center">
                {formatTime(summary.overtimeOut)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

WeeklyAttendance.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  middleName: PropTypes.string.isRequired,
  selectedMonth: PropTypes.number.isRequired,
  selectedSem: PropTypes.string.isRequired,
  selectedSY: PropTypes.string.isRequired,
};
