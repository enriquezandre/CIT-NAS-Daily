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
  nasId,
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

  const formatDtrTime = (timeStr) => {
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

        const scheduleResponse = await api.get(`/Schedule/${nasId}/${selectedSY}/0`);
        const scheduleData = scheduleResponse.data;

        // Calculate the totals for failedToPunch, lateOver10Mins, and lateOver45Mins
        let totalFailedToPunch = 0;
        let totalLateOver10Mins = 0;
        let totalLateOver45Mins = 0;

        const attendanceSummaries = dtrdata.dailyTimeRecords.map((attendance) => {
          const attendanceDate = new Date(attendance.date);

          // Adjust dayOfWeek calculation for Monday - Saturday week
          const dayOfWeek = (attendanceDate.getDay() + 6) % 7;
          const schedule = scheduleData.schedules.find((sched) => sched.dayOfWeek === dayOfWeek);

          if (attendance.timeIn === "FTP IN" || attendance.timeOut === "FTP OUT") {
            totalFailedToPunch = totalFailedToPunch + 1; //working
          } else {
            const timeIn = new Date("2023-08-14 " + formatDtrTime(attendance.timeIn));
            const schedStartTime = new Date(schedule.startTime);

            // Extract only the hours and minutes from the date objects
            const hoursDiff = timeIn.getHours() - schedStartTime.getHours();
            const minutesDiff = timeIn.getMinutes() - schedStartTime.getMinutes();

            // Convert the time difference to minutes
            const totalMinutesDifference = hoursDiff * 60 + minutesDiff;

            if (totalMinutesDifference > 10) {
              totalLateOver10Mins = totalLateOver10Mins + 1;
            }

            if (totalMinutesDifference > 45) {
              totalLateOver45Mins = totalLateOver45Mins + 1;
            }
          }
          return attendance;
        });

        setAttendanceSummaries(attendanceSummaries);

        // Make the API call to post the summary
        const postResponse = await api.post("/TimekeepingSummary", {
          nasId,
          semester: 0,
          schoolYear: 2324,
          excused: 0,
          unexcused: 0,
          failedToPunch: totalFailedToPunch,
          lateOver10mins: totalLateOver10Mins,
          lateOver45mins: totalLateOver45Mins,
          makeUpDutyHours: 0,
        });
        console.log(postResponse);
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
    nasId,
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
                {summary.timeIn === "FTP IN" ? "FTP IN" : formatDtrTime(summary.timeIn)}
              </td>
              <td className="border px-4 py-2 w-1/5 text-center">
                {summary.timeOut === "FTP OUT" ? "FTP OUT" : formatDtrTime(summary.timeOut)}
              </td>
              <td className="border px-4 py-2 w-1/5 text-center">
                {formatDtrTime(summary.overtimeIn)}
              </td>
              <td className="border px-4 py-2 w-1/5 text-center">
                {formatDtrTime(summary.overtimeOut)}
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
  nasId: PropTypes.number.isRequired,
};
