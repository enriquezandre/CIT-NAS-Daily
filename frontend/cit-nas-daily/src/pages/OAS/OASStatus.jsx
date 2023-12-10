import { useState, useEffect, useMemo } from "react";
import { EvaluateGrades } from "../../components/OAS/EvaluateGrades";
import { Button } from "flowbite-react";
import { Dropdown } from "../../components/Dropdown";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import axios from "axios";

const currentYear = calculateSchoolYear();
const currentSem = calculateSemester();

export const OASStatus = () => {
  const [isViewingEvaluateGrades, setIsViewingEvaluateGrades] = useState(false);
  const [selectedSY, setSelectedSY] = useState(currentYear);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [office, setOffice] = useState("");
  const [nasId, setNasId] = useState(1);
  const [summaryEvaluation, setSummaryEvaluation] = useState({});
  const [grade, setGrades] = useState(null);
  const [nasArray, setNasArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [maxNasId, setMaxNasId] = useState(1);
  const [responded, setResponded] = useState(null);
  const [allCoursesPassed, setAllCoursesPassed] = useState(null);
  const [evaluationSubmitted, setEvaluationSubmitted] = useState(false);
  const sem_options = ["First", "Second", "Summer"];

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

  const handleEvaluationSubmitted = () => {
    setEvaluationSubmitted(true);

    setTimeout(() => {
      setEvaluationSubmitted(false);
    }, 3000);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const openEvaluateGrades = () => {
    setIsViewingEvaluateGrades(true);
  };

  const closeEvaluateGrades = () => {
    setIsViewingEvaluateGrades(false);
  };

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

  useEffect(() => {
    const fetchSchoolYearSemesterOptions = async () => {
      try {
        const response = await api.get("/NAS/sysem");
        setSyOptions(response.data);

        // Extract unique years from syOptions
        const years = [...new Set(response.data.map((option) => option.year))];
        setUniqueYears(years);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchoolYearSemesterOptions();
  }, [api]);

  useEffect(() => {
    const fetchNasAndOffice = async () => {
      try {
        const nasResponse = await api.get(`/NAS/${nasId}/noimg`); //TO CHANGE WITH PARAMS SY AND SEM
        const nasData = nasResponse.data;
        setFirstname(nasData.firstName);
        setMiddlename(nasData.middleName);
        setLastname(nasData.lastName);
        setOffice(nasData.officeName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNasAndOffice();
  }, [nasId, api]);

  useEffect(() => {
    const fetchSummaryEvaluation = async () => {
      if (!nasId || !selectedSem || !selectedSY) return;
      try {
        const response = await api.get(
          `SummaryEvaluation/${selectedSY}/${getSemesterValue(selectedSem)}/${nasId}`
        );
        setSummaryEvaluation(response.data);
        setResponded(response.data.responded);
        setAllCoursesPassed(response.data.allCoursesPassed);
      } catch (error) {
        console.error(error);
        setSummaryEvaluation({});
      }
    };
    fetchSummaryEvaluation();
  }, [nasId, selectedSem, selectedSY, api, getSemesterValue, evaluationSubmitted]);

  useEffect(() => {
    const fetchSummaryEvaluationGrades = async () => {
      if (!nasId || !selectedSem || !selectedSY) return;
      try {
        const response = await api.get(
          `SummaryEvaluation/grades/${nasId}/${selectedSY}/${getSemesterValue(selectedSem)}`
        );
        setGrades(response.data);
      } catch (error) {
        console.error(error);
        setGrades(null);
      }
    };
    fetchSummaryEvaluationGrades();
  }, [nasId, selectedSem, selectedSY, api, getSemesterValue]);

  useEffect(() => {
    const fetchNasData = async () => {
      try {
        const response = await api.get(`/NAS/${selectedSY}/${getSemesterValue(selectedSem)}/noimg`);
        setNasArray(response.data);

        const maxId = Math.max(...response.data.map((nas) => nas.id), 1);
        setMaxNasId(maxId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNasData();
  }, [api, selectedSY, selectedSem, getSemesterValue]);

  useEffect(() => {
    const results = nasArray.filter((data) =>
      data.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (results[0]) {
      setNasId(results[0].id);
    }
  }, [searchInput, nasArray]);

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
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="flex-wrap items-center text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid grid-cols-2">
            <div className={`flex items-center w-auto ${nasId === 1 ? "ml-9" : ""}`}>
              <div>
                {nasId > 1 && (
                  <Button className="text-black" onClick={() => setNasId(nasId - 1)}>
                    <HiOutlineArrowLeft className="h-6 w-6" />
                  </Button>
                )}
              </div>
              <div className="flex flex-row justify-start items-center gap-10">
                <div className="flex flex-row gap-2 items-center">
                  <Dropdown
                    label="SY"
                    options={uniqueYears}
                    selectedValue={selectedSY}
                    onChange={(e) => handleSelectSY(e)}
                  />
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Dropdown
                    label="Semester"
                    options={sem_options}
                    selectedValue={selectedSem}
                    onChange={(e) => handleSelectSem(e)}
                  />
                </div>
              </div>
            </div>
            <li className="flex justify-end">
              <div className="flex">
                <div className="relative w-auto">
                  <input
                    type="search"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border"
                    placeholder="Search NAS..."
                    value={searchInput}
                    onChange={handleSearchChange}
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
              {nasId < maxNasId ? (
                <Button
                  className="text-black"
                  onClick={() => {
                    setNasId(nasId + 1);
                  }}
                >
                  <HiOutlineArrowRight className="h-6 w-6" />
                </Button>
              ) : (
                ""
              )}
            </li>
          </ul>
          <div className="px-9 py-4">
            <div className="flex gap-10 mb-7 text-lg">
              <div className="font-bold" style={{ textTransform: "uppercase" }}>
                NAS NAME: {lastName}, {firstName} {middleName}
              </div>
              <div>
                <p className="font-bold text-center" style={{ textTransform: "uppercase" }}>
                  DEPT/OFFICE: {office}
                </p>
              </div>
            </div>
            <hr className="my-5 border-t-2 border-gray-300" />
            <div className="flex flex-col">
              <p className="text-bold text-center text-xl font-bold mb-8 text-primary">
                PERFORMANCE EVALUATION
              </p>
              <table className="text-xl justify-center w-4/5 items-center">
                <tbody>
                  <tr>
                    <td className="w-2/5 py-2">SUPERIOR&#39;S EVALUATION OVERALL RATING:</td>
                    <td className="py-2 text-center font-bold">
                      {summaryEvaluation.superiorOverallRating}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">ACADEMIC PERFORMANCE:</td>
                    <td className="py-2 text-center">
                      {grade === null ? (
                        <div className="text-xl font-bold">NOT YET UPLOADED</div>
                      ) : responded ? (
                        allCoursesPassed ? (
                          <div className="font-bold text-xl text-green">ALL COURSES PASSED</div>
                        ) : (
                          <div className="font-bold text-xl text-red">FAILED COURSE/S</div>
                        )
                      ) : (
                        <div>
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
                            grade={grade}
                            nasId={nasId}
                            selectedSY={selectedSY}
                            selectedSem={selectedSem}
                            onEvaluationSubmit={handleEvaluationSubmitted}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">TIMEKEEPING STATUS:</td>
                    <td className="py-2 text-center font-bold">
                      {summaryEvaluation.timekeepingStatus}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">ALLOWED FOR ENROLLMENT:</td>
                    <td className="py-2 text-center">
                      <div
                        className={`font-bold text-xl ${
                          summaryEvaluation.enrollmentAllowed ? "text-green" : "text-red"
                        }`}
                      >
                        {summaryEvaluation.enrollmentAllowed ? "YES" : "NO"}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">NUMBER OF UNITS ALLOWED:</td>
                    <td className="py-2 text-center font-bold">{summaryEvaluation.unitsAllowed}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
