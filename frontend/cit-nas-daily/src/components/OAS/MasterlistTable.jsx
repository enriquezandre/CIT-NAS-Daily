import { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ProgramDropdown from "../ProgramDropdown";
import OfficeDropdown from "../OfficeDropdown";

export const MasterlistTable = ({ searchInput, selectedSY, selectedSem, submitted }) => {
  const [nasData, setNasData] = useState([]);
  const [filteredNASData, setFilteredNASData] = useState([]);
  const [toUpdate, setToUpdate] = useState(false);
  const [nasId, setNasId] = useState();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedOfficeName, setSelectedOfficeName] = useState(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [nasYearLevel, setNasYearLevel] = useState(null);
  const [nasUnitsAllowed, setNasUnitsAllowed] = useState(null);
  const nasYearLvlRef = useRef();
  const nasUnitsAllowedRef = useRef();

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

  const header = [
    "ID Number",
    "Last Name",
    "First Name",
    "Middle Name",
    "Gender",
    "Birthdate",
    "Program",
    "Year",
    "No. of Units Allowed",
    "Date Started",
    "Department Assigned",
    "EA",
    "UEA",
    "L>10 mins.",
    "L>45 mins.",
    "FTP",
    "FOR MAKE UP",
    "OT",
    "REMARKS",
    "Update",
  ];

  function getSemesterValue(sem) {
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
  }

  const handleClick = (e, rowId, officeName, officeId) => {
    e.preventDefault();
    setToUpdate(!toUpdate);
    setSelectedRowId(rowId);
    setSelectedOfficeName(officeName);
    setSelectedOfficeId(officeId);
    console.log("selectedOfficeId", selectedOfficeId);
    console.log("selectedOfficeName", selectedOfficeName);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setToUpdate(!toUpdate);
    setSelectedRowId(null);
    console.log("NAS ID", nasId);
    console.log("nasYearLvl", nasYearLevel);
    console.log("nasUnitsAllowed", nasUnitsAllowed);
    console.log("selectedprogram submit", selectedProgram);

    const data = {
      officeId: selectedOfficeId,
      yearLevel: nasYearLevel,
      course: selectedProgram,
      unitsAllowed: nasUnitsAllowed,
    };
    console.log("DATA SUBMIT", data);

    try {
      const response = await api.put(`/NAS/${nasId}`, data);
      if (response.status === 200) {
        alert("NAS updated successfully!");
      }
      console.log("selectedoffice submit", selectedOfficeId);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        alert("Failed to update NAS.");
      }
    }
  };

  useEffect(() => {
    const fetchNas = async () => {
      try {
        const nasresponse = await api.get(
          `/NAS/${selectedSY}/${getSemesterValue(selectedSem)}/noimg`
        );
        const nasData = nasresponse.data;

        const nasDataWithTimekeeping = await Promise.all(
          nasData.map(async (nas) => {
            setNasId(nas.id);
            try {
              const timekeepingresponse = await api.get(
                `/TimekeepingSummary/${nasId}/${selectedSY}/${getSemesterValue(selectedSem)}`
              );
              nas.timekeeping = timekeepingresponse.data;
              console.log("nas.timekeeping", nas.timekeeping);
            } catch (error) {
              console.error("Error fetching data for NAS:", error);
              nas.office = { name: "N/A" };
              nas.timekeeping = [];
            }
            return nas;
          })
        );
        setNasData(nasDataWithTimekeeping);
      } catch (error) {
        console.error(error);
        if (error.response.status === 404) {
          setNasData([]);
        }
      }
    };

    fetchNas();
  }, [selectedSY, selectedSem, api, submitted, nasId]);

  useEffect(() => {
    const filteredData = nasData.filter(
      (nas) =>
        nas.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        nas.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        nas.middleName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredNASData(filteredData);
  }, [searchInput, nasData]);

  const sortedNASData = useMemo(
    () => [...filteredNASData].sort((a, b) => a.lastName.localeCompare(b.lastName)),
    [filteredNASData]
  );

  return (
    <div className="w-auto">
      <table className="w-auto table-auto">
        <thead>
          <tr>
            {header.map((header, index) => (
              <th
                key={index}
                className="border-2 border-black text-white text-center text-xs uppercase font-semibold bg-primary px-4 py-2"
                value={header}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedNASData.map((nas, index) => (
            <tr key={index}>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {nas.studentIDNo}
              </td>
              <td
                className="border-2 border-black text-center px-1 py-2 text-xs"
                style={{ textTransform: "capitalize" }}
              >
                {nas.lastName}
              </td>
              <td
                className="border-2 border-black text-center px-1 py-2 text-xs"
                style={{ textTransform: "capitalize" }}
              >
                {nas.firstName}
              </td>
              <td
                className="border-2 border-black text-center px-1 py-2 text-xs"
                style={{ textTransform: "capitalize" }}
              >
                {nas.middleName}
              </td>
              <td
                className="border-2 border-black text-center px-1 py-2 text-xs"
                style={{ textTransform: "capitalize" }}
              >
                {nas.gender}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {new Date(nas.birthDate).toLocaleDateString()}
              </td>
              <td
                className="border-2 border-black text-center px-1 py-2 text-xs"
                style={{ textTransform: "uppercase" }}
              >
                {selectedRowId === nas.id && toUpdate ? (
                  <ProgramDropdown
                    onChange={(value) => setSelectedProgram(value)}
                    value={selectedProgram ? selectedProgram : setSelectedProgram(nas.course)}
                  />
                ) : (
                  nas.course
                )}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {selectedRowId === nas.id && toUpdate ? (
                  <input
                    ref={nasYearLvlRef}
                    type="text"
                    value={nasYearLevel ? nasYearLevel : setNasYearLevel(nas.yearLevel)}
                    placeholder={nas.yearLevel}
                    onChange={(e) => {
                      let inputValue = e.target.value;
                      if (!inputValue) {
                        inputValue = nas.yearLevel;
                      }
                      setNasYearLevel(inputValue);
                      console.log("nasYearLevelyawaaaa!!", nasYearLevel);
                    }}
                  />
                ) : (
                  nas.yearLevel
                )}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {selectedRowId === nas.id && toUpdate ? (
                  <input
                    ref={nasUnitsAllowedRef}
                    type="text"
                    value={nasUnitsAllowed ? nasUnitsAllowed : setNasUnitsAllowed(nas.unitsAllowed)}
                    placeholder={nas.unitsAllowed}
                    onChange={(e) => {
                      let inputValue = e.target.value;
                      if (!inputValue) {
                        inputValue = nas.unitsAllowed;
                      }
                      setNasUnitsAllowed(inputValue);
                    }}
                  />
                ) : (
                  nas.unitsAllowed
                )}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {new Date(nas.dateStarted).toLocaleDateString()}
              </td>
              <td
                className="border-2 border-black text-center px-1 py-2 text-xs"
                style={{ textTransform: "uppercase" }}
              >
                {selectedRowId === nas.id && toUpdate ? (
                  <OfficeDropdown
                    onChange={(value) => setSelectedOfficeId(value)}
                    value={selectedOfficeId ? selectedOfficeId : nas.officeName}
                  />
                ) : (
                  nas.officeName
                )}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {nas.timekeeping ? nas.timekeeping.excused : "NR"}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {nas.timekeeping ? nas.timekeeping.unexcused : "NR"}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {nas.timekeeping ? nas.timekeeping.lateOver10Mins : "NR"}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {nas.timekeeping ? nas.timekeeping.lateOver45Mins : "NR"}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {nas.timekeeping ? nas.timekeeping.failedToPunch : "NR"}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs">
                {nas.timekeeping ? nas.timekeeping.makeUpDutyHours : "NR"}
              </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs"> </td>
              <td className="border-2 border-black text-center px-1 py-2 text-xs"> </td>
              <td className="border-2 border-black text-xs">
                <div className="flex justify-center items-center">
                  {selectedRowId === nas.id && toUpdate ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer hover:transition-colors hover:text-primary"
                      onClick={(e) => handleSubmit(e, nas.id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer hover:transition-colors hover:text-primary"
                      onClick={(e) => handleClick(e, nas.id, nas.officeName, nas.officeId)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MasterlistTable.propTypes = {
  searchInput: PropTypes.string.isRequired,
  selectedSY: PropTypes.string.isRequired,
  selectedSem: PropTypes.string.isRequired,
  submitted: PropTypes.bool.isRequired,
};
