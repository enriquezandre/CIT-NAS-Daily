import { useState, useEffect } from "react";
import axios from "axios";

export const MasterlistTable = () => {
  const [nasData, setNasData] = useState([]);

  const header = [
    "No.",
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
    "OT",
    "FOR MAKE UP",
    "REMARKS",
  ];

  useEffect(() => {
    const fetchNas = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const nasresponse = await api.get(`/NAS/`);
        const nasData = nasresponse.data;

        const nasDataWithOffice = await Promise.all(
          nasData.map(async (nas) => {
            const nasId = nas.id;
            try {
              const officeResponse = await api.get(`Offices/${nasId}/NAS`);
              nas.office = officeResponse.data;
            } catch (officeError) {
              // Handle error when office data is not available
              console.error("Error fetching office data for NAS:", officeError);
              nas.office = { name: "N/A" };
            }
            return nas;
          })
        );
        setNasData(nasDataWithOffice);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNas();
  });

  return (
    <div className="overflow-x-auto">
      <table className="table-auto mx-auto mb-8">
        <thead>
          <tr>
            {header.map((header, index) => (
              <th
                key={index}
                className="border-2 border-black text-white text-center uppercase font-semibold bg-primary px-4 py-2"
                value={header}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nasData.map((nas, index) => (
            <tr key={index}>
              <td className="border-2 border-black text-center px-4 py-2">
                {nas.id}
              </td>
              <td className="border-2 border-black text-center px-4 py-2">
                {nas.id}
                {/*TO DO: CHANGE TO STUDENT ID NUMBER */}
              </td>
              <td
                className="border-2 border-black text-center px-4 py-2"
                style={{ textTransform: "capitalize" }}
              >
                {nas.lastName}
              </td>
              <td
                className="border-2 border-black text-center px-4 py-2"
                style={{ textTransform: "capitalize" }}
              >
                {nas.firstName}
              </td>
              <td
                className="border-2 border-black text-center px-4 py-2"
                style={{ textTransform: "capitalize" }}
              >
                {nas.middleName}
              </td>
              <td
                className="border-2 border-black text-center px-4 py-2"
                style={{ textTransform: "capitalize" }}
              >
                {nas.gender}
              </td>
              <td className="border-2 border-black text-center px-4 py-2">
                {new Date(nas.birthDate).toLocaleDateString()}
              </td>
              <td
                className="border-2 border-black text-center px-4 py-2"
                style={{ textTransform: "uppercase" }}
              >
                {nas.course}
              </td>
              <td className="border-2 border-black text-center px-4 py-2">
                {nas.yearLevel}
              </td>
              <td className="border-2 border-black text-center px-4 py-2">
                {nas.unitsAllowed}
              </td>
              <td className="border-2 border-black text-center px-4 py-2">
                {new Date(nas.dateStarted).toLocaleDateString()}
              </td>
              <td
                className="border-2 border-black text-center px-4 py-2"
                style={{ textTransform: "uppercase" }}
              >
                {nas.office ? nas.office.name : "N/A"}{" "}
                {/* Display the office name or "N/A" if not available */}
              </td>
              {/* Add other data fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
