import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const SuperiorEval = ({ nasId, selectedSem, selectedSY }) => {
  const [evaluationData, setEvaluationData] = useState([]);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        // Create an Axios instance with the Authorization header
        const api = axios.create({
          baseURL: "https://localhost:7001/api",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const evaluationResponse = await api.get(
          `SuperiorEvaluationRating?nasId=${nasId}&semester=${selectedSem}&year=${selectedSY}`
        );
        let evalData = evaluationResponse.data;
        if (!evalData) {
          // If there's no record
          evalData = {
            attendanceAndPunctuality: 0,
            attitudeAndWorkBehaviour: 0,
            overallAssessment: 0,
            overallRating: 0,
            quanOfWorkOutput: 0,
            qualOfWorkOutput: 0,
          };
        }
        setEvaluationData(evalData);
      } catch (error) {
        console.error(error);
        setEvaluationData({
          attendanceAndPunctuality: 0,
          attitudeAndWorkBehaviour: 0,
          overallAssessment: 0,
          overallRating: 0,
          quanOfWorkOutput: 0,
          qualOfWorkOutput: 0,
        });
      }
    };

    fetchEvaluation();
  }, [selectedSY, selectedSem, nasId]);

  return (
    <>
      <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-9/10 mx-8 mb-10">
        <div className="flex h-full flex-col justify-center">
          <div className="px-8 py-4">
            <div className="flex flex-col">
              <p className="text-center text-xl font-bold mb-8">
                SUPERIOR EVALUATION SUMMARY
              </p>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-xl">Attendance and Punctuality:</p>
                <p className="text-xl">
                  {(evaluationData.attendanceAndPunctuality / 2).toFixed(1)}
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-xl">Quality of Work - Output:</p>
                <p className="text-xl">
                  {(evaluationData.qualOfWorkOutput / 3).toFixed(1)}
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-xl">Quantity of Work - Output:</p>
                <p className="text-xl">
                  {(evaluationData.quanOfWorkOutput / 2).toFixed(1)}
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-xl">Attitude and Work Behaviour:</p>
                <p className="text-xl">
                  {(evaluationData.attitudeAndWorkBehaviour / 5).toFixed(1)}
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-xl">
                  Overall Assessment of NAS Performance:
                </p>
                <p className="text-xl">
                  {(evaluationData.overallAssessment / 1).toFixed(1)}
                </p>
              </div>
              <div className="flex flex-row gap-6 justify-start items-center mb-4">
                <p className="text-xl font-bold">
                  Superior&#39;s Evaluation Overall Rating:
                </p>
                <p className="text-xl font-bold">
                  {(evaluationData.overallRating / 1).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SuperiorEval.propTypes = {
  nasId: PropTypes.string.isRequired,
  selectedSem: PropTypes.number.isRequired,
  selectedSY: PropTypes.number.isRequired,
};
