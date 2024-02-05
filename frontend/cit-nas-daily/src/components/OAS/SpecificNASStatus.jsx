import { useState, useEffect, useMemo } from "react";
import { EvaluateGrades } from "../../components/OAS/EvaluateGrades";
import { useParams } from "react-router-dom";
import { Dropdown } from "../Dropdown";
import { calculateSchoolYear, calculateSemester } from "../SySemUtils.js";
import axios from "axios";

export const SpecificNASStatus = () => {
  const currentYear = calculateSchoolYear();
  const currentSem = calculateSemester();
  const [isViewingEvaluateGrades, setIsViewingEvaluateGrades] = useState(false);
  const [selectedSY, setSelectedSY] = useState(currentYear);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [office, setOffice] = useState("");
  const [summaryEvaluation, setSummaryEvaluation] = useState({});
  const [grade, setGrades] = useState(null);
  const [responded, setResponded] = useState(null);
  const [allCoursesPassed, setAllCoursesPassed] = useState(null);
  const [evaluationSubmitted, setEvaluationSubmitted] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const sem_options = ["First", "Second", "Summer"];
  const nasId = useParams().nasId;

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
    const fetchNasAndOffice = async () => {
      try {
        const nasResponse = await api.get(`/NAS/${nasId}/noimg`);
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

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

  useEffect(() => {
    const fetchSchoolYearSemesterOptions = async () => {
      try {
        const response = await api.get(`/NAS/sysem/${nasId}`);
        setSyOptions(response.data);

        // Extract unique years from syOptions
        const years = [...new Set(response.data.map((option) => option.year))];
        setUniqueYears(years);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchoolYearSemesterOptions();
  }, [api, nasId]);

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md flex-col w-9/10 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="text-sm md:text-base lg:text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid max-[450px]:grid-cols-1 grid-cols-2 overflow-x-auto">
            <div className="flex w-auto mb-3 ml-5 min-[450px]:mb-0">
              <div className="flex flex-col md:flex-row justify-start md:items-center gap-3 lg:gap-10">
                <div>
                  <Dropdown
                    label="SY"
                    options={uniqueYears}
                    selectedValue={selectedSY}
                    onChange={(e) => handleSelectSY(e)}
                  />
                </div>
                <div>
                  <Dropdown
                    label="Semester"
                    options={sem_options}
                    selectedValue={selectedSem}
                    onChange={(e) => handleSelectSem(e)}
                  />
                </div>
              </div>
            </div>
          </ul>
          <div className="px-5 md:px-9 py-4">
            <div className="flex gap-10 mb-7 text-xs md:text-base lg:text-lg overflow-x-auto">
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
            <div className="flex flex-col overflow-x-auto">
              <p className="text-bold text-center text-sm md:text-lg lg:text-xl font-bold mb-8 text-primary">
                PERFORMANCE EVALUATION
              </p>
              <table className="text-sm md:text-lg lg:text-xl justify-center w-4/6 items-center">
                <tbody>
                  <tr>
                    <td className="w-1/2 py-2">SUPERIOR&#39;S EVALUATION OVERALL RATING:</td>
                    <td className="py-2 text-center font-bold text-sm md:text-lg lg:text-xl">
                      {summaryEvaluation.superiorOverallRating}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">ACADEMIC PERFORMANCE:</td>
                    <td className="py-2 text-center">
                      {grade === null ? (
                        <div className="text-sm md:text-lg lg:text-xl font-bold">
                          NOT YET UPLOADED
                        </div>
                      ) : responded ? (
                        allCoursesPassed ? (
                          <div className="font-bold text-sm md:text-lg lg:text-xl text-green">
                            ALL COURSES PASSED
                          </div>
                        ) : (
                          <div className="font-bold text-sm md:text-lg lg:text-xl text-red">
                            FAILED COURSE/S
                          </div>
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
                    <td className="py-2 text-center font-bold text-sm md:text-lg lg:text-xl">
                      {summaryEvaluation.timekeepingStatus}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">ALLOWED FOR ENROLLMENT:</td>
                    <td className="py-2 text-center">
                      <div
                        className={`font-bold text-sm md:text-lg lg:text-xl ${
                          summaryEvaluation.enrollmentAllowed ? "text-green" : "text-red"
                        }`}
                      >
                        {summaryEvaluation.enrollmentAllowed ? "YES" : "NO"}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">NUMBER OF UNITS ALLOWED:</td>
                    <td className="py-2 text-center font-bold text-sm md:text-lg lg:text-xl">
                      {summaryEvaluation.unitsAllowed}
                    </td>
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
