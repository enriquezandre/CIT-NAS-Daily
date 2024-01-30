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
  isSubmitted,
}) => {
  const { nasId } = useParams();
  const [attendanceSummaries, setAttendanceSummaries] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [validationData, setValidationData] = useState([]);

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

  const formatTime = useMemo(
    () => (timeStr) => {
      if (timeStr) {
        const [hours, minutes] = timeStr.split(":");
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        const options = { hour: "numeric", minute: "numeric", hour12: true };
        return date.toLocaleTimeString("en-US", options);
      }
      return null;
    },
    []
  );

  const formatDate = useMemo(
    () => (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    []
  );

  const getValidationStatus = useMemo(
    () => (validationStatus) => {
      switch (validationStatus) {
        case 0:
          return "PENDING";
        case 1:
          return "EXCUSED";
        case 2:
          return "UNEXCUSED";
        case 3:
          return "FOR MAKEUP DUTY";
        case 4:
          return "APPROVED";
        case 5:
          return "DISAPPROVED";
        case 6:
          return "WARNING";
        case 7:
          return "LAST WARNING";
        case 8:
          return "REPORT TO OFFICE";
        default:
          return "INVALID STATUS";
      }
    },
    []
  );

  const getStatusColor = useMemo(
    () => (validationStatus) => {
      switch (validationStatus) {
        case 0:
          return "#e0d90d";
        case 1:
        case 3:
        case 4:
          return "#10c919";
        case 2:
        case 5:
        case 8:
          return "red";
        case 6:
        case 7:
          return "#fca903";
      }
    },
    []
  );

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
          )}/${lastName}/${firstName}?middleName=${middleName}`
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
              punch1: curr.punch1,
              punch2: curr.punch2,
              punch3: curr.punch3,
              punch4: curr.punch4,
              overtimeIn: curr.overtimeIn,
              overtimeOut: curr.overtimeOut,
            };
          }
          return acc;
        }, {});

        const latestLogs = dateRange.map((date) => {
          const dateString = date.toISOString().split("T")[0];
          const logs = groupedData[dateString];
          if (logs) {
            return {
              date: dateString,
              punch1: logs.punch1,
              punch2: logs.punch2,
              punch3: logs.punch3,
              punch4: logs.punch4,
              overtimeIn: logs.overtimeIn,
              overtimeOut: logs.overtimeOut,
            };
          } else {
            return {
              date: dateString,
              punch1: null,
              punch2: null,
              punch3: null,
              punch4: null,
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

  useEffect(() => {
    const fetchValidation = async () => {
      try {
        const response = await api.get(`/Validation/nas/${nasId}`);
        const validationData = response.data;

        // Create an array of objects with absenceDate and validationStatus
        const validationArray = validationData.map((validation) => ({
          absenceDate: formatDate(new Date(validation.absenceDate)),
          validationStatus: validation.validationStatus,
          makeUpHours: validation.makeUpHours,
        }));

        setValidationData(validationArray);

        // Refetch validation data after a successful submission
        if (isSubmitted) {
          const responseAfterSubmission = await api.get(`/Validation/nas/${nasId}`);
          const validationDataAfterSubmission = responseAfterSubmission.data;

          const validationAfterSubmission = validationDataAfterSubmission.map((validation) => ({
            absenceDate: formatDate(new Date(validation.absenceDate)),
            validationStatus: validation.validationStatus,
            makeUpHours: validation.makeUpHours,
          }));

          setValidationData(validationAfterSubmission);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchValidation();
  }, [nasId, formatDate, api, isSubmitted]);

  return (
    <Table hoverable>
      <Table.Head className="text-center">
        <Table.HeadCell>DATE</Table.HeadCell>
        <Table.HeadCell>TIME-IN1</Table.HeadCell>
        <Table.HeadCell>TIME-OUT1</Table.HeadCell>
        <Table.HeadCell>TIME-IN2</Table.HeadCell>
        <Table.HeadCell>TIME-OUT2</Table.HeadCell>
        <Table.HeadCell>OVERTIME-IN</Table.HeadCell>
        <Table.HeadCell>OVERTIME-OUT</Table.HeadCell>
        <Table.HeadCell>APPEAL</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y text-center">
        {Array.isArray(attendanceSummaries) &&
          attendanceSummaries.map((summary) => {
            // Find the corresponding validation entry for the current summary date
            const validationEntry = validationData.find(
              (validation) => validation.absenceDate === summary.date
            );
            return (
              <Table.Row key={summary.date}>
                <Table.Cell>{summary.date}</Table.Cell>
                <Table.Cell>
                  {summary.punch1 === "FTP IN"
                    ? "FTP IN"
                    : summary.punch1 !== null
                    ? formatTime(summary.punch1)
                    : "-"}
                </Table.Cell>
                <Table.Cell>
                  {summary.punch2 === "FTP OUT" ? (
                    "FTP OUT"
                  ) : summary.punch2 !== null ? (
                    formatTime(summary.punch2)
                  ) : validationEntry ? (
                    // Display validation status and make-up hours if a corresponding validation entry exists
                    validationEntry.validationStatus === 3 ? (
                      <p
                        style={{ color: getStatusColor(validationEntry.validationStatus) }}
                        className="font-semibold"
                      >
                        {getValidationStatus(validationEntry.validationStatus) +
                          ": " +
                          validationEntry.makeUpHours}{" "}
                        hours
                      </p>
                    ) : (
                      <p
                        style={{ color: getStatusColor(validationEntry.validationStatus) }} // Use getStatusColor here
                        className="font-semibold"
                      >
                        {getValidationStatus(validationEntry.validationStatus)}
                      </p>
                    )
                  ) : (
                    // If no validation entry, display "NO RECORD"
                    <p className="font-bold text-gray">NO RECORD</p>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {summary.punch3 === "FTP IN"
                    ? "FTP IN"
                    : summary.punch3 !== null
                    ? formatTime(summary.punch3)
                    : "-"}
                </Table.Cell>
                <Table.Cell>
                  {summary.punch4 === "FTP OUT"
                    ? "FTP OUT"
                    : summary.punch4 !== null
                    ? formatTime(summary.punch4)
                    : "-"}
                </Table.Cell>
                <Table.Cell>{formatTime(summary.overtimeIn)}</Table.Cell>
                <Table.Cell>{formatTime(summary.overtimeOut)}</Table.Cell>
                <Table.Cell>
                  {(summary.punch1 === null || summary.punch2 === null) && !validationEntry ? (
                    <button className="hover:underline" onClick={() => openModal(summary.date)}>
                      YES
                    </button>
                  ) : (
                    "" // Record exists, leave the cell blank
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

AttendanceSummaryTable.propTypes = {
  selectedMonth: PropTypes.number.isRequired,
  selectedSem: PropTypes.string.isRequired,
  selectedSY: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
};
