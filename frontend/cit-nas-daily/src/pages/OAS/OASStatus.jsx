import { useState, useEffect } from "react";
import { EvaluateGrades } from "../../components/OAS/EvaluateGrades";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import axios from "axios";

export const OASStatus = () => {
  const [isViewingEvaluateGrades, setIsViewingEvaluateGrades] = useState(false);
  const [selectedSY, setSelectedSY] = useState("2324");
  const [selectedSem, setSelectedSem] = useState("First");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [program, setProgram] = useState("");
  const [yearLevel, setYearLevel] = useState();
  const [office, setOffice] = useState("");
  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];
  const [nasId, setNasId] = useState(1);
  const [summaryEvaluation, setSummaryEvaluation] = useState({});

  const openEvaluateGrades = () => {
    setIsViewingEvaluateGrades(true);
  };

  const closeEvaluateGrades = () => {
    setIsViewingEvaluateGrades(false);
  };

  function getSemesterValue(sem) {
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
  }

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

        const summaryEvaluationResponse = await api.get(
          `SummaryEvaluation/${selectedSY}/${getSemesterValue(
            selectedSem
          )}/${nasId}`
        );
        const summaryEvaluationData = summaryEvaluationResponse.data;

        setSummaryEvaluation(summaryEvaluationData);
        setFirstname(nasData.firstName);
        setMiddlename(nasData.middleName);
        setLastname(nasData.lastName);
        setOffice(officeData.name);
        setProgram(nasData.course);
        setYearLevel(nasData.yearLevel);
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
          <ul className="flex-wrap items-center text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid grid-cols-2">
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
            </div>
            <li className="flex justify-end">
              <div className="flex justify-end">
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
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <p
                  className="text-bold mb-3 text-xl font-bold"
                  style={{ textTransform: "uppercase" }}
                >
                  NAS NAME: {lastName}, {firstName} {middleName}
                </p>
                <p
                  className="text-bold mb-3 text-xl font-bold"
                  style={{ textTransform: "uppercase" }}
                >
                  PROGRAM: {program} {yearLevel}
                </p>
                <p
                  className="text-bold mb-3 text-xl font-bold"
                  style={{ textTransform: "uppercase" }}
                >
                  DEPT/OFFICE: {office}
                </p>
              </div>
            </div>
            <hr className="my-5 border-t-2 border-gray-300" />
            <div className="flex flex-col">
              <p className="text-bold text-center text-xl font-bold mb-8">
                PERFORMANCE EVALUATION
              </p>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">
                  SUPERIOR&#39;S EVALUATION OVERALL RATING:
                </p>
                <p className="text-bold text-xl font-bold">
                  {summaryEvaluation.superiorOverallRating}
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">ACADEMIC PERFORMANCE:</p>
                <button
                  type="button"
                  className="text-primary bg-secondary hover:bg-primary hover:text-secondary font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={openEvaluateGrades}
                >
                  EVALUATE GRADES
                </button>
                <EvaluateGrades
                  show={isViewingEvaluateGrades}
                  close={closeEvaluateGrades}
                />
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">TIMEKEEPING STATUS:</p>
                <p className="text-bold text-xl font-bold">
                  {summaryEvaluation.timekeepingStatus}
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">ALLOWED FOR ENROLLMENT:</p>
                <p className="text-bold text-xl font-bold text-green">
                  {summaryEvaluation.enrollmentAllowed}
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">NUMBER OF UNITS ALLOWED:</p>
                <p className="text-bold text-xl font-bold">_____</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
