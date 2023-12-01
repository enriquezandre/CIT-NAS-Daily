"use client";
import { Table } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AttendanceSummaryTable = ({
  selectedMonth,
  selectedSem,
  selectedSY,
  openModal,
}) => {
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
          return 3;
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
        console.log(firstName);
        if (nasData.middleName === null) {
          setMiddleName(null);
        }

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
        {Array.isArray(attendanceSummaries) &&
          attendanceSummaries.map((summary) => (
            <Table.Row key={summary.id}>
              <Table.Cell>{summary.date}</Table.Cell>
              <Table.Cell>
                {summary.timeIn === "FTP IN"
                  ? "FTP IN"
                  : formatTime(summary.timeIn)}
              </Table.Cell>
              <Table.Cell>
                {summary.timeOut === "FTP OUT"
                  ? "FTP OUT"
                  : formatTime(summary.timeOut)}
              </Table.Cell>
              <Table.Cell>{formatTime(summary.overtimeIn)}</Table.Cell>
              <Table.Cell>{formatTime(summary.overtimeOut)}</Table.Cell>
              <Table.Cell>
                {summary.timeOut === "NO RECORD" ? (
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
  selectedSY: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
