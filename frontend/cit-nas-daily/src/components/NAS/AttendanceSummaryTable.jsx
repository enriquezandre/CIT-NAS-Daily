"use client";
import { Table } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AttendanceSummaryTable = ({ selectedMonth }) => {
  const { nasId } = useParams();
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

        // TO DO: DATE RANGE FOR FIRST, SECOND, SUMMER SEMESTER
        const startDate = new Date("2023-10-01");
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
              DutyOff: "absent",
              OvertimeOn: null,
              OverTimeOff: null,
            };
          }
        });

        const filteredData = latestLogs.filter((item) => {
          const month = new Date(item.dateTime).getMonth();
          switch (selectedMonth) {
            case -1:
              return month >= 7 && month <= 11;
            case -2:
              return month >= 0 && month <= 5;
            case -3:
              return month >= 5 && month <= 7;
          }
          return month === selectedMonth;
        });

        setAttendanceSummaries(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNas();
  }, [nasId, selectedMonth]);

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    return `${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"}`;
  };

  return (
    <Table hoverable>
      <Table.Head>
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
      <Table.Body className="divide-y">
        {attendanceSummaries.map((summary) => (
          <Table.Row key={summary.dateTime}>
            <Table.Cell>{summary.dateTime}</Table.Cell>
            <Table.Cell>
              {summary.DutyOn
                ? formatTime(summary.DutyOn.dateTime.split("T")[1])
                : ""}
            </Table.Cell>
            <Table.Cell>
              {summary.DutyOff
                ? summary.DutyOff === "absent"
                  ? "absent"
                  : formatTime(summary.DutyOff.dateTime.split("T")[1])
                : ""}
            </Table.Cell>
            <Table.Cell>
              {summary.OvertimeOn
                ? formatTime(summary.OvertimeOn.dateTime.split("T")[1])
                : ""}
            </Table.Cell>
            <Table.Cell>
              {summary.OverTimeOff
                ? formatTime(summary.OverTimeOff.dateTime.split("T")[1])
                : ""}
            </Table.Cell>

            <Table.Cell></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

AttendanceSummaryTable.propTypes = {
  selectedMonth: PropTypes.number.isRequired,
};
