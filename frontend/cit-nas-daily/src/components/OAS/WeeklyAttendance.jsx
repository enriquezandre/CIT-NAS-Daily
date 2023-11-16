import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const WeeklyAttendance = ({
  nasId,
  selectedMonth,
  selectedSem,
  selectedSY,
}) => {
  const [attendanceSummaries, setAttendanceSummaries] = useState([]);

  useEffect(() => {
    const fetchNas = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const response = await api.get(`BiometricLogs?nasId=${nasId}`);
        const data = response.data;

        if (!data || data.length === 0) {
          setAttendanceSummaries([
            {
              dateTime: null,
              DutyOn: null,
              DutyOff: "NO RECORD",
              OvertimeOn: null,
              OverTimeOff: null,
            },
          ]);
          return;
        }

        // TO DO: DATE RANGE FOR FIRST, SECOND, SUMMER SEMESTER
        const startDate = new Date("2021-01-01");
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const dateRange = [];
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          dateRange.push(new Date(d));
        }

        // Group the data by date
        const groupedData = data.reduce((acc, curr) => {
          const date = curr.dateTime.split("T")[0];
          if (!acc[date]) {
            acc[date] = {
              DutyOn: [],
              DutyOff: [],
              OvertimeOn: [],
              OvertimeOff: [],
            };
          }
          acc[date][curr.inOut].push(curr);
          return acc;
        }, {});

        // Create a record for each date in the date range
        const latestLogs = dateRange.map((date) => {
          const dateString = date.toISOString().split("T")[0];
          const logs = groupedData[dateString];
          if (logs) {
            return {
              dateTime: dateString,
              DutyOn: logs.DutyOn.sort(
                (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
              )[0],
              DutyOff: logs.DutyOff.sort(
                (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
              )[0],
              OvertimeOn: logs.OvertimeOn.sort(
                (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
              )[0],
              OvertimeOff: logs.OvertimeOff.sort(
                (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
              )[0],
            };
          } else {
            return {
              dateTime: dateString,
              DutyOn: null,
              DutyOff: "NO RECORD",
              OvertimeOn: null,
              OverTimeOff: null,
            };
          }
        });

        const filteredData = latestLogs.filter((item) => {
          const date = new Date(item.dateTime);
          const month = date.getMonth();
          const year = date.getFullYear();
          const first = parseInt(
            year.toString().substring(0, 2) + selectedSY.substring(0, 2)
          );
          const second = parseInt(
            year.toString().substring(0, 2) + selectedSY.substring(2)
          );
          switch (selectedMonth) {
            case -1:
              return month >= 7 && month <= 11 && year === first;
            case -2:
              return month >= 0 && month <= 5 && year === second;
            case -3:
              return month >= 5 && month <= 7 && year === second;
          }

          switch (selectedSem) {
            case "First":
              return month === selectedMonth && year === first;
            case "Second":
              return month === selectedMonth && year === second;
            case "Summer":
              return month === selectedMonth && year === second;
          }
        });
        console.log(nasId);
        setAttendanceSummaries(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNas();
  }, [nasId, selectedMonth, selectedSem, selectedSY]);

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    return `${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"}`;
  };

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
        {attendanceSummaries.map((summary) => (
          <tr key={summary.dateTime}>
            <td className="border px-4 py-8 w-1/5 text-center">
              {summary.dateTime}
            </td>
            <td className="border px-4 py-2 w-1/5 text-center">
              {summary.DutyOn
                ? formatTime(summary.DutyOn.dateTime.split("T")[1])
                : ""}
            </td>
            <td className="border px-4 py-2 w-1/5 text-center">
              {summary.DutyOff
                ? summary.DutyOff === "NO RECORD"
                  ? "NO RECORD"
                  : formatTime(summary.DutyOff.dateTime.split("T")[1])
                : ""}
            </td>
            <td className="border px-4 py-2 w-1/5 text-center">
              {summary.OvertimeOn
                ? formatTime(summary.OvertimeOn.dateTime.split("T")[1])
                : ""}
            </td>
            <td className="border px-4 py-2 w-1/5 text-center">
              {summary["OverTime Off"]
                ? formatTime(summary["OverTime Off"].dateTime.split("T")[1])
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

WeeklyAttendance.propTypes = {
  nasId: PropTypes.number.isRequired,
  selectedMonth: PropTypes.number.isRequired,
  selectedSem: PropTypes.string.isRequired,
  selectedSY: PropTypes.string.isRequired,
};
