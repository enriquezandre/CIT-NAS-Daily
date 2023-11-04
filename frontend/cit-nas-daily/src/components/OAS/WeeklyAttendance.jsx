import { useEffect, useState } from "react";
import axios from "axios";

export const WeeklyAttendance = () => {
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

        const response = await api.get(`BiometricLogs?nasId=1`);
        console.log(response);
        const data = response.data;
        const groupedData = data.reduce((acc, curr) => {
          const date = curr.dateTime.split("T")[0];
          if (!acc[date]) {
            acc[date] = {
              DutyOn: [],
              DutyOff: [],
              OvertimeOn: [],
              "OverTime Off": [],
            };
          }
          acc[date][curr.inOut].push(curr);
          return acc;
        }, {});

        const latestLogs = Object.keys(groupedData).map((date) => {
          const logs = groupedData[date];
          return {
            dateTime: date,
            DutyOn: logs.DutyOn.sort(
              (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
            )[0],
            DutyOff: logs.DutyOff.sort(
              (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
            )[0],
            OvertimeOn: logs.OvertimeOn.sort(
              (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
            )[0],
            "OverTime Off": logs["OverTime Off"].sort(
              (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
            )[0],
          };
        });
        setAttendanceSummaries(latestLogs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNas();
  }, [1]);

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
                ? formatTime(summary.DutyOff.dateTime.split("T")[1])
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
