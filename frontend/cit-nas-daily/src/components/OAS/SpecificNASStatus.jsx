import { useState, useEffect, useMemo } from "react";
import { EvaluateGrades } from "../../components/OAS/EvaluateGrades";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SpecificNASStatus = () => {
  const [isViewingEvaluateGrades, setIsViewingEvaluateGrades] = useState(false);
  const [selectedSY, setSelectedSY] = useState(2324);
  const [selectedSem, setSelectedSem] = useState("First");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [office, setOffice] = useState("");
  const [summaryEvaluation, setSummaryEvaluation] = useState({});
  const [grade, setGrades] = useState(null);
  const [responded, setResponded] = useState(null);
  const [allCoursesPassed, setAllCoursesPassed] = useState(null);
  const [evaluationSubmitted, setEvaluationSubmitted] = useState(false);
  const sy_options = ["2324", "2223", "2122", "2021"];
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
        const [nasResponse, officeResponse] = await Promise.all([
          api.get(`/NAS/${nasId}/noimg`),
          api.get(`Offices/${nasId}/NAS`),
        ]);
        const nasData = nasResponse.data;
        setFirstname(nasData.firstName);
        setMiddlename(nasData.middleName);
        setLastname(nasData.lastName);
        const officeData = officeResponse.data;
        setOffice(officeData.name);
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

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mb-10">
        <div className="flex h-full flex-col justify-center">
          <ul className="flex-wrap items-center text-lg font-medium rounded-t-lg bg-grey pr-4 py-4 grid grid-cols-3">
            <div className="font-bold ml-10" style={{ textTransform: "uppercase" }}>
              NAS NAME: {lastName}, {firstName} {middleName}
            </div>
            <li>
              <p className="font-bold text-center" style={{ textTransform: "uppercase" }}>
                DEPT/OFFICE: {office}
              </p>
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
            <div></div>
            <hr className="my-5 border-t-2 border-gray-300" />
            <div className="flex flex-col">
              <p className="text-bold text-center text-xl font-bold mb-8">PERFORMANCE EVALUATION</p>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">SUPERIOR&#39;S EVALUATION OVERALL RATING:</p>
                <p className="text-bold text-xl font-bold">
                  {summaryEvaluation.superiorOverallRating}
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">ACADEMIC PERFORMANCE:</p>
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
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">TIMEKEEPING STATUS:</p>
                <p className="text-bold text-xl font-bold">{summaryEvaluation.timekeepingStatus}</p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">ALLOWED FOR ENROLLMENT:</p>
                <div
                  className={`font-bold text-xl ${
                    summaryEvaluation.enrollmentAllowed ? "text-green" : "text-red"
                  }`}
                >
                  {summaryEvaluation.enrollmentAllowed ? "YES" : "NO"}
                </div>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-bold text-xl">NUMBER OF UNITS ALLOWED:</p>
                <p className="text-bold text-xl font-bold">{summaryEvaluation.unitsAllowed}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
