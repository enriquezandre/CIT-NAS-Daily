"use client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const NASEvaluationResult = () => {
  const [selectedSY, setSelectedSY] = useState("2324");
  const [selectedSem, setSelectedSem] = useState("First");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [summaryEvaluation, setSummaryEvaluation] = useState({});
  const [fileByteArray, setFileByteArray] = useState(null);
  const { nasId } = useParams();

  const sy_options = ["2324", "2223", "2122", "2021"];
  const sem_options = ["First", "Second", "Summer"];

  const handleSelectSY = (event) => {
    const value = event.target.value;
    setSelectedSY(value);
  };

  const handleSelectSem = (event) => {
    const value = event.target.value;
    setSelectedSem(value);
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const byteArray = new Uint8Array(reader.result);
        const hexArray = Array.from(
          byteArray,
          (byte) => `0x${byte.toString(16).padStart(2, "0")}`
        );
        setFileByteArray(hexArray);
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };

      reader.readAsArrayBuffer(file);

      setFileUploaded(true); // Step 3: Update state when a file is selected
    } else {
      setFileUploaded(false);
    }
  };

  function handleSubmit() {
    console.log(fileByteArray);
  }

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
    const fetchEvalResult = async () => {
      try {
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const summaryEvaluationResponse = await api.get(
          `SummaryEvaluation/${selectedSY}/${getSemesterValue(
            selectedSem
          )}/${nasId}`
        );
        const summaryEvaluationData = summaryEvaluationResponse.data;
        setSummaryEvaluation(summaryEvaluationData);
        console.log(summaryEvaluationData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvalResult();
  }, [selectedSY, selectedSem, nasId]);

  return (
    <div className="justify-center w-full h-full items-center border border-solid rounded-lg">
      <div className="m-3">
        <div className="m-2">
          <div className="flex items-center justify-center text-xl font-bold">
            Evaluation Result
          </div>
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
          <hr className="my-5 border-t-2 border-gray-300 mx-2" />
          <div className="flex gap-44 ml-2">
            <div className="flex flex-col mt-2">
              <div className="flex flex-row gap-28 justify-start items-center text-lg">
                <div>SUPERIOR EVALUATION:</div>
                <div className="font-bold">
                  {summaryEvaluation.superiorOverallRating}
                </div>
              </div>
              <div className="flex flex-row gap-24 justify-start items-center text-lg mt-2">
                <div>TIMEKEEPING STATUS:</div>
                <div className="font-bold text-green">
                  {summaryEvaluation.timekeepingStatus}
                </div>
              </div>
              <div className="flex flex-row gap-16 justify-start items-center text-lg mt-2">
                <div>ALLOWED FOR ENROLLMENT:</div>
                <div
                  className={`font-bold ${
                    summaryEvaluation.enrollmentAllowed
                      ? "text-green"
                      : "text-red"
                  }`}
                >
                  {summaryEvaluation.enrollmentAllowed ? "YES" : "NO"}
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <div className="flex flex-row gap-16 justify-start items-center text-lg">
                <div>NUMBER OF UNITS ALLOWED:</div>
                <div className="font-bold">
                  {summaryEvaluation.unitsAllowed}
                </div>
              </div>
              <div className="flex flex-row gap-36 justify-start items-center text-lg mt-2">
                <div>GRADE STATUS:</div>
                {summaryEvaluation.academicPerformance === null ? (
                  <div className="text-sm">
                    <input
                      type="file"
                      id="fileUpload"
                      accept="jpeg, .jpg, .png"
                      onChange={handleFileUpload}
                    />
                    {fileUploaded ? (
                      <button
                        className="py-2 rounded-md bg-secondary w-24 items-center justify center hover:bg-primary hover:text-white"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    ) : null}
                  </div>
                ) : summaryEvaluation.allCoursesPassed === null ||
                  summaryEvaluation.allCoursesPassed === undefined ? (
                  <span className="text-yellow">PENDING</span>
                ) : summaryEvaluation.allCoursesPassed ? (
                  <span className="text-green">ALL PASSED</span>
                ) : (
                  <span className="text-red">FAILED A COURSE</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-7 bg-good p-3 rounded-lg">
            <p>
              Please upload your grades to finalize your evaluation and number
              of units allowed for you to enroll. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nam porttitor sed justo sit amet
              pharetra. Vivamus sit amet pretium velit. Curabitur vitae metus
              sed enim convallis rhoncus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
