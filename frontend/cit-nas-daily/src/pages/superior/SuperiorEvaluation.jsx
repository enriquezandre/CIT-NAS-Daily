import React, { useState, useEffect, useMemo } from "react";
import { Card } from "flowbite-react";
import { Header } from "../../components/Header";
import { PerfSummary } from "../../components/Superior/PerfSummary.jsx";
import { useParams } from "react-router-dom";
import { SuperiorEval } from "../../components/SuperiorEval";
import { Dropdown } from "../../components/Dropdown.jsx";
import axios from "axios";
import { calculateSchoolYear, calculateSemester } from "../../components/SySemUtils.js";

const categories = [
  {
    title: "ATTENDANCE AND PUNCTUALITY",
    rows: ["Regularity of Attendance", "Promptness in Reporting for Duty"],
    index: 0,
  },
  {
    title: "QUALITY OF WORK - OUTPUT",
    rows: [
      "Accuracy and Thoroughness of Work",
      "Organization and/or Presentation/Neatness of Work",
      "Effectiveness (Satisfaction of Clients: No/Less Complaints)",
    ],
    index: 1,
  },
  {
    title: "QUANTITY OF WORK - OUTPUT",
    rows: ["Accomplishes more work on the given time", "Timeliness in accomplishing tasks/duties"],
    index: 2,
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
    index: 3,
  },
  {
    title: "OVERALL ASSESSMENT OF NAS PERFORMANCE",
    rows: ["Overall Rating"],
    index: 4,
  },
];

const currentYear = calculateSchoolYear();
const currentSem = calculateSemester();
export const SuperiorEvaluation = () => {
  const { nasId } = useParams();
  const [nas, setNas] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedSY, setSelectedSY] = useState(currentYear);
  const [selectedSem, setSelectedSem] = useState(currentSem);
  // eslint-disable-next-line no-unused-vars
  const [syOptions, setSyOptions] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const sem_options = ["First", "Second", "Summer"];
  const [isViewingPerfSummary, setIsViewingPerfSummary] = useState(false);
  const [attendanceAndPunctuality, setAttendanceAndPunctuality] = useState();
  const [qualOfWorkOutput, setQualityOfWorkOutput] = useState();
  const [quanOfWorkOutput, setQuantityOfWorkOutput] = useState();
  const [attitudeAndWorkBehaviour, setAttitudeAndWorkBehaviour] = useState();
  const [overallAssessment, setOverallAssessment] = useState();
  const [evalData, setEvalData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [total, setTotal] = useState();
  const url = import.meta.env.VITE_APP_API_URL;

  const api = useMemo(
    () =>
      axios.create({
        baseURL: `${url}/api`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    [url]
  );

  const openPerfSummary = () => {
    setIsViewingPerfSummary(true);
  };

  const closePerfSummary = () => {
    setIsViewingPerfSummary(false);
  };

  const handleOptionChange = (rowName, selectedValue) => {
    setSelectedOptions({
      ...selectedOptions,
      [rowName]: selectedValue,
    });
  };

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setIsSubmitted(false);
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setIsSubmitted(false);
    setSelectedSem(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const schoolYear = selectedSY;
    const semester = getSemesterValue(selectedSem);
    try {
      const superiorEvaluationRating = {
        nasId,
        schoolYear,
        semester,
        attendanceAndPunctuality,
        qualOfWorkOutput,
        quanOfWorkOutput,
        attitudeAndWorkBehaviour,
        overallAssessment,
      };

      const postresponse = await api.post(
        `${url}/api/SuperiorEvaluationRating`,
        superiorEvaluationRating
      );
      console.log("Post", postresponse.data);

      // Resetting state values to clear the form after successful submission
      setSelectedOptions({});
      setAttendanceAndPunctuality(undefined);
      setQualityOfWorkOutput(undefined);
      setQuantityOfWorkOutput(undefined);
      setAttitudeAndWorkBehaviour(undefined);
      setOverallAssessment(undefined);
      setTotal(undefined);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    const fetchNas = async () => {
      try {
        const response = await api.get(`/NAS/${nasId}/noimg`);
        const nasdata = response.data;
        setNas(nasdata);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNas();
  }, [nasId, selectedSem, selectedSY, api]);

  useEffect(() => {
    const fetchEvalData = async () => {
      try {
        const evaluationResponse = await api.get(
          `SuperiorEvaluationRating?nasId=${nasId}&semester=${getSemesterValue(
            selectedSem
          )}&year=${selectedSY}`
        );
        const evalData = evaluationResponse.data;
        setEvalData(evalData);
        setIsSubmitted(false);
      } catch (error) {
        console.error(error);
        setEvalData({});
      }
    };
    fetchEvalData();
  }, [nasId, selectedSem, selectedSY, api]);

  useEffect(() => {
    const calculateCategorySum = (category) => {
      let sum = 0;
      category.rows.forEach((row, rowIndex) => {
        const option = selectedOptions[`row${category.index}-${rowIndex}`];
        if (option) {
          const number = parseInt(option.split(" ")[1]);
          sum += number;
        }
      });
      return sum;
    };

    // Calculate the sum for each category
    const attendanceAndPunctuality = calculateCategorySum(categories[0]);
    const qualOfWorkOutput = calculateCategorySum(categories[1]);
    const quanOfWorkOutput = calculateCategorySum(categories[2]);
    const attitudeAndWorkBehaviour = calculateCategorySum(categories[3]);
    const overallAssessment = calculateCategorySum(categories[4]);

    // Calculate the total rating
    const totalRating =
      attendanceAndPunctuality +
      qualOfWorkOutput +
      quanOfWorkOutput +
      attitudeAndWorkBehaviour +
      overallAssessment;

    // Set the state for each category and the total rating
    setAttendanceAndPunctuality(attendanceAndPunctuality);
    setQualityOfWorkOutput(qualOfWorkOutput);
    setQuantityOfWorkOutput(quanOfWorkOutput);
    setAttitudeAndWorkBehaviour(attitudeAndWorkBehaviour);
    setOverallAssessment(overallAssessment);
    setTotal((totalRating / 13).toFixed(1));
  }, [selectedOptions]);

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

  return (
    <>
      <Header />
      <Card className="w-9/10 mx-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 text-xs sm:text-sm md:text-base">
          <p className="mb-3">
            <strong className="font-bold" style={{ textTransform: "uppercase" }}>
              NAS NAME: {nas.lastName}, {nas.firstName} {nas.middleName}
            </strong>
          </p>
          <p className="mb-3">
            <strong className="font-bold">
              PROGRAM: {nas.course} - {nas.yearLevel}
            </strong>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-3 lg:gap-10 overflow-x-auto">
          <div className="w-36 z-10 flex mr-10">
            <Dropdown
              label="SY"
              options={uniqueYears}
              selectedValue={selectedSY}
              onChange={(e) => handleSelectSY(e)}
            />
          </div>

          <div className="w-48 z-10 flex">
            <Dropdown
              label="SEMESTER"
              options={sem_options}
              selectedValue={selectedSem}
              onChange={(e) => handleSelectSem(e)}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="button"
            className="text-black text-xs sm:text-sm md:text-base bg-secondary hover:bg-primary hover:text-white font-medium rounded-lg px-5 py-2.5"
            onClick={openPerfSummary}
          >
            VIEW PERFORMANCE SUMMARY
          </button>
        </div>
        <PerfSummary
          show={isViewingPerfSummary}
          close={closePerfSummary}
          nasId={nasId}
          selectedSem={selectedSem}
          selectedSY={selectedSY}
        />
        {isSubmitted ? (
          <SuperiorEval
            nasId={nasId}
            selectedSem={getSemesterValue(selectedSem)}
            selectedSY={selectedSY}
          />
        ) : (
          <div>
            {Object.keys(evalData).length === 0 && evalData.constructor === Object ? (
              <div className="text-xs sm:text-sm md:text-base">
                <hr className="my-2 border-t-2 border-gray-300 ml-7 mr-7" />
                <p className="my-2 text-justify">
                  <strong className="font-bold">OBJECTIVE: </strong>
                  To encourage, promote and develop professionalism among the Non-Academic Scholars
                  through a fair and objective assessment of their performance and their adherence
                  to the policies and guidelines of their scholarship.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-6 my-2">
                  <p>
                    <strong className="font-bold text-gray-900">LEGEND:</strong>
                  </p>
                  <p>5 - Excellent</p>
                  <p>4 - Very Good</p>
                  <p>3 - Good</p>
                  <p>2 - Fair</p>
                  <p>1 - Poor</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left pl-0">
                            <strong className="font-bold">A. OVERALL RATING </strong>{" "}
                          </th>
                          <th className="font-semibold px-8">5</th>
                          <th className="font-semibold px-8">4</th>
                          <th className="font-semibold px-8">3</th>
                          <th className="font-semibold px-8">2</th>
                          <th className="font-semibold px-8">1</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td className="pl-0 text-left">
                                <strong className="font-bold">{category.title}</strong>
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
                                      disabled={isSubmitted}
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                            <td className="py-2"></td>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-start overflow-x-auto sm:justify-end gap-10 items-center mt-5 text-xs sm:text-sm md:text-base">
                    <strong className="font-bold">OVERALL RATING: {total}</strong>
                    <button
                      type="submit"
                      className="text-black bg-secondary hover:bg-primary hover:text-white font-medium rounded-lg px-10 py-2.5"
                      disabled={isSubmitted}
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <SuperiorEval
                nasId={nasId}
                selectedSem={getSemesterValue(selectedSem)}
                selectedSY={selectedSY}
              />
            )}
          </div>
        )}
      </Card>
    </>
  );
};
