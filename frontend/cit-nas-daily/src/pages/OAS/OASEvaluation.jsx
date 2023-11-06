import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import axios from "axios";

export const OASEvaluation = () => {
  const [selectedSY, setSelectedSY] = useState("2324");
  const [selectedSem, setSelectedSem] = useState("First");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [office, setOffice] = useState("");
  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];
  const [nasId, setNasId] = useState(1);

  const handleOptionChange = (rowName, selectedValue) => {
    setSelectedOptions({
      ...selectedOptions,
      [rowName]: selectedValue,
    });
  };

  const categories = [
    {
      title: "ATTENDANCE AND PUNCTUALITY",
      rows: ["Regularity of Attendance", "Promptness in Reporting for Duty"],
    },
    {
      title: "QUALITY OF WORK - OUTPUT",
      rows: [
        "Accuracy and Thoroughness of Work",
        "Organization and/or Presentation/Neatness of Work",
        "Effectiveness (Satisfaction of Clients: No/Less Complaints)",
      ],
    },
    {
      title: "QUANTITY OF WORK - OUTPUT",
      rows: [
        "Accomplishes more work on the given time",
        "Timeliness in accomplishing tasks/duties",
      ],
    },
    {
      title: "ATTITUDE AND WORK BEHAVIOUR",
      rows: [
        "Sense of Responsibility and Urgency",
        "Dependability and Reliability",
        "Industry and Resourcefulness",
        "Alertness and Initiative",
        "Sociability and Pleasant Disposition",
      ],
    },
    {
      title: "OVERALL ASSESSMENT OF NAS PERFORMANCE",
      rows: ["Overall Rating"],
    },
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

        const nasresponse = await api.get(`/NAS/${nasId}`);
        console.log(nasresponse);
        const nasData = nasresponse.data;

        const officeResponse = await api.get(`Offices/${nasId}/NAS`);
        const officeData = officeResponse.data;

        setFirstname(nasData.firstName);
        setMiddlename(nasData.middleName);
        setLastname(nasData.lastName);
        setOffice(officeData.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNas();

    console.log("Selected Sem:", selectedSem);
    console.log("Selected SY:", selectedSY);
  }, [selectedSY, selectedSem, nasId]);

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mx-8 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="flex-wrap items-center text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid grid-cols-3">
            <div
              className={`flex items-center w-auto ${
                nasId === 1 ? "ml-10" : ""
              }`}
            >
              <div>
                {nasId > 1 && (
                  <Button
                    className="text-black"
                    onClick={() => setNasId(nasId - 1)}
                  >
                    <HiOutlineArrowLeft className="h-6 w-6" />
                  </Button>
                )}
              </div>
              <div className="font-bold" style={{ textTransform: "uppercase" }}>
                NAS NAME: {lastName}, {firstName} {middleName}
              </div>
            </div>
            <li>
              <p
                className="font-bold text-center"
                style={{ textTransform: "uppercase" }}
              >
                DEPT/OFFICE: {office}
              </p>
            </li>
            <li className="flex justify-end">
              <div className="flex ">
                <div className="relative w-auto">
                  <input
                    type="search"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border"
                    placeholder="Search NAS..."
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <Button
                className="text-black"
                onClick={() => setNasId(nasId + 1)}
              >
                <HiOutlineArrowRight className="h-6 w-6" />
              </Button>
            </li>
          </ul>
          <div className="px-8 py-4">
            <div className="flex flex-row justify-start items-center gap-10 mt-2 mb-8">
              <div className="flex flex-row gap-2 items-center">
                <div className="mr-2">SY:</div>
                <select
                  id="sy"
                  name="sy"
                  value={selectedSY}
                  onChange={handleSelectSY}
                  className=" w-full text-base border rounded-md"
                >
                  {Array.isArray(sy_options) &&
                    sy_options.map((sy, index) => (
                      <option key={index} value={sy}>
                        {sy}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="mr-2">SEMESTER:</div>
                <select
                  id="sem"
                  name="sem"
                  value={selectedSem}
                  onChange={handleSelectSem}
                  className=" w-full text-base border rounded-md"
                >
                  {sem_options.map((sem, index) => (
                    <option key={index} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr className="my-5 border-t-2 border-gray-300" />
            <p className="text-xl font-bold text-center mb-4">
              SUMMARY OF EVALUATION
            </p>
            <form>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left pl-0">
                      <strong className="font-bold text-gray-900 dark:text-white">
                        A. OVERALL RATING{" "}
                      </strong>{" "}
                    </th>
                    <th className="font-semibold text-gray-900 dark:text-white px-8">
                      5
                    </th>
                    <th className="font-semibold text-gray-900 dark:text-white px-8">
                      4
                    </th>
                    <th className="font-semibold text-gray-900 dark:text-white px-8">
                      3
                    </th>
                    <th className="font-semibold text-gray-900 dark:text-white px-8">
                      2
                    </th>
                    <th className="font-semibold text-gray-900 dark:text-white px-8">
                      1
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="pl-0 text-left">
                          <strong className="font-bold text-gray-900 dark:text-white">
                            {category.title}
                          </strong>
                        </td>
                      </tr>
                      {category.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="text-left">{row}</td>
                          {[5, 4, 3, 2, 1].map((value) => (
                            <td key={value} className="text-center">
                              <input
                                className="form-radio h-5 w-5"
                                type="radio"
                                name={`row${index}-${rowIndex}`}
                                value={`Option ${value}`}
                                checked={
                                  selectedOptions[`row${index}-${rowIndex}`] ===
                                  `Option ${value}`
                                }
                                onChange={() =>
                                  handleOptionChange(
                                    `row${index}-${rowIndex}`,
                                    `Option ${value}`
                                  )
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                      <br />
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-10 items-center mt-5 w-9/10 mx-20 mb-10">
        <p className="font-bold text-xl">OVERALL RATING:</p>
        <p className="font-bold text-xl">4.8</p>
      </div>
    </>
  );
};
