"use client";
import { Table } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AttendanceSummaryTable = ({ selectedMonth, selectedSem, selectedSY, openModal }) => {
  const { nasId } = useParams();
  const [attendanceSummaries, setAttendanceSummaries] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

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

  useEffect(() => {
    const fetchDataByNames = async () => {
      try {
        const nasResponse = await api.get(`NAS/${nasId}`);
        const nasData = nasResponse.data;
        setFirstName(nasData.firstName);
        setLastName(nasData.lastName);
        setMiddleName(nasData.middleName);
        if (nasData.middleName === null) {
          setMiddleName(null);
        }

        const dtrresponse = await api.get(
          `DTR/${selectedSY}/${getSemesterValue(
            selectedSem
          )}/${firstName}/${lastName}?middleName=${middleName}`
        );
        const dtrdata = dtrresponse.data.dailyTimeRecords;

        const startDate = new Date("2021-01-01");
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const dateRange = [];
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          dateRange.push(new Date(d));
        }

        const groupedData = dtrdata.reduce((acc, curr) => {
          const date = curr.date.split(" ")[0];
          if (!acc[date]) {
            acc[date] = {
              timeIn: curr.timeIn,
              timeOut: curr.timeOut,
              overtimeIn: curr.overtimeIn,
              overtimeOut: curr.overtimeOut,
            };
          }
          if (curr.inOut && curr.date) {
            acc[date][curr.inOut].push(curr);
          }
          return acc;
        }, {});

        const latestLogs = dateRange.map((date) => {
          const dateString = date.toISOString().split("T")[0];
          const logs = groupedData[dateString];
          // console.log("LOGS", logs);
          if (logs) {
            return {
              date: dateString,
              timeIn: logs.timeIn,
              timeOut: logs.timeOut,
              overtimeIn: logs.overtimeIn,
              overtimeOut: logs.overtimeOut,
            };
          } else {
            return {
              date: dateString,
              timeIn: null,
              timeOut: null,
              overtimeIn: null,
              overtimeOut: null,
            };
          }
        });

        const filteredData = latestLogs.filter((item) => {
          const date = new Date(item.date);
          if (date.getDay() === 0) {
            return false;
          }
          const month = date.getMonth();
          const year = date.getFullYear();
          const first = parseInt(
            year.toString().substring(0, 2) + selectedSY.toString().substring(0, 2)
          );
          const second = parseInt(
            year.toString().substring(0, 2) + selectedSY.toString().substring(2)
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

        setAttendanceSummaries(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataByNames();
  }, [
    nasId,
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
    <Table hoverable>
      <Table.Head className="text-center">
        <Table.HeadCell>DATE</Table.HeadCell>
        <Table.HeadCell>TIME-IN</Table.HeadCell>
        <Table.HeadCell>TIME-OUT</Table.HeadCell>
        <Table.HeadCell>OVERTIME-IN</Table.HeadCell>
        <Table.HeadCell>OVERTIME-OUT</Table.HeadCell>
        <Table.HeadCell>APPEAL</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y text-center">
        {Array.isArray(attendanceSummaries) &&
          attendanceSummaries.map((summary) => (
            <Table.Row key={summary.date}>
              <Table.Cell>{summary.date}</Table.Cell>
              <Table.Cell>
                {summary.timeIn === "FTP IN"
                  ? "FTP IN"
                  : summary.timeIn !== null
                  ? formatTime(summary.timeIn)
                  : "-"}
              </Table.Cell>

              <Table.Cell>
                {summary.timeOut === "FTP OUT" ? (
                  "FTP OUT"
                ) : summary.timeOut !== null ? (
                  formatTime(summary.timeOut)
                ) : (
                  <p className="font-bold text-red">NO RECORD</p>
                )}
              </Table.Cell>
              <Table.Cell>{formatTime(summary.overtimeIn)}</Table.Cell>
              <Table.Cell>{formatTime(summary.overtimeOut)}</Table.Cell>
              <Table.Cell>
                {summary.timeIn === null || summary.timeOut === null ? (
                  <button className="hover:underline" onClick={openModal}>
                    YES
                  </button>
                ) : (
                  "" // Record exists, leave the cell blank
                )}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

AttendanceSummaryTable.propTypes = {
  selectedMonth: PropTypes.number.isRequired,
  selectedSem: PropTypes.string.isRequired,
  selectedSY: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};
