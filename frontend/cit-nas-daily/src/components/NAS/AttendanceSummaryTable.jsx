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

        const dtrresponse = await api.get(
          `DTR/GetByNasName/${firstName}/${lastName}` //TO DO: ADD YEAR AND SEM PARAMS
        );
        const dtrdata = dtrresponse.data;
        console.log(dtrdata);
        setAttendanceSummaries(dtrdata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataByNames();
  }, [nasId, selectedMonth, selectedSem, selectedSY, api, firstName, lastName]);

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
